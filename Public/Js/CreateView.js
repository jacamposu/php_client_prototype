import { Form } from '../../Public/Js/Form.js';
import { Table } from '../../Public/Js/Table.js';


export class CreateView {
    
    constructor() {
    }

    OneRecord(data) {
        document.getElementById("content-modal").innerHTML = "";
        document.getElementById("title-modal").innerHTML = data.List.Title;

        const table = new Table();

        table.CreateVerticalTable(data.List.Data,"mitablaH","content-modal")
        
        // $("#buttons-modal").html(buttons)
    }
    
    ModalColumns(data) {
        $("#content-modal").html('')
        let input = ''
        data.Modal.data.forEach((value) => {
            input += `
            <div class="col-md-3">
                <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" id="chk_col_${value.field}" onchange="hiddenColumn('col_${value.field}');" checked="checked"/>
                    <label class="form-check-label" for="chk_col_${value.field}">${value.desc}</label>
                </div>
            </div>
            `
        })
        $("#title-modal").html('Agregar o quitar columnas')
        $("#content-modal").html(`<div class="row">${input}</div>`)
    }

    ModalSearch2(data) {
        $("#title-modal").html('')
        $("#content-modal").html('')
        $("#buttons-modal").html('')

        const form = new Form();
        form.CreateFields(data.Modal.Fields.visible, 'content-modal')


        let buttons = ` 
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                <em class="fas fa-times" aria-hidden="true"></em>&nbsp;__CERRAR
            </button>
            <button type="button" class="btn btn-primary btn-block" onclick="action.DownloadReport();">
                <em class="fas fa-cloud-download-alt" aria-hidden="true"></em>&nbsp;__BUSCAR
            </button>`

        $("#title-modal").html(data.Modal.Title)
        // $("#content-modal").html(`<div class="containe">${content}</div>`)
        $("#buttons-modal").html(buttons)
    }

    ModalSearch(data) {
        $("#title-modal").html('')
        $("#content-modal").html('')
        $("#buttons-modal").html('')
        console.log('buscar')

        let input = document.createElement('select')
		input.className = 'form-select'
        input.id = 'selectSearhc'
        input.name = 'selectSearhc'

        data.Modal.Fields.visible.visible.forEach(element => {
            const option = document.createElement('option');
            option.value = element.fieldName
            option.textContent = element.metadata.desc
            input.appendChild(option);
        });

        let inputtext = document.createElement('input')
        inputtext.type = 'text'
		inputtext.className = 'form-control inputTextCount'
        inputtext.id = 'Buscar'
        inputtext.name = 'buscar'

        let buttonAdd = document.createElement("button")
        buttonAdd.className = "btn btn-success"
        buttonAdd.innerHTML = `<em class="fas fa-plus" aria-hidden="true"></em> Agregar nuevo filtro`


        $("#title-modal").html('Buscar valores en base de datos')
        $("#content-modal").html('')
        $("#buttons-modal").html('')

        // const form = new Form();

        let buttons = ` 
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                <em class="fas fa-times" aria-hidden="true"></em> Cerrar
            </button>
            `

        // $("#title-modal").html(data.Modal.Title)
        $("#content-modal").html(`<div class="row">
            <div class="col-6 mb-3 position-relative">
                <div class="form-floating" id="input_UsrId">
                    ${input.outerHTML}
                    <label for="UsrId">Campo</label>
                </div>
            </div>
            <div class="col-6 mb-3 position-relative">
                <div class="form-floating" id="input_UsrId">
                    ${inputtext.outerHTML}
                    <label for="UsrId">Valor</label>
                </div>
            </div>
            <div class="col-6">
                ${buttonAdd.outerHTML}
            </div>
            <div class="col-6">
                <button type="button" class="btn btn-primary btn-block" onclick="action.DownloadReport();">
                    <em class="fas fa-search" aria-hidden="true"></em> Realizar búsqueda
                </button>
            </div>
            </div>`)
        // $("#buttons-modal").html(buttons)

        buttonAdd.onclick = function (){
            console.log("ejecutado")
        }
    }

    ModalDownloads(data) {
        $("#title-modal").html('')
        $("#content-modal").html('')
        $("#buttons-modal").html('')

        let content = ''
        let optionDwn = ''
        let input = ''
        let columns = ''

        data.Modal.Modality.forEach( (value) => {
            input += `
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="modality" id="${value.index}" value="${value.index}" ${value.default}>
                    <label class="form-check-label" for="${value.index}">${value.text}</label>
                </div>`
        });

        data.Modal.Options.forEach( (value) => {
            optionDwn += `        
                <div class="form-check px-3">
                    <input class="form-check-input" type="radio" name="options" id="${value.index}" value="${value.index}" ${value.default}>
                    <label class="form-check-label" for="${value.index}"><em class="${value.icon} ${value.colorIcon} fa-2x"></em> ${value.text}</label>
                </div>`
        });

        data.Modal.Columns.Modal.data.forEach((value) => {
            columns += `
                <div class="col-md-6">
                    <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox" id="chk_col_${value.field}" name="chk_col_${value.field}" checked="checked"/>
                        <label class="form-check-label" for="chk_col_${value.field}">${value.desc}</label>
                    </div>
                </div>
            `
        })

        content += `
        <form id="form-download-report">
            <div class="row">
                <div class="col-md-12">
                    <h5>${data.Modal.AboutDownload}</h5>
                    ${input}
                </div>
                <div class="col-md-12 mt-3">
                    <h5>${data.Modal.ChooseFormat}</h5>
                    ${optionDwn}
                </div>
                <div class="col-md-12 mt-3">
                    <h5>${data.Modal.AddRemoveColumns}</h5>
                    <div class="row">
                        ${columns}
                    </div>
                </div>
            </div>
        <form>
        `
        let buttons = ` 
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                <em class="fas fa-times" aria-hidden="true"></em>&nbsp;${data.Modal.BtnClose}
            </button>
            <button type="button" class="btn btn-primary btn-block" onclick="action.DownloadReport();">
                <em class="fas fa-cloud-download-alt" aria-hidden="true"></em>&nbsp;${data.Modal.BtnSend}
            </button>`

        $("#title-modal").html(data.Modal.Title)
        $("#content-modal").html(content)
        $("#buttons-modal").html(buttons)
    }

    ModalMassiveContent(data) {
        $("#contentModal").html('Esta funcionalidad está en construcción')
    }

    CreateButtons(data) {
        if (data.type == "button") return `<button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>`
        else return `<button type="button" class="btn btn-primary">${data.text}</button>`
    }
    
    NabvarOptions(){
        
    }
}