import { HtmlUtil } from '../../Public/Js/HtmlUtil.js';
import { Files } from '../../Public/Js/Files.js';
import { Url } from '../../Public/Js/Url.js';
import { Util } from '../../Public/Js/Util.js';
import { Events } from '../../Public/Js/Events.js';


export class HtmlForms extends HtmlUtil {
	
    constructor(dictionary, config) {
        super();
		this.config = config;
        this.icons = Files.ConvertJsonToObject(this.config.project+'/Config/Icons.json');
		this.dictionary = dictionary;
		this.txt = 'Este campo es obligatorio';
    }
    
	
	ContentInput(input, countChars='', className=''){
		const util = new Util();
		const required = util.IsNullOrEmpty(this.dictionary.required) ? this.dictionary.required : this.dictionary.required
		const helpField = util.IsNullOrEmpty(this.dictionary.helpField) ? this.dictionary.helpField : this.dictionary.helpField
		const name = util.IsNullOrEmpty(this.dictionary.fieldName) ? this.dictionary.fieldName : this.dictionary.fieldName
		let sizeInput =  util.IsNullOrEmpty(this.dictionary.sizeInput) ? this.dictionary.sizeInput : this.dictionary.sizeInput
		const length = util.IsNullOrEmpty(this.dictionary.length) ? this.dictionary.length : this.dictionary.length
		const desc = util.IsNullOrEmpty(this.dictionary.desc) ? this.dictionary.desc : this.dictionary.desc

		const outerDiv = document.createElement("div");
		outerDiv.className = `${sizeInput} mb-3 position-relative`;

		const innerDiv = document.createElement("div");
		innerDiv.className = className != '' ? className : "form-floating";
		innerDiv.id = `input_${name}`;

		innerDiv.appendChild(input)

		innerDiv.appendChild(this.Label(name, desc))

		const div = document.createElement("div");
		div.className = "position-absolute top-0 end-0 mt-0 me-2 d-flex gap-2"

		if(required == 1){
			const IconRequiredField =  this.crearIconoAdvertencia(name, this.txt);
			div.appendChild(IconRequiredField);
		}

		if(helpField){
			const IconHelpField = this.crearMensajeAyuda(name, helpField);
			div.appendChild(IconHelpField);
		}

		innerDiv.appendChild(div);

		const div2 = document.createElement("div");
		div2.className = "d-flex justify-content-between mt-1"

		if(countChars != 'nonCountChars')
			div2.appendChild(this.cuentaCaracteres(name, length));

		div2.appendChild(this.mensajeError(name));

		innerDiv.appendChild(div2);

		outerDiv.appendChild(innerDiv);

		return outerDiv;
	}


	Label(inputName, text){
		let label = document.createElement('label');
		label.setAttribute('for', inputName);
		label.textContent = text;
		return label
	}
	

	cuentaCaracteres(name, length){
		const small = document.createElement("small");
		small.id = `countChars_${name}`;
		small.className = "text-muted"
		small.textContent = `[0/${length}]`;
		return small
	} 


	mensajeError(name){
		const spanError = document.createElement("small");
		spanError.id = `msgErrorField${name}`;
		spanError.className = "text-danger";
		spanError.style.fontSize = "10px";
		return spanError
	}
	

	crearIconoAdvertencia(name, text) {
		const span = document.createElement("span");
		span.style.cursor = "pointer";
		span.onclick = function () {
			let evt = new Events()
			evt.InputFormMessage(`msgErrorField${name}`, text, "text-danger");
		};

		const em = document.createElement("em");
		em.className = `${this.icons.CircleExclamation} text-danger cursor-pointer`;

		span.appendChild(em);
		return span;
	}

	
	crearMensajeAyuda(name, text) {
		const span = document.createElement("span");
		span.style.cursor = "pointer";

		span.addEventListener("click", function () {
			let evt = new Events()
			evt.InputFormMessage(`msgErrorField${name}`, text, "text-primary");
		});

		const em = document.createElement("em");
		em.className = `${this.icons.InfoCircle} text-primary cursor-pointer`;

		span.appendChild(em);
		return span;
	}
}