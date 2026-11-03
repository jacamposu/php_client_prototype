/*
 * Funciones de proposito general
*/

export class Functions{

    static hiddenColumn(fieldId) {
        let tableid = 'myTable'
        for (var i = 2; i < $("#"+tableid+" th").length; i++) {
            if ($('#'+tableid+' th:eq(' + i + ')').prop("id") == fieldId) {
                for (var j = 0; j < $("#"+tableid+" tr").length; j++) {
                    $('#'+tableid+' tr:eq(' + j + ') th:eq(' + i + ')').hide()
                    $('#'+tableid+' tr:eq(' + j + ') td:eq(' + i + ')').hide()
                }
            }
        }
        $("#chk_" + fieldId).attr("onchange", `ShowColumn('${fieldId}');`)
    }

    static ShowColumn(fieldId) {
        let tableid = 'myTable'
        for (var i = 2; i < $("#"+tableid+" th").length; i++) {
            if ($('#'+tableid+' th:eq(' + i + ')').prop("id") == fieldId) {
                for (var j = 0; j < $("#"+tableid+" tr").length; j++) {
                    $('#'+tableid+' tr:eq(' + j + ') th:eq(' + i + ')').show();
                    $('#'+tableid+' tr:eq(' + j + ') td:eq(' + i + ')').show();
                }
            }
        }
        $("#chk_" + fieldId).attr("onchange", `hiddenColumn('${fieldId}');`);
    }

    static chekear() {
        $('input[type="checkbox"]').change(function(e) {
            var checked = $(this).prop("checked"),
                container = $(this).parent(),
                siblings = container.siblings();
            container.find('input[type="checkbox"]').prop({
                indeterminate: false,
                checked: checked
            });

            function checkSiblings(el) {
                var parent = el.parent().parent(),
                    all = true;
                el.siblings().each(function() {
                    return all = ($(this).children('input[type="checkbox"]').prop("checked") === checked);
                });
                if (all && checked) {
                    parent.children('input[type="checkbox"]').prop({
                        indeterminate: false,
                        checked: checked
                    });
                    checkSiblings(parent);
                } else if (all && !checked) {
                    parent.children('input[type="checkbox"]').prop("checked", checked);
                    parent.children('input[type="checkbox"]').prop("indeterminate", (parent.find('input[type="checkbox"]:checked').length > 0));
                    checkSiblings(parent);
                } else {
                    el.parents("li").children('input[type="checkbox"]').prop({
                        indeterminate: true,
                        checked: true
                    });
                }
            }
            checkSiblings(container);
        });
    }

    static sortTable(n, dir) {
        var table, rows, switching, i, x, y, shouldSwitch, switchcount = 0;
        table = document.getElementById("myTable");
        switching = true;
        
        while (switching) {
            switching = false;
            rows = table.rows;
            console.log(switching)
            for (i = 1; i < (rows.length - 1); i++) {
                shouldSwitch = false;
                x = rows[i].getElementsByTagName("TD")[n];
                y = rows[i + 1].getElementsByTagName("TD")[n];
                if (dir == "asc") {
                    if (isNumeric(x.innerHTML) && isNumeric(y.innerHTML)) {
                        if (parseFloat(x.innerHTML) > parseFloat(y.innerHTML)) {
                            shouldSwitch = true;
                            break;
                        }
                    } else {
                        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                            shouldSwitch = true;
                            break;
                        }
                    }
                } else if (dir == "desc") {
                    if (isNumeric(x.innerHTML) && isNumeric(y.innerHTML)) {
                        if (parseFloat(x.innerHTML) < parseFloat(y.innerHTML)) {
                            shouldSwitch = true;
                            break;
                        }
                    } else {
                        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                            shouldSwitch = true;
                            break;
                        }
                    }
                }
            }
            if (shouldSwitch) {
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
                switchcount++;
            } else {
                if (switchcount == 0 && dir == "asc") {
                    dir = "desc";
                    switching = true;
                }
            }
        }
    }

    static isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    static appDarkenRowSelected(tag) {
        tag.classList.toggle("bg-row-selected");
    }

    static appGetDataXHR(method, url) {
        let xhr = new XMLHttpRequest();
        xhr.open(method, url, false);
        xhr.send(null);
        if (xhr.status == 200 || xhr.status == 304) {
            if (xhr.responseText.length > 0) {
                resp = xhr.responseText;
                arrData = eval('(' + xhr.responseText + ')');
                return arrData;
            }
        }
    }

    static appPostDataXHR(method, url) {
        let postxhr = new XMLHttpRequest();
        postxhr.open(method, url, false);
        postxhr.send(null);
        if (postxhr.status == 200 || postxhr.status == 304) {
            if (postxhr.responseText.length > 0) {
                resp = postxhr.responseText;
                return resp;
            }
        }
    }

    static check(input) {
        $("#error_" + input.id).css("display", "none");
        $("#error_" + input.id).html();
        var ereg = new RegExp("^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$");
        if (input.value != document.getElementById('pass_nuevo').value) {
            $("#error_" + input.id).css("display", "block");
            $("#error_" + input.id).html(langPassNotEqual);
        } else if (ereg.test(input.value) === false) {
            $("#error_" + input.id).css("display", "block");
            $("#error_" + input.id).html(langPassAllowed);
        }
    }

    static appSendFormChecks(tag, sqlTable, keyField, url, deleteFiel, dbAlternative) {
        var checksseleccionados = new Array();
        var infoTabla = new Array();
        infoTabla.push(sqlTable);
        infoTabla.push(keyField);
        infoTabla.push(deleteFiel);
        infoTabla.push(dbAlternative);
        // Identifica los checkbox seleccionados en tabla
        $("#myTable input:checkbox:checked").each(function() {
            checksseleccionados.push($(this).attr("id"));
        });
        // Verifica si al menos uno de los checks est� marcado
        if (checksseleccionados.length == 0 || typeof checksseleccionados === 'undefined') {
            appJsAlert('�OPSSS!', langChooseElement, 'error');
            return;
        }
        var datos = {
            'arrayInfo': infoTabla,
            'arrayChecks': checksseleccionados
        }
        // Se env�a el formulario al archivo procesador
        $.ajax({
            async: true,
            type: "POST",
            url: url,
            data: {
                'data': JSON.stringify(datos)
            },
            dataType: 'json',
            beforeSend: function() {
                // Desmarca los checks seleccionados en la tabla
                $('#myTable input[type="checkbox"]').each(function() {
                    $(this).prop({
                        checked: false
                    });
                    $(this).prop({
                        indeterminate: false
                    });
                });
            },
            success: function(result) {
                if (result > 0) {
                    appJsAlert(langTitleDelete, result + ' ' + langElementsDeleted, 'success', false);
                    setTimeout(function() {
                        window.location.reload();
                    }, 2000);
                } else {
                    appJsAlert('Error', result, 'error');
                }
            },
            error: function(request, status, error) {
                appJsAlert(status, request.responseText, 'error');
            }
        });
    }

    static CountChars(item) {
        item.addEventListener('keyup', function() {
            maxlength = item.getAttribute('maxlength');
            idTag = item.getAttribute('id');
            numChars = item.value.length;
            $("#CountCharsTXA_" + idTag).html(numChars + "/" + maxlength);
            if (numChars == maxlength) {
                let msg = 'Ha alcanzado el máximo de caracteres permitidos';
                mostrar_error(item, getMessageError(msg));
            } else {
                //quitar_error(item);
            }
        });
    }

    static OnlyNumbers(string) {
        var out = '';
        var filtro = '1234567890'; //Caracteres validos
        //Recorrer el texto y verificar si el caracter se encuentra en la lista de validos 
        for (var i = 0; i < string.length; i++) {
            if (filtro.indexOf(string.charAt(i)) != -1) {
                out += string.charAt(i);
            }
        }
    }

    static LoadDataUO(url)
    {
        const load = new Load()
        load.LoadData(url)
    }

    CreateRowTwoColumns(valueCell1,valuecell2){
        const row = document.createElement("tr");

        const lcell = document.createElement("th");
        lcell.align = "left"
        lcell.innerHTML = valueCell1;

        const rcell = document.createElement("td");
        rcell.align = "left"
        rcell.innerHTML = valuecell2;

        row.appendChild(lcell);
        row.appendChild(rcell);

        return row;
    }
    

    

    static DownloadTXTBase64(data){
        // Decodificar la cadena en base64
        const decodedString = atob(data.fileBase64);
        // Crear un blob con el contenido decodificado
        const blob = new Blob([decodedString], { type: 'text/plain' });
        // Crear un enlace para descargar el archivo
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = data.filename+'.'+data.format;
        // Añadir el enlace al documento y hacer clic en él para iniciar la descarga
        document.body.appendChild(link);
        link.click();
        // Eliminar el enlace del documento
        document.body.removeChild(link);
    }

    static filterTable(column) {
        const filter = document.getElementById('filter_table_'+column).value.toLowerCase();
        const filas = document.querySelectorAll('#myTable tbody tr');

        if(filter.length > 2 || filter.length == 0){
            filas.forEach(fila => {
                const nombre = fila.cells[column].textContent.toLowerCase();
                if (nombre.includes(filter)) {
                    fila.style.display = '';
                } else {
                    fila.style.display = 'none';
                }
            });
        }
    }

    static recaptcha(info){
        if(info.recaptchaEnabled)
        {
            return `<div>
                    <small class="text-danger">${info.recaptchaText}</small>
                </div>
                <div class="g-recaptcha my-3" data-sitekey="${info.recaptchaPublicKey}"></div>
                `
        }
        return '';
    }

    ChangeUserPhoto = (values) => {
        Swal.fire({
            title: values.title,
            input: "file",
            inputAttributes: {
                accept: "image/*",
                autocapitalize: "off"
            },
            showCancelButton: true,
            confirmButtonText: values.confirmButton,
            showLoaderOnConfirm: true,
            didOpen: () => {
                const input = Swal.getInput();
                if (input) {
                    input.classList.add("form-control");
                    
                }
            },
            preConfirm: async () => {
                await fetch(values.url,values.settings).then(response => response.json()).then(data => {
                    if (data.statusCode == 200){
                        Swal.fire({
                            title: data.response
                        });
                        return Swal.showValidationMessage(data.response);
                    } else {
                        Swal.fire({
                            title: data.description
                        });
                        return Swal.showValidationMessage(`${JSON.stringify(data)}`);
                    }
                }).catch(error => {
                    Swal.showValidationMessage(`Request failed: ${error}`);
                });
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: `${result.value.login}'s avatar`,
                    imageUrl: result.value.avatar_url
                });
            }
        });
    }


    ChangeUserProfile = (values) => {
        Swal.fire({
            title: values.title,
            input: "text",
            inputAttributes: {
                autocapitalize: "off"
            },
            showCancelButton: true,
            confirmButtonText: values.confirmButton,
            showLoaderOnConfirm: true,
            preConfirm: async (login) => {
                await fetch(values.url,values.settings).then(response => response.json()).then(data => {
                    if (data.statusCode == 200){
                        Swal.fire({
                            title: data.response
                        });
                        return Swal.showValidationMessage(data.response);
                    } else {
                        Swal.fire({
                            title: data.description
                        });
                        return Swal.showValidationMessage(`${JSON.stringify(data)}`);
                    }
                }).catch(error => {
                    Swal.showValidationMessage(`Request failed: ${error}`);
                });
            },
            allowOutsideClick: () => !Swal.isLoading()
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: `${result.value.login}'s avatar`,
                        imageUrl: result.value.avatar_url
                    });
                }
            });
    }

    ChangeUserPassword = (values) => {
        Swal.fire({
            title: values.title,
            html:
                `<input id="swal-input1" class="swal2-input" placeholder="Ingrese contraseña" type="text">` +
                `<input id="swal-input2" class="swal2-input" placeholder="Confirme contraseña" type="password">`,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: values.confirmButton,
            showLoaderOnConfirm: true,
            preConfirm: async () => {
                await fetch(values.url,values.settings).then(response => response.json()).then(data => {
                    if (data.statusCode == 200){
                        Swal.fire({
                            title: data.response
                        });
                        return Swal.showValidationMessage(data.response);
                    } else {
                        Swal.fire({
                            title: data.description
                        });
                        return Swal.showValidationMessage(`${JSON.stringify(data)}`);
                    }
                }).catch(error => {
                    Swal.showValidationMessage(`Request failed: ${error}`);
                });
            },
            allowOutsideClick: () => !Swal.isLoading()
            }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: `${result.value.login}'s avatar`,
                    imageUrl: result.value.avatar_url
                });
            }    
        });
    }
}