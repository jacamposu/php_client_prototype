import { HtmlForms } from '../../Public/Js/HtmlForms.js';
import { Util } from '../../Public/Js/Util.js';
import {Events} from '../../Public/Js/Events.js';
import {customValidations} from '../../Public/Js/Validations.js';


export class InputsForms {

    constructor(field, container, config, dictionary, icons) {
		this.field = field;
		this.container = container;
		this.config = config;
		this.dictionary = dictionary;
		this.icons = icons;

		const util = new Util();
		const dictionaryField = this.dictionary[field.fieldName];
		
		this.htmlform = new HtmlForms(dictionaryField, config, icons);
		
		if(dictionaryField){
			this.id = !util.IsNullOrEmpty(dictionaryField.fieldName) ? dictionaryField.fieldName : null;
			this.name = !util.IsNullOrEmpty(dictionaryField.fieldName) ? dictionaryField.fieldName : null;
			this.description = !util.IsNullOrEmpty(dictionaryField.desc) ? dictionaryField.desc : null;
			this.simpleId = !util.IsNullOrEmpty(dictionaryField.fieldName) ? dictionaryField.fieldName : null;
			this.length = !util.IsNullOrEmpty(dictionaryField.length) ? dictionaryField.length : null;
			this.maxlength = !util.IsNullOrEmpty(dictionaryField.length) ? dictionaryField.length : null;
			this.minValue = !util.IsNullOrEmpty(dictionaryField.unsigned) ? 0 : null;
			this.placeholder = !util.IsNullOrEmpty(dictionaryField.placeholder) ? dictionaryField.placeholder : null;
			this.title = !util.IsNullOrEmpty(dictionaryField.placeholder) ? dictionaryField.placeholder : null;
			this.readOnly = !util.IsNullOrEmpty(dictionaryField.readonly) ? dictionaryField.readonly : null;
			this.required = !util.IsNullOrEmpty(dictionaryField.required) ? dictionaryField.required : null;
			this.rows = !util.IsNullOrEmpty(dictionaryField.textareaRows) ? dictionaryField.textareaRows : null;
			this.columns = !util.IsNullOrEmpty(dictionaryField.textareaChars) ? dictionaryField.textareaChars : null;
			this.pattern = !util.IsNullOrEmpty(dictionaryField.pattern) ? dictionaryField.pattern : null;
			this.mode = !util.IsNullOrEmpty(dictionaryField.inputTypeForm) ? dictionaryField.inputTypeForm : '';
			this.validationForm = !util.IsNullOrEmpty(dictionaryField.validationForm) ? dictionaryField.validationForm : '';

			this.disabled = !util.IsNullOrEmpty(field.disabled) ? field.disabled : null;
			this.value = !util.IsNullOrEmpty(field.value) ? field.value : null;
			this.valueTXA = !util.IsNullOrEmpty(field.value) ? field.value : '';

			this.selectMultiple = this.mode == 'selectMultiple' ? 'multiple' : '';
			this.countChars = 0;//this.countChars(this.simpleId, this.value.length, this.length);
			this.checked = '';/*!util.IsEmptyOrNull(dictionary.text) ? 'checked="checked"' :*/ 
		}
    }

	number() {
		let input = document.createElement('input')
        input.type = 'number'
		input.className = 'form-control inputNumber'
        input.id = this.id
        input.name = this.name
		input.placeholder = this.placeholder
		input.title = this.title
		input.maxLength = this.maxlength
		input.required = this.required
		input.readOnly = this.readOnly
		input.disabled = this.disabled
		input.value = this.value
		input.pattern = this.pattern
		input.minValue = this.minValue
		input.autocomplete = 'nope'
		input.setAttribute('data-toggle', 'tooltip');
		input.setAttribute('data-placement', 'top');

        document.getElementById(this.container).appendChild(this.htmlform.ContentInput(input))

		let event = new Events()
		
		input.onkeydown = function (){
            event.CountChars(this)
        }

		input.oninput = function (){
			if(this.value.length > this.maxLength) 
				this.value = this.value.slice(0, this.maxLength)
		}

		const functionName = this.validationForm;
		input.onchange = function(){
			event.ValidateField(this)
			if (typeof customValidations[functionName] === "function") {
				customValidations[functionName](this);
			}
		}
    }

    password() {
		let input = document.createElement('input')
        input.type = 'password'
		input.className = 'form-control'
        input.id = this.id
        input.name = this.name
		input.placeholder = this.placeholder
		input.title = this.title
		input.maxLength = this.maxlength
		input.required = this.required
		input.readOnly = this.readOnly
		input.disabled = this.disabled
		input.autocomplete = 'nope'
		input.setAttribute('data-toggle', 'tooltip');
		input.setAttribute('data-placement', 'top');

        document.getElementById(this.container).appendChild(this.htmlform.ContentInput(input, 'nonCountChars'))
		
		input.onkeydown = function ()
        {
			let event = new Events()
            event.CountChars(this)
        }
    }

