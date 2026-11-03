export const Files = {
    ConvertJsonToObject: function(file) {
        var xmlhttp = null;
        var xmlDoc = null;

        if (window.XMLHttpRequest)
        {
            xmlhttp=new XMLHttpRequest();
        }
        else
        {
            xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
        }

        xmlhttp.open("GET",file,false);
        xmlhttp.send();
        xmlDoc=xmlhttp.responseText;

        return JSON.parse(xmlDoc)
    }
}