export const customValidations = {
    ValidarCorreoElectronico: function(e) {
        const regex = /^[^@]+@[^@]+\.[^@]+$/;
        const match = regex.test(e.value);
        if(!match){
            $("#msgErrorField"+e.id).html(e.title+" incorrecto")
            $("#"+e.id).addClass("is-invalid")
            $("#msgErrorField"+e.id).addClass("text-danger")
        }
    },
    ValidarDireccion: function(e) {
        const match = this.IsValidAddres(e.value);

        if(!match){
            document.getElementById("msgErrorField"+e.id).innerHTML = e.title+" incorrecta"
            $("#"+e.id).addClass("is-invalid text-danger")
            $("#msgErrorField"+e.id).addClass("text-danger")
        }
    },
    ValidarNumeroDocumento: function(e){
        const resp = this.IsValidDocumentNumber(e);
        if(resp != ''){
            document.getElementById("msgErrorField"+e.id).innerHTML = resp
            $("#"+e.id).addClass("is-invalid text-danger")
            $("#msgErrorField"+e.id).addClass("text-danger") 
        }
    },
    ValidarNombresApellidos: function(e){
        const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü'´`-]+(?:\s[A-Za-zÁÉÍÓÚáéíóúÑñÜü'´`-]+)*$/;
        const match = regex.test(e.value);
        if(!match){
            document.getElementById("msgErrorField"+e.id).innerHTML = e.title+" incorrecto"
            $("#"+e.id).addClass("is-invalid text-danger")
            $("#msgErrorField"+e.id).addClass("text-danger")
            return
        }
        e.value = this.ucwords(e.value)
    },
    ucwords(str) {
        return str.toLowerCase().replace(/\b\w/g, function(char) {
            return char.toUpperCase();
        });
    },
    IsValidDocumentNumber: function(e){
        const regex = /^[1-9][0-9]+$/;
        const min = 4;

        if(e.value.length < min || e.value.length > e.maxLength){
            return 'El '+e.title+' debe contener entre '+min+' y '+e.maxLength+' dígitos.';
        }

        if (!regex.test(e.value)){
            return 'El '+e.title+' debe ser de tipo numérico, no debe tener caracteres especiales y no debe comenzar por cero (0).';
        }

        if(e.value.length === 10 && e.value.substring(0,1) != 1){
            return 'El '+e.title+' debería comenzar por el número <strong>(1)</strong>.';
        }

        if(e.value.length == 9){
            return 'El '+e.title+' no debe ser de nueve dígitos.';
        }
        return '';
    },
    IsValidAddres: function(direccion) {
        const regex = /^(calle|carrera|diagonal|transversal)\s+(\d{1,3}[A-Za-z]?)\s(bis)?\s?(sur)?\s*#\s*(\d{1,3}[A-Za-z]?)\s*-\s*(\d{1,3}[A-Za-z]?)\s?(este|oeste)?$/i;
        const match = direccion.match(regex);

        if(!match) return false;

        // Extraer los números (ignorando letras) para validar que no sean mayores a 300
        const [_, tipo, num1, num2, num3] = match;
        const n1 = parseInt(num1, 10);
        const n2 = parseInt(num2, 10);
        const n3 = parseInt(num3, 10);

        return n1 <= 300 && n2 <= 300 && n3 <= 300;
    }
};