	select(field) {
		let input = document.createElement('select')
		input.className = 'form-select'
        input.id = this.id
        input.name = this.name
		input.placeholder = this.placeholder
		input.title = this.title
		input.maxLength = this.maxlength
		input.required = this.required
		input.readOnly = this.readOnly
		input.disabled = this.disabled
		input.autocomplete = 'nope'
		input.setAttribute('data-toggle', 'tooltip');
		input.setAttribute('data-placement', 'top');

		if(field.value.value == ''){
			const option = document.createElement('option');
			option.value = ''
			option.textContent = 'Elija una opción';
			input.appendChild(option);
		}

		if(field.options.length > 0){
			field.options.forEach(select => {
				const option = document.createElement('option');
				option.value = select.value
				option.textContent = select.text;
				input.appendChild(option);
			});
		}

		if(field.value.value != ''){
			input.selectedIndex = field.value.value
		}

        document.getElementById(this.container).appendChild(this.htmlform.ContentInput(input, 'nonCountChars'))

		let event = new Events()
		input.onchange = function ()
        {
			if(field.metadata.dependentList){
				event.GetListOptionsChild(field.metadata.dependentList, this)
			}
            event.ValidateField(this)
        }
    }

	textarea() {
        let input = document.createElement('textarea')
        
		input.className = 'form-control'
        input.id = this.id
        input.name = this.name
		input.placeholder = this.placeholder
		input.title = this.title
		input.pattern = this.pattern
		input.rows = this.rows
		input.column = this.columns
		input.maxLength = this.maxlength
		input.required = this.required
		input.readOnly = this.readOnly
		input.disabled = this.disabled
		input.autocomplete = 'nope'
		input.value = this.valueTXA
		input.setAttribute('data-toggle', 'tooltip');
		input.setAttribute('data-placement', 'top');

        document.getElementById(this.container).appendChild(this.htmlform.ContentInput(input))

		let event = new Events()
		
		input.onkeydown = function(){
            event.CountChars(this)
        }

		const functionName = this.validationForm;
		input.onchange = function(){
			event.ValidateField(this)
			if (typeof customValidations[functionName] === "function") {
				customValidations[functionName](this);
			}
		}
    }

	text() {
		let input = document.createElement('input')
        input.type = 'text'
		input.className = 'form-control inputTextCount'
        input.id = this.id
        input.name = this.name
		input.placeholder = this.placeholder
		input.title = this.title
		input.maxLength = this.maxlength
		input.required = this.required
		input.setAttribute('data-toggle', 'tooltip');
		input.setAttribute('data-placement', 'top');

        document.getElementById(this.container).appendChild(this.htmlform.ContentInput(input))

		let event = new Events()
        input.onkeydown = function ()
        {
            event.CountChars(this)
        }
		
		const functionName = this.validationForm;
		input.onchange = function ()
        {
            event.ValidateField(this)
			if (typeof customValidations[functionName] === "function") {
				customValidations[functionName](this);
			}
        }
    }

    Checkbox() {
		const input = document.createElement("input");
		input.type = "checkbox";
		input.className = "form-check-input";
		input.value = "1";
		input.id = this.id;
		input.name = this.name;
		input.title = this.title;
		input.checked = this.checked;
		input.required = this.required;
		input.setAttribute("data-toggle", "toggle");
		input.setAttribute("data-width", "80");
		input.setAttribute("data-onstyle", "outline-primary");
		input.setAttribute("data-offstyle", "outline-secondary");
		input.setAttribute("data-on", '<em class="fas fa-check"></em><small> Yes</small>');
		input.setAttribute("data-off", '<i class="fas fa-exclamation"></i><small> No</small>');

        document.getElementById(this.container).appendChild(this.htmlform.ContentInput(input, 'nonCountChars', 'form-check form-switch'));
    }

	Hidden() {
		const input = document.createElement("input");
		input.type = "hidden";
		input.id = this.id;
		input.name = this.name;
		input.value = this.value;

        document.getElementById(this.container).appendChild(input);
    }

	file(value) {
        const multiple = this.selectMultiple ? "multiple=\"multiple\"" : null;
        // const arrayMultiple = multiple ? '[]' : null;
        // const dwnFileLink = this.IsNullOrEmpty(value) ? false : true;
		
		const input = document.createElement("input");
		input.type = "file";
		input.className = "custom-file-input";
		input.id = this.id;
		input.name = this.name;
		input.value = this.value;
		input.maxFileSize = this.length;
		input.accept = ".pdf,.png,image/jpeg"

		const inputH = document.createElement("input");
		inputH.type = "hidden";
		inputH.name = '';
		inputH.value = '';

		document.getElementById(this.container).appendChild(this.htmlform.ContentInput(input, 'nonCountChars'));
    }

	color() {
		const input = document.createElement("input");
		input.type = "color";
		input.className = "form-control";
		input.id = this.id;
		input.name = this.name;

        document.getElementById(this.container).appendChild(this.htmlform.ContentInput(input, 'nonCountChars'));
    }

