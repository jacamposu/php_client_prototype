import { SwalAlert } from '../../Public/Js/SwalAlert.js';
import { Url } from '../../Public/Js/Url.js';
import { ActionsPage } from './ActionsPage.js';


export class Events{

    static async SendForm(){
        let sa = new SwalAlert();
        dialog_loading.showModal();

        const url = new Url();
	    const config = await url.LoadResource('Config/Config.json');

        let array = []
        $('#formulario').serializeArray().map(element => {
            array[element.name] = element.value
        })

        // Agregar campos adicionales al sendform
        // let formulario = document.getElementById('form')
        // if(formulario.elements.idUser.value != '')
        // {
        // 	array['idUser'] = formulario.elements.idUser.value
        // }

        array['time'] = document.getElementById("time").textContent;

        const post = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(Object.assign({}, array)) 
        }

        const recuperarPassword = localStorage.getItem("RecuperarPassword") || '';
        
        if (!recuperarPassword == 'undefined') 
            post.headers.idUser = recuperarPassword

        const urlSend = config.apiLogin + $("#urlActionForm").val();
        // console.log(urlSend); return;
        fetch(urlSend, post).then(response => response.json()).then(data => {
            dialog_loading.close()
            if(data.statusCode == 200){
                if(data.response.token){
                    const payload = Events.parseJwt(data.response.token);
                    localStorage.setItem('PrototypeSessionToken', JSON.stringify(data.response.token))
                    localStorage.setItem('PrototypeSessionUser', JSON.stringify(payload.data))
                    window.location.href = config.project+"/Home/Home/"
                }else if(data.response.statusCode === 300){
                    localStorage.setItem('RecuperarPassword', JSON.stringify(data.response.user))
                    const urlRedirect = url.url.project + $("#urlRedirect").val();
                    sa.Redirect(data.response.statusText, data.response.title, data.response.buttonName, data.response.text, urlRedirect)
                }else if(data.response){
                    sa.Alert(data.response.title, data.response.text, 'success')
                }else{
                    sa.Error('error', data.response.title, data.response.message)
                }	
            }
            else
            {
                console.log(data)
                sa.Error('error', data.error.title, data.error.error);
            }
        }).catch(err => {
            console.error("ERROR: ", err)
        });
    }

    CountChars(item) {
        item.addEventListener('keyup', function() {
            let maxlength = item.getAttribute('maxlength');
            let idTag = item.getAttribute('id');
            let numChars = item.value.length;
            let msgError = 'Ha alcanzado el máximo de caracteres permitidos';
            $("#countChars_" + idTag).html(`[${numChars}/${maxlength} caracteres]`);
            if (numChars == maxlength) {
                $("#countChars_" + idTag).html(`<small><small>${msgError}</small></small>`);
                $("#countChars_" + idTag).css("color", "red")
            } else {
                $("#countChars_" + idTag).html(`[${numChars}/${maxlength}]`)
                $("#countChars_" + idTag).css("color", "black")
            }
        });
    }

    ValidateField(tag){
        if(!tag.checkValidity()){
            $("#"+tag.id).addClass("is-invalid")
            $("#"+tag.id).removeClass("is-valid")
        }
        else{
            $("#"+tag.id).addClass("is-valid")
            $("#"+tag.id).removeClass("is-invalid")
        }
        $("#msgErrorField"+tag.id).html(document.getElementById(tag.id).validationMessage)
    }

    

    InputFormMessage(field, text, text_color){
        $("#"+field).attr('class','').addClass(text_color).html(text)
    }

    GetListOptionsChild(childList, tag){
        let selectedValue = $(tag).val()
        const action = new ActionsPage()
        action.ChargeList(selectedValue, childList)
    }

    static parseJwt(token) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
        );
        return JSON.parse(jsonPayload);
    }
}