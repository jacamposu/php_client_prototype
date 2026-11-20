import { Menu } from '../../Public/Js/Menu.js';
import { Files } from '../../Public/Js/Files.js';
import { Url } from '../../Public/Js/Url.js';
import { ActionsPage } from '../../Public/Js/ActionsPage.js';
import { Functions } from '../../Public/Js/Functions.js';
import { Form } from '../../Public/Js/Form.js';
import { HtmlButton } from '../../Public/Js/HtmlButton.js';


export class Load{

    constructor(config){
        this.settings = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'token': JSON.parse(localStorage.getItem("PrototypeSessionToken"))
            }
        };
        this.config = config;
    }

    GetContext = async (urlContext) => {
        await fetch(urlContext, this.settings).then(response => response.json()).then(data => {
            if(data.statusCode == 200){
                localStorage.setItem('PrototpeContext', JSON.stringify(data));
            }
        }).catch(err => {
            console.log("ERROR: ", err)
        });
    }

    Menu = (context) => {
        // if(context.response != undefined){
        //     alert("No se ha podido cargar el menú");
        //     window.location.reload();
        //     return;
        // }
        let menu = new Menu(context.response);
        menu.LoadMenu("accordionFlushExample");
    }

    Profile = (context) => {
        let urlProfile = context.response.urlProject+'/'+'/UserOption/Profile/'
        let param = `LoadData('${urlProfile}')`
        $("#show-my-profile").attr("onclick",param)
    }

    ConfirmExit = () =>{
        Swal.fire({
            title: 'Salir',
            text: 'Está realmente seguro de salir de la aplicación?',
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, salir',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                this.CloseSession()
            }
        })
    }

    CloseSession = async () => {
        let session = JSON.parse(localStorage.getItem("PrototypeSessionToken"));
        session = JSON.parse(atob(session.split('.')[1]));
        this.settings.headers.user_id = session.data.UserIdEncrypt;
        this.settings.headers.UseLastAccess = session.data.UseLastAccess;
        this.settings.headers.loginId = session.data.LoginId;
        this.settings.method = 'POST';
        const urlApiLogin = this.config.apiLogin + '/Login/Logout/';

        await fetch(urlApiLogin, this.settings).then(response => response.json()).then(data => {
            if(data.statusCode == 200){
                localStorage.removeItem("PrototypeSessionToken")
                localStorage.removeItem("PrototypeSessionUser")
                localStorage.removeItem("PrototpeContext")
                window.location.href = this.config.project
            }
        }).catch(err => {
            console.log("ERROR: ", err)
        });
    }

    info = async (url) => {       
        await fetch(url, this.settings).then(response => response.json()).then(data => {
            if(data.statusCode == 200){
                let info = data.response.PageInformation
                $().html(info.Title)

                const title = document.getElementById("page-title");
                title.innerHTML = info.Title;

                $("#page-icon").addClass(info.IconPage+' fa-2x text-muted')
                this.Navbar(info.NavBarOptions.options)
            }else{
                console.error("Error", data)
            }
        }).catch(err => {
            console.error("ERROR: ", err)
        });
    }

    OpenSlider = (element) => {
        const button = document.createElement('button');
        const icon = document.createElement('em');
        icon.className = element.icon;

        button.type = 'button';
        button.className = 'btn btn-primary';
        button.id = element.nameButton;
        button.title = element.placeholder;
        button.setAttribute('data-bs-toggle', 'offcanvas');
        button.setAttribute('data-bs-target', '#offcanvasRight');
        button.setAttribute('aria-controls', 'offcanvasRight');

        button.appendChild(icon);
        button.appendChild(document.createTextNode(' '+element.text_button));

        document.getElementById("navigation_table").appendChild(button)

        // Evento onclick
        const action = new ActionsPage(this.config)
        button.onclick = function () {
            action.FormAdd(element.params.url)
        };
        
        // return `
        //     <input type="checkbox" class="btn-check" id="btncheck1" id="newrecord" title="${element.placeholder}" onclick="${element.action}('${element.params.url}'); toggle.Forms()" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
        //     <label class="btn btn-primary" for="btncheck1">
        //         <em class="${element.icon}"></em> 
        //         ${element.text_button}
        //     </label>
        // `
    }

    OpenCollapsible = (element) => {
        return `
            <a class="btn btn-primary" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample" onclick="action.LoadModalActionPage('${element.url}');">
                <em class="${element.icon}"></em>
                &nbsp;${element.text_button}
            </a>
        `
    }

    DefaultLink = (element) => {
        return `
            <li class="nav-item" role="presentation">
                <a onclick="<?= $value->params ?>('${element.url}');" title="${element.placeholder}" data-bs-toggle="tooltip" data-bs-placement="top">
                    <em class="${element.icon}"></em>
                    ${element.text_button}
                </a>
            </li>
        `
    }

    Button = (element) => {
        return `
            <button type="button" class="btn btn-primary" id="${element.nameButton}" title="${element.placeholder}" onclick="action.${element.action}('${element.params.url}', '${element.params.text}', '${element.text_button}', '${element.params.btnYes}', '${element.params.btnCancel}')">
                <em class="${element.icon}"></em>
                ${element.text_button}
            </button>
        `
    }

    OpenModal = (element) => {
        const button = document.createElement('button');
        const icon = document.createElement('em');
        icon.className = element.icon;

        button.type = 'button';
        button.className = 'btn btn-primary';
        button.id = element.nameButton;
        button.title = element.placeholder;
        button.setAttribute('data-bs-toggle', 'modal');
        button.setAttribute('data-bs-target', '#staticBackdrop');
        button.appendChild(icon);
        button.appendChild(document.createTextNode(' '+element.text_button));

        document.getElementById("navigation_table").appendChild(button)

        // Evento onclick
        const action = new ActionsPage(this.config)
        button.onclick = function () {
            action.LoadModalActionPage(element.url);
        };

        // return `
        //     <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop" id="${element.nameButton}" title="${element.placeholder}" onclick="action.LoadModalActionPage('${element.url}');">
        //         <em class="${element.icon}"></em>
        //         ${element.text_button}
        //     </button>
        // `
    }

    Navbar = (nav) => {
        if(nav == undefined || nav == '')
            return ''
        let options = ''
        nav.map(element => {
            switch(element.type_button){
                case 'slider':
                    options += this.OpenSlider(element)
                    break
                
                case 'collapsible':
                    options += this.OpenCollapsible(element)
                    break
                
                case 'modal':
                    options += this.OpenModal(element)
                    break

                case 'button':
                    options += this.Button(element)
                    break

                default:
                    options += this.DefaultLink(element)
                    break
            }
        })
        return options
    }

    Exit(){
        const load = new Load(this.config)
        load.ConfirmExit()
    }
}