	date() {
		const input = document.createElement("input");
		input.type = "text";
		input.className = "form-control datepicker inputdateReadonly";
		input.id = this.id;
		input.name = this.name;
		input.placeholder = this.placeholder;
		input.value = this.value;
		input.title = this.title;
		input.pattern = this.pattern;
		input.required = this.required;
		input.readonly = this.readOnly;
		input.disabled = this.disabled
       
        document.getElementById(this.container).appendChild(this.htmlform.ContentInput(input, 'nonCountChars'));
    }

	Datetime() {
        const input = document.createElement("input");
		input.type = "text";
		input.className = "form-control datepicker inputdateReadonly";
		input.id = this.id;
		input.name = this.name;
		input.placeholder = this.placeholder;
		input.value = this.value;
		input.title = this.title;
		input.pattern = this.pattern;
		input.required = this.required;
		input.readonly = this.readOnly;
		input.disabled = this.disabled
       
        document.getElementById(this.container).appendChild(this.htmlform.ContentInput(input, 'nonCountChars'));
    }

	nonEdit(valueEncrypt) {
		let input = document.createElement('input');
        input.type = 'text';
		input.className = 'form-control inputTextCount';
        input.id = this.id;
        input.name = this.name;
		input.placeholder = this.placeholder;
		input.title = this.title;
		input.maxLength = this.maxlength;
		input.required = this.required;
		input.disabled = this.disabled;
		input.value = this.value;
		input.setAttribute('data-toggle', 'tooltip');
		input.setAttribute('data-placement', 'top');

		const hidden = document.createElement("input");
		hidden.type = "hidden";
		hidden.id = this.id;
		hidden.value = valueEncrypt;

		document.getElementById(this.container).appendChild(this.htmlform.ContentInput(input));
		// document.getElementById(this.container).appendChild(this.htmlform.ContentInput(hidden));
    }

	radio() {
		const input = document.createElement('div');

		// Primer radio (Sí)
		const radioYesContainer = document.createElement('div');
		radioYesContainer.className = 'custom-control custom-radio';

		const radioYes = document.createElement('input');
		radioYes.type = 'radio';
		radioYes.className = 'custom-control-input';
		radioYes.id = this.id+'SI';
		radioYes.name = 'Radio';
		radioYes.value = '1';

		const labelYes = document.createElement('label');
		labelYes.className = 'custom-control-label';
		labelYes.setAttribute('for', 'RadioYes');
		labelYes.textContent = 'Si';

		radioYesContainer.appendChild(radioYes);
		radioYesContainer.appendChild(labelYes);

		// Segundo radio (No)
		const radioNoContainer = document.createElement('div');
		radioNoContainer.className = 'custom-control custom-radio';

		const radioNo = document.createElement('input');
		radioNo.type = 'radio';
		radioNo.className = 'custom-control-input';
		radioNo.id = this.id+'NO';
		radioNo.name = 'Radio';
		radioNo.value = '0';

		const labelNo = document.createElement('label');
		labelNo.className = 'custom-control-label';
		labelNo.setAttribute('for', 'RadioNo');
		labelNo.textContent = 'No';

		radioNoContainer.appendChild(radioNo);
		radioNoContainer.appendChild(labelNo);

		// Agregar ambos al contenedor principal
		input.appendChild(radioYesContainer);
		input.appendChild(radioNoContainer);

        document.getElementById(this.container).appendChild(this.htmlform.ContentInput(input, 'nonCountChars'));
    }





	

    checkboxGroup() {
        const input = 'creando campo CheckboxGroup';
		document.getElementById(this.container).appendChild(this.htmlform.ContentInput(input, 'nonCountChars'));
    }

    dateRange() {
        const input = 'creando campo DateRange';
		document.getElementById(this.container).appendChild(this.htmlform.ContentInput(input, 'nonCountChars'));
    }

    datetimeRange() {
        const input = 'creando campo DatetimeRange';
		document.getElementById(this.container).appendChild(this.htmlform.ContentInput(input, 'nonCountChars'));
    }

    slide() {
        const input = 'creando campo Slide';
		document.getElementById(this.container).appendChild(this.htmlform.ContentInput(input, 'nonCountChars'));
    }

	textareaEditor(){
		const input = 'creando campo textareaEditor';
		document.getElementById(this.container).appendChild(this.htmlform.ContentInput(input, 'nonCountChars'));
	}
    




    selectIcon(fieldList) {
        let input = '';
        let elemnt0Selected = array_values(fieldList[0])[0];
        let checked = '';
        if (elemnt0Selected === 'Seleccione') {
            unset(fieldList[0]);
        } else {
            checked = 'checked="checked"';
        }
        fieldList.forEach(option => {
            let key = array_keys($option)[0];
            let iconKey = this.IsNullOrEmpty(this.simpleId) && this.IsNullOrEmpty($key) ? null : this.simpleId.key;
            input += `
				<input 
					type="radio" 
					id="${iconKey}" ${this.name} ${this.checked} />
				<label 
					class="px-2 py-1 border" 
					for="${iconKey}">${this.PrintIcon(key)}</label>`;
        });
        let contentInput = `
			<div class="radio border p-2">${input}</div>`;
        return this.ContentInput(this.dictionary, null, contentInput);
    }
}