import { Table } from './Table.js';
import { SwalAlert } from '../../Public/Js/SwalAlert.js';
import { CreateView } from '../../Public/Js/CreateView.js';
import { Form } from '../../Public/Js/Form.js';
import { HtmlButton } from '../../Public/Js/HtmlButton.js';
import { Files } from '../../Public/Js/Files.js';


export class ActionsPage {

    constructor() {
        this.token = JSON.parse(localStorage.getItem("PrototypeSessionToken"))
        this.url = Files.ConvertJsonToObject('http://localhost/DEV/php_client_prototype/Config/Routes.json')
    }

    FormAdd = async (url) => {
        document.getElementById("loading-form").classList.remove("d-none");

        const settings = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'token': this.token
            }
        }

        await fetch(url,settings).then(response => response.json()).then(data => {
            if (data.statusCode == 200){
                const form = new Form();
                const buttons = new HtmlButton();

                document.getElementById("form-titles").innerHTML = data.response.Form.Title;
                document.getElementById("form-subtitle").innerHTML = data.response.Form.Subtitle;
                document.getElementById('container-form').innerHTML = "";
                
                form.CreateFields(data.response.Form.Fields,'container-form');

                buttons.CreateButtons(data.response.Form.Buttons,'container-submits');
                
                document.getElementById("loading-form").classList.add("d-none");
            } else {
                console.error("API_ERROR: ", data)
            }
        }).catch(error => {
            console.error("FETCH_ERROR: ", error)
        });
    }

    FormEdit = async (params) => {
        document.getElementById("loading-form").classList.remove("d-none");

        const settings = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'id': params.record,
                'numPage': 1,
                'startFrom': 0,
                'token': this.token
            }
        }

        const url = `${this.url.apiCore}/${params.action}/`

        await fetch(url,settings).then(response => response.json()).then(data => {
            if (data.statusCode == 200){
                const form = new Form();
                const buttons = new HtmlButton();
           
                document.getElementById("form-titles").innerHTML = data.response.Form.Title;
                document.getElementById("form-subtitle").innerHTML = data.response.Form.Subtitle;
                document.getElementById('container-form').innerHTML = "";
                
                form.CreateFields(data.response.Form.Fields,'container-form');

                buttons.Create(data.response.Form.Buttons,'container-submits');

                document.getElementById("loading-form").classList.add("d-none");
            } else {
                console.error("API_ERROR: ", data)
            }
        }).catch(error => {
            console.error("FETCH_ERROR: ", error)
        });
    }

    ShowRecord = async (params) => {
        let url = `${this.url.apiCore}/${params.action}/`
        const settings = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'id': params.record,
                'token': this.token
            }
        }
        await fetch(url, settings).then(response => response.json()).then(data => {
            if (data.statusCode == 200) 
            {
                const view = new CreateView()
                view.OneRecord(data.response);
            } 
            else 
            {
                console.error("API_ERROR: ", data)
            }
        }).catch(error => {
            console.error("FETCH_ERROR: ", error)
        });
    }

    LoadModalActionPage = async (endpoint) => {
        // TODO: guardar en localstorage
        $("#collapseExample").toggleClass('open')
        if(!$("#collapseExample").hasClass('open')){
            $("#content-collapsible").html('')
            return false
        }
        const settings = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'token': this.token
            }
        }
        let url = `${endpoint}`
        await fetch(url,settings).then(response => response.json()).then(data => {

            if (data.statusCode == 200) 
            {
                const view = new CreateView()

                switch (endpoint.split("/")[6]) {
                    case "ModalColumns":
                        view.ModalColumns(data.response)
                        break
                    case "ModalSearch":
                        view.ModalSearch(data.response)
                        break
                    case "MassiveContent":
                        view.ModalMassiveContent(data.response)
                        break
                    case "ModalDownloads":
                        view.ModalDownloads(data.response)
                        break
                }
            }
            else
            {
                console.error("API_ERROR: ", data)
            }
        }).catch(err => {
            console.error("FETCH_ERROR: ", err)
        });
    }

    Delete(params){
        Swal.fire({
            title: "Record delete",
            text: `¿Are you sure to delete the record id [${params.record}]?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                const settings = {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'id': params.record,
                        'numPage': 1,
                        'startFrom': 0,
                        'token': this.token
                    }
                }
                
                let url = `${this.url.apiCore}/${params.action}/`;

                fetch(url, settings).then(response => response.json()).then(data => {
                    if (data.statusCode == 200) {
                        Swal.fire(
                            'Deleted!',
                            data.response.response,
                            'success'
                        )
                        // let page = endpoint.split("/")[0]
                        // let urlRDT = `${this.url.project}/${page}/ReturnDataTable/`
                        // this.CreateTable(urlRDT)
                        var action = new ActionsPage();
                        action.CreateTable($("#urlTable").val())
                    } else {
                        console.log(data); return
                        Swal.fire(
                            'Deleted!',
                            'data.error.error.message',
                            'error'
                        )
                    }
                }).catch(err => {
                    console.error("FETCH_ERROR: ", err)
                });
            }
        })
    }

    CreateTable = async(url, orderBy='', numPage='') => {
        dialog_loading.showModal();
        var table = new Table();
        $("#content-preload").removeClass("d-none");
        url = (orderBy != '') ? url+'orderby='+orderBy+'/' : url
        url = (numPage != '') ? url+numPage+'/' : url+'page=1/'

        const settings = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'token': this.token
            }
        }
        
        await fetch(url, settings).then(response => response.json()).then(data => {
            
            if (data.statusCode == 401){
                let sa = new SwalAlert();
                sa.Redirect('error', data.description, 'Redirect', data.error.error, this.url.project);
                return
            }


            // let thead = data.response.table.thead
            // let columns = []
            
            // thead.forEach((value) => {
            //     if(value.value!=''){
            //         let campo = value.value
            //         columns.push({
            //             title:value.value, 
            //             className:"text-center text-nowrap align-middle", 
            //             responsivePriority: 1
            //         })
            //     }else{
            //         columns.push({
            //             title:value.description, 
            //             className:"text-center text-nowrap align-middle", 
            //             responsivePriority: 1
            //         })
            //     }
            // })

            // let tbody = data.response.table.tbody
            // let Rows = []
            
            
            // tbody.forEach((row)=>{
            //     Rows.push(row)
            // })
            
            // let filas = []
            // Rows.forEach((element) => {
            //     let fila = ['accion']
            //     element.row.forEach((value)=>{
            //         fila.push(value.text)
            //     })
            //     filas.push(fila)
            // });

            if(data.statusCode == 200){
                
                table.createTable(data.response.table, "container_table", 'mitabla');
                // $("#pagination-table").html(table.pagination(data.response.pagination));
                $("#content-preload").attr("class", "d-none");
            }else{
                $("#container_table").html(table.Error(data))
            }
            dialog_loading.close()
        }).catch(err => {
            console.error("FETCH_ERROR: ", err)
        });
    }

    SaveForm = async (endpoint, keyField, action) => {
        
        let url = `${this.url.apiCore}/${endpoint}`
        if(action == 'Edit'){
            let id = $("#"+keyField).val()
            url = url+`id=${id}/`
        }
        
        let array = []
        $('#formulario').serializeArray().map(element => {
            
            if(action == 'Edit' && element.name == keyField){
                array['keyfield'] = element.value
            }else{
                array[element.name] = element.value
            }
        })

        const post = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'token': this.token
            },
            body: JSON.stringify(Object.assign({}, array)) 
        }

        console.log(post)

        await fetch(url, post).then(response => response.json()).then(data => {
            if(data.statusCode == 200){
                // SUCCESS: mostrar mensaje, limpiar formulario, recargar tabla
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                      toast.addEventListener('mouseenter', Swal.stopTimer)
                      toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                })
                Toast.fire({
                    icon: "success",
                    title: data.response.response
                })

                $("#formulario")[0].reset()
                var action = new ActionsPage();
                action.CreateTable($("#urlTable").val())
            }else{

                if(data.error.response !== undefined){
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                          toast.addEventListener('mouseenter', Swal.stopTimer)
                          toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                    })
                    Toast.fire({
                        icon: "error",
                        title: data.error.response
                    })
                    return
                }

                if(data.error.error.length > 0){
                    data.error.error.forEach((value) => {
                        let arr = Object.entries(value)
                        let field = arr[0][0]
                        let messages = arr[0][1]
                        messages.forEach(msg => {
                            $("#msgErrorField"+field).append(`<li>${msg}</li>`)
                            $("#"+field).addClass("is-invalid")
                        })
                    })

                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                          toast.addEventListener('mouseenter', Swal.stopTimer)
                          toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                    })

                    Toast.fire({
                        icon: "error",
                        title: data.error.text
                    })
                    return
                } 
            }
        }).catch(err => {
            console.error("FETCH_ERROR: ", err)
        });
    }

    SortTable(column){
        this.CreateTable($("#urlTable").val(), column)
    }

    DownloadReport = async () => {
        
        let array = []
        let fields = []
        
        let endpoint = 'States/DownloadReport' // borrar
        
        var form = $("#form-download-report").serializeArray();
        $('#form-download-report').serializeArray().map(element => {
            if(element.name.includes("chk_col_")){
                fields[element.name.replace("chk_col_","")] = element.value
            }else{
                array[element.name] = element.value
            }
        })
  
        const settings = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'mode': JSON.stringify(Object.assign({}, array)),
                'fields': JSON.stringify(Object.assign({}, fields))
            }
        }


        let url = `${this.url.apiCore}/${endpoint}/`
        await fetch(url, settings).then(response => response.json()).then(data => {
            console.log(data)
            if (data.statusCode == 200) {
                let sa = new SwalAlert();
                sa.Toaster(data.response.message, "success")
                DownloadTXTBase64(data.response)
            } else {
                console.error("API_ERROR: ", data)
            }
        }).catch(err => {
            console.error("FETCH_ERROR: ", err)
        });
    }

    Pagination(href){
        this.CreateTable($("#urlTable").val(), '', href)
    }

    ProcessDictionary = async (url) =>{
        await fetch(url).then(response => response.json()).then(data => {
            if(data.statusCode = 200)
            {
                const sa = new SwalAlert()
                sa.Alert(data.response.title, data.response.text, data.response.icon)
            }
        }).catch(err => {
            console.error("ERROR: ", err.message)
        });
    }

    ChargeList = async (id, field) => {
        let url = `${this.url.apiCore}/Users/GetValuesList/`
        const settings = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'id': id,
                'field': field,
                'token': this.token
            }
        }

        await fetch(url, settings).then(response => response.json()).then(data => {
            if (data.statusCode == 200) 
            {
                let input = document.getElementById(field)

                if(data.response.value == ''){
                    const option = document.createElement('option');
                    option.value = ''
                    option.textContent = 'Elija una opción';
                    input.appendChild(option);
                }

                if(data.response.options.length > 0){
                    data.response.options.forEach(element => {
                        let option = document.createElement('option');
                        option.value = element.value;
                        option.textContent = element.text;
                        input.appendChild(option);
                    })
                }
            }
            else 
            {
                console.error("API_ERROR: ", data)
            }
        }).catch(error => {
            console.error("FETCH_ERROR: ", error)
        });
    }

    ChangePassword(){
        Swal.fire({
            title: "Change password",
            text: `¿Are you sure to change the password for user []?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, change it!',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {

                Swal.fire(
                    'Pass changed!',
                    'the password has been changed successfully',
                    'success'
                )

                // let url = `${this.url.apiCore}/${endpoint}/`
                // const settings = {
                //     method: 'GET',
                //     headers: {
                //         Accept: 'application/json',
                //         'Content-Type': 'application/json',
                //         'id': id,
                //     'numPage': 1,
                //     'startFrom': 0
                //     }
                // }
                // fetch(url, settings).then(response => response.json()).then(data => {
                //     if (data.statusCode == 200) {
                //         Swal.fire(
                //             'Deleted!',
                //             data.response.response,
                //             'success'
                //         )
                //         // let page = endpoint.split("/")[0]
                //         // let urlRDT = `${this.url.project}/${page}/ReturnDataTable/`
                //         // this.CreateTable(urlRDT)
                //         var action = new ActionsPage();
                //         action.CreateTable($("#urlTable").val())
                //     } else {
                //         console.log(data); return
                //         Swal.fire(
                //             'Deleted!',
                //             'data.error.error.message',
                //             'error'
                //         )
                //     }
                // }).catch(err => {
                //     console.error("FETCH_ERROR: ", err)
                // });
            }
        })
    }

    ConfirmFormSubmission(button){
        if(button.actionJs.confirm){
            Swal.fire({
                title: button.actionJs.title,
                text: button.actionJs.messageConfirm,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: button.actionJs.btnSendText,
                cancelButtonText: button.actionJs.btnCancelText
            }).then((result) => {
                if (result.value) {
                    this.SaveForm(button.endpoint, button.keyField, button.action)
                }
            })
        }else{
            this.SaveForm(button.endpoint, button.keyField, button.action)
        }
    }

    GenerateDictionary(url, text, title, btnYes, btnCancel)
    {
        Swal.fire({
            title: title,
            text: text,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: btnYes,
            cancelButtonText: btnCancel
        }).then((result) => {
            if (result.value) {
                this.ProcessDictionary(url)
            }
        })
    }

    GenerateIcons(url, text, title, btnYes, btnCancel)
    {
        Swal.fire({
            title: title,
            text: text,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: btnYes,
            cancelButtonText: btnCancel
        }).then((result) => {
            if (result.value) {
                this.ProcessDictionary(url)
            }
        })
    }

    GenerateMenu(url, text, title, btnYes, btnCancel)
    {
        Swal.fire({
            title: title,
            text: text,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: btnYes,
            cancelButtonText: btnCancel
        }).then((result) => {
            if (result.value) {
                this.ProcessDictionary(url)
            }
        })
    }
}