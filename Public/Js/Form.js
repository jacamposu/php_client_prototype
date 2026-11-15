import { InputsForms } from '../../Public/Js/InputsForms.js';
import { HtmlForms } from '../../Public/Js/HtmlForms.js';
import { Files } from '../../Public/Js/Files.js';

export class Form {

    constructor() {}

    CreateFields(fields,container){
        const form_id = "formulario";
        const form = document.createElement("form");
        form.id = form_id;

        const div = document.createElement("div");
        div.className = "row";
        div.id = form_id+"_container";
        
        document.getElementById(container).appendChild(form);
        document.getElementById(form_id).appendChild(div);

        // campos visibles
        fields.visible.forEach(field => {
            this.RenderInput(field, form_id+"_container");
        });

        // campos ocultos
        // fields.hidden.forEach(field => {
        //     field.metadata = {};
        //     field.metadata.inputTypeForm = 'Hidden';
        //     field.metadata.fieldName = field.id;
        //     this.RenderInput(field,form_id+"_container");
        // });
    }

    RenderInput(field, container) {
        const input = new InputsForms(field, container);

        const inputTypeMap = {
            'Checkbox': () => input.Checkbox(),
            'CheckboxGroup': () => input.CheckboxGroup(),
            'Color': () => input.Color(),
            'Date': () => input.Date(),
            'DateRange': () => input.DateRange(),
            'Datetime': () => input.Datetime(),
            'DatetimeRange': () => input.DatetimeRange(),
            'File': () => input.File(field?.value),
            'Hidden': () => input.Hidden(),
            'KeyField': () => {
                if (field.disabled === 'disabled') {
                    input.nonEdit(field.value);
                } else {
                    input.text();
                }
            },
            'NonEdit': () => {
                const encryptedValue = openssl_encrypt(
                    field?.value,
                    config.security.encrypt.method,
                    config.security.encrypt.key
                );
                input.NonEdit(encryptedValue);
            },
            'Number': () => input.number(),
            'Password': () => input.password(),
            'PasswordLogin': () => input.password(),
            'Radio': () => input.Radio(),
            'Select': () => input.select(field),
            'SelectIcon': () => input.SelectIcon(field?.list?.[field?.field]),
            'SelectLogin': () => input.select(field),
            'SelectMultiple': () => input.select(field),
            'Slide': () => input.Slide(),
            'Text': () => input.text(),
            'Textarea': () => input.textarea(),
            'TextareaEditor': () => input.TextareaEditor(),
            'TextLogin': () => input.text()
        };

        let dictionary = Files.ConvertJsonToObject('http://localhost/DEV/php_client_prototype/Config/LoginDictionary.json');        
        const inputType = dictionary[field.fieldName].inputTypeForm;
        const renderInput = inputTypeMap[inputType] || (() => input.text());
        renderInput();
    }
}