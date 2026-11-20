import { HtmlButton } from '../HtmlButton.js';
import { Form } from '../Form.js';

export class Login {
    
    response = null;

    constructor(config, dictionary, icons){
        this.config = config;
        this.dictionary = dictionary;
        this.icons = icons;
    }

    LoadPage = async() => {
        let url = $("#url").val()
        await fetch(url, {}).then(response => response.json()).then(data => {
            if(data.statusCode == 200){
                this.Create(data.response);
            }else{
                let sa = new SwalAlert();
                sa.Error('error', 'Error!', data.error);
            }
        }).catch(err => {
            console.error("ERROR: ", err)
        });
    }

    Create(response) {
        document.getElementById("loadForm").innerHTML = "";
        let btn = new HtmlButton(this.config);
        let form = new Form(this.config, this.dictionary, this.icons);      
        document.getElementById("app_name").innerHTML = response.appName;
        document.getElementById("page_name").innerHTML = response.titleForm;
        document.getElementById("page_message").innerHTML = response.msgForm;
        document.getElementById("time").innerHTML = response.time;

        form.CreateFields(response.fields, 'container-inputs');

        const container = document.getElementById('container-inputs');
        response.fields.hidden.forEach(input => {
            const hidden = document.createElement("input");
            hidden.type = "hidden";
            hidden.id = input.id;
            hidden.value = input.value;
            container.appendChild(hidden);
        });

        response.buttons.forEach(button => {
            switch(button.mode){
                case 'SubmitLogin':
                    btn.CreateSubmitLogin(button, "container-submit");
                    break;

                case 'RedirectLogin':
                    btn.CreateCancelogin(button, "container-redirect");
                    break;

                case 'ResetLogin':
                    btn.CreateResetLogin(button, "container-reset");
                    break;
            }
        });
    }

    // Send(data) {
    //     console.log("sirve?");
    //     if (data.statusCode == 202) {
    //         window.location.href = data.url + "/token=" + data.token
    //     } else if (data.statusCode == 300) {
    //         Swal.fire({
    //             type: 'error',
    //             title: 'Oops...',
    //             confirmButtonText: 'Cambiar mi contraseña',
    //             text: data.result.message,
    //             footer: '',
    //             showCloseButton: true
    //         }).then(function(result) {
    //             if (result.value) {
    //                 window.location = $("#urlChangePwd").val();
    //             }
    //         })
    //     } else {
    //         Swal.fire({
    //             icon: 'error',
    //             title: 'Oops...',
    //             text: data.message
    //         });
    //         // for (var i = 0; i < fields.length; i++) {
    //         //     $("#" + fields[i]).prop("disabled", false);
    //         // }
    //     }
    // }

    // GetFields(formId) {
    //     var values = $("#" + formId).serialize();
    //     var parts = values.split('&');
    //     var fields = [];
    //     for (var i = 0; i < parts.length; i++) {
    //         var details = parts[i].split('=');
    //         fields[i] = details[0];
    //     }
    //     return fields;
    // }

    // ValidateForm(formId) {
    //     var values = $("#" + formId).serialize();
    //     var parts = values.split('&');
    //     var sendForm = true;
    //     for (var i = 0; i < parts.length; i++) {
    //         var details = parts[i].split('=');
    //         $("#" + details[0]).removeClass("is-invalid");
    //         if (details[1] == '') {
    //             $("#" + details[0]).addClass("is-invalid");
    //             sendForm = false;
    //         }
    //     }
    //     return sendForm;
    // }

    // LoadComponents() {
    //     $("#form").prop("name", this.response.data.nameForm);
    //     $("#page-title").html(this.response.data.pageTitle);
    //     $("#page-message").html(this.response.data.message);
    //     $("#app-name").html(this.response.appName);
    //     if (this.response.recaptchaEnabled == true) {
    //         var recaptcha = '<div class="text-muted">' + this.response.recaptchaText + '</div>' + '<div class="container my-2 d-flex justify-content-center">' + '<div class="g-recaptcha" data-sitekey="' + this.response.publicKey + '"></div>' + '</div>';
    //         $("#recaptcha").html(recaptcha);
    //     }
    //     // recarga del formulario
    //     var f = new FormFields();
    //     $("#fields-form").html(f.DrawForm(this.response.data.form.fields));
    //     var b = new HtmlButton();
    //     var submit = this.response.data.buttonSubmit;
    //     $("#submit").html(b.Button(submit.type, submit.name, submit.classname, submit.event, submit.icon, submit.text));
    //     var cancel = this.response.data.buttonCancel;
    //     $("#cancel").html(b.Button(cancel.type, cancel.name, cancel.classname, cancel.event, cancel.icon, cancel.text));
    // }
}