export class Util {
    
    IsNullOrEmpty(value) {
        return value === null || value === undefined || value === '' || value == 0;
    }


    CopyToClipboard(tagId) {
        var aux = document.createElement("input");
        aux.setAttribute("value", document.getElementById(tagId).innerHTML);
        document.body.appendChild(aux);
        aux.select();
        document.execCommand("copy");
        document.body.removeChild(aux);
    }
    OpenNewWindow(url, windowName, width = '', height = '', top = '', left = '') {
        var width = width || 700;
        var height = height || 500;
        var top = top || 50;
        var left = left || 50;
        let features = 'width=' + width + ',height=' + height + ',top=' + top + ',left=' + left + ',resizable=yes';
        newwindow = window.open(url, windowName, features);
        if (window.focus) newwindow.focus();
    }
    // implementacion: onclick="ShowHidePassword('{$id}', 'btnInputPdw{$id}');"
    ShowHidePassword(item) {
        item.addEventListener('click', function() {
            idItem = item.id;
            tag = idItem.split('-')[1];
            if ($("#" + tag).attr("type") == "password") {
                $("#" + tag).attr("type", "text");
                $("#" + tag).focus();
                $("#" + idItem).children().removeClass('fa fa-eye').addClass('fa fa-eye-slash');
            } else {
                $("#" + tag).attr("type", "password");
                $("#" + tag).focus();
                $("#" + idItem).children().removeClass('fa fa-eye-slash').addClass('fa fa-eye');
            }
        });
    }
    Redirect(value, recordId) {
        var parametros = value.split("***");
        var Accion = parametros[0];
        var Url = parametros[1];
        window.location = Url + "?Accion=" + Accion + "&IdRegistro=" + recordId;
    }
    DarkenRowSelected(tag) {
        var selected = $(tag).hasClass("bg-row-active");
        $("#myTable tr").removeClass("table-active");
        if (!selected) {
            $(tag).addClass("table-active");
        }
    }
}