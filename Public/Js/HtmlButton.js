import { HtmlUtil } from '../../Public/Js/HtmlUtil.js';
import { Events } from '../../Public/Js/Events.js';
import { ActionsPage } from '../../Public/Js/ActionsPage.js';
import { Files } from '../../Public/Js/Files.js';


export class HtmlButton extends HtmlUtil {

    constructor() {
        super();
        this.url = Files.ConvertJsonToObject('http://localhost/DEV/php_client_prototype/Config/Routes.json');
    }

    CreateSubmitForm(button,container) {
        const btnForm = document.createElement(button.type);
        btnForm.id = button.id;
        btnForm.name = button.id;
        btnForm.className = button.class;

        const icon = document.createElement('em');
        icon.className = button.icon;

        btnForm.appendChild(icon);
        btnForm.append(" "+button.text);
        
        document.getElementById(container).appendChild(btnForm);

        const action = new ActionsPage();
        btnForm.onclick = function ()
        {
            if(button.event != '')
                action.ConfirmFormSubmission(button);
            else
                action.SendForm();
        }
    }

    CreateCancelForm = (button) => {

    }

    CreateSubmitLogin(button,container) {
        const btnLogin = document.createElement(button.type);
        btnLogin.type = button.type;
        btnLogin.id = button.name;
        btnLogin.name = button.name;
        btnLogin.className = button.classname;

        const icon = document.createElement('em');
        icon.className = button.icon;

        btnLogin.appendChild(icon);
        btnLogin.append(" "+button.text);
        
        document.getElementById(container).appendChild(btnLogin);

        btnLogin.onclick = function ()
        {
            Events.SendForm();
        }
    }

    CreateResetLogin(button,container) {
        const btnReset = document.createElement("button");
        btnReset.type = "reset";
        btnReset.className = "btn btn-link text-info";

        const icon = document.createElement('em');
        icon.className = button.icon;

        btnReset.appendChild(icon);
        btnReset.append(" "+button.text);

        document.getElementById(container).appendChild(btnReset);
    }
    
    CreateCancelogin(button,container){
        const link = document.createElement("a");
        link.href = this.url.project + button.url;
        link.className = button.classname;

        const icon = document.createElement('em');
        icon.className = button.icon;

        link.appendChild(icon);
        link.append(" "+button.text);
        document.getElementById(container).appendChild(link);
    }
}