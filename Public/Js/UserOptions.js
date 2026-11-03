import { Files } from '../../Public/Js/Files.js';
import { Load } from '../../Public/Js/Load.js';
import { Functions } from '../../Public/Js/Functions.js';
import { Url } from '../../Public/Js/Url.js';


export class UserOptions{

    constructor(){
        this.settings = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'token': JSON.parse(localStorage.getItem("PrototypeSessionToken"))
            }
        };
        this.url = new Url();
        this.description = "Nuestra aplicación está pensada para simplificar y optimizar cada uno de estos procesos, ofreciéndote una solución integral.";
        this.textmade = `&copy; 2023, made with 🧡 by <a href="#" class="font-weight-bold" target="_blank">JAC Team</a> for a better web.`;
    }

    optionsMenu = (context) => {
        const container = document.getElementById("link-uo");
        const user_options = [
            {
                "link":"/UserOptions/UpdatePasswordForm/",
                "icon":"Key",
                "text":"Cambiar password",
                "description":"Cambiar mi password",
                "functionName": "ChangeUserPassword"
            },
            {
                "link":"/UserOptions/ChangeMyPhoto/",
                "icon":"User",
                "text":"Cambiar foto",
                "description":"Cambiar mi foto",
                "functionName": "ChangeUserPhoto"
            },
            {
                "link":"/UserOptions/ChangeMyProfile/",
                "icon":"User",
                "text":"Editar perfil",
                "description":"Editar mi perfil",
                "functionName": "ChangeUserProfile"
            }
        ];

        this.MyProfile("link-uo");

        const div_links = document.createElement("div");
        div_links.className = "container";
        div_links.id = "div_links";
        container.appendChild(div_links);

        this.Acceso(user_options[0], "div_links");
        this.Acceso(user_options[1], "div_links");
        this.Acceso(user_options[2], "div_links");
        // this.ButtonExit("div_links");
    }

    configuration = (context) => {
        context.response.userOptions.conf.forEach(function(item){
            const icon = icons[item.icon];
            const titleLink = item.text;
            
            const id = "box_icon_"+counter;

            const boxIcon = document.createElement("div");
            boxIcon.className = "border-bottom py-2";
            boxIcon.id = id;
            document.getElementById(container).appendChild(boxIcon);

            const element = document.createElement("em");
            element.className = `${icon} text-muted`;
            element.textContent = " "+titleLink;
            element.style.fontSize = "14px";
            element.title = titleLink;
            element.setAttribute("data-bs-toggle", "offcanvas");
            element.setAttribute("data-toggle", "tooltip");
            element.setAttribute("data-placement", "right");
            element.setAttribute("aria-controls", "offcanvasUserOptions");
            element.setAttribute("href", "#offcanvasUserOptions");
            element.setAttribute("role", "button");
            
            element.addEventListener("click", function() {
                const uo = new UserOptions();
                const url = context.response.urlProject+item.link;
                uo.LoadData(url);
            });

            document.getElementById(id).appendChild(element);
            counter++;
        })
    }

    ButtonExit(container){
        const load = new Load();

        let divExit = document.createElement("div");
        divExit.id = "exit";

        const link = document.createElement("a");
        link.className = "cursor-pointer text-decoration-none text-muted";

        const icon = document.createElement("em");
        icon.className = "fa fa-sign-out-alt text-danger";
        icon.id = "iconNavbarSidenav";
        icon.title = "Salir de la aplicación";
        icon.setAttribute("data-toggle", "tooltip");
        icon.setAttribute("data-placement", "right");

        const span = document.createElement("span");
        span.textContent = " Salir";
        span.className = "text-danger",

        link.addEventListener("click", function() {
            load.Exit();
        });

        link.appendChild(icon);
        link.appendChild(span);

        divExit.appendChild(link);
        
        const boxIcon = document.createElement("div");
        boxIcon.className = "container py-2";
        boxIcon.appendChild(divExit);

        document.getElementById(container).appendChild(boxIcon);
    }

    LoadData = async (url) =>{
        $("#title-config").html('');
        $("#content-config").html('');
        $("#content-preload").removeClass("d-none");

        await fetch(url, this.settings).then(response => response.json()).then(data => {
            
            if(data.statusCode = 200){
                const pageActions = {
                    profile: () => this.MyProfile(data),
                    InfoApp: () => this.InfoApp(data),
                    updatePwForm: () => this.UpdatePwdForm(),
                    customize: () => this.Customize(),
                    langUser: () => this.LangUser()
                };

                (pageActions[data.response.page] || (() => {
                    console.error(url, data);
                }))();
            }else{
                console.error("ERROR: ", "Opción no disponible");
            }
        }).catch(err => {
            console.error("ERROR: ", err.message)
        });
    }

    HomeOption = (element) => {
        const icons = Files.ConvertJsonToObject('../../Config/Icons.json');

        const div_content = document.createElement("div");
        div_content.className = "col-12";

        const div_row = document.createElement("div");
        div_row.className = "row";
        div_content.appendChild(div_row);

        const div_icon = document.createElement("div");
        div_icon.className = "col-2 border-right text-center py-3";
        div_row.appendChild(div_icon);

        const em = document.createElement("em");
        em.className = icons[element.icon.icon] + " " + element.icon.size + " " + element.icon.colortext;
        div_icon.appendChild(em);

        const div_description = document.createElement("div");
        div_description.className = "col-10 py-1";
        div_row.appendChild(div_description);

        const description = document.createElement("p");
        description.className = "text-secondary h6";
        description.title = element.description;
        description.innerText = element.title;
        div_description.appendChild(description);
        
        return div_content;
    }

    FooterOption = () => {
        const container = document.createElement("div");
        container.className = "container-fluid";

        const row = document.createElement("div");
        row.className = "row align-items-center justify-content-lg-between";

        const colLeft = document.createElement("div");
        colLeft.className = "col-lg-6 mb-lg-0 mb-4";

        const copyright = document.createElement("div");
        copyright.className = "copyright text-center text-sm text-muted text-lg-start";
        copyright.innerHTML = this.textmade;
        colLeft.appendChild(copyright);

        const colRight = document.createElement("div");
        colRight.className = "col-lg-6";

        const nav = document.createElement("ul");
        nav.className = "nav nav-footer justify-content-center justify-content-lg-end";

        const navItem = document.createElement("li");
        navItem.className = "nav-item";

        const navLink = document.createElement("a");
        navLink.href = "#";
        navLink.className = "nav-link text-muted";
        navLink.target = "_blank";
        navLink.textContent = "About Us";

        navItem.appendChild(navLink);
        nav.appendChild(navItem);
        colRight.appendChild(nav);

        row.appendChild(colLeft);
        row.appendChild(colRight);
        container.appendChild(row);
        
        return container;
    }

    divCustomize = (textContent) => {
        // Crear el contenedor principal de la tarjeta
        const card = document.createElement('div');
        card.className = 'card';
        card.style.width = '18rem';

        // Crear la imagen
        const img = document.createElement('img');
        img.src = ''; // Puedes poner aquí la URL de la imagen
        img.className = 'card-img-top';
        img.alt = '...';
        card.appendChild(img);

        // Crear el cuerpo de la tarjeta
        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        // Título
        const title = document.createElement('h5');
        title.className = 'card-title';
        title.textContent = textContent;
        cardBody.appendChild(title);

        // Texto
        const text = document.createElement('p');
        text.className = 'card-text';
        text.textContent = 'Some quick example text to build on the card title and make up the bulk of the card\'s content.';
        cardBody.appendChild(text);

        // Botón
        const button = document.createElement('a');
        button.href = '#';
        button.className = 'btn btn-primary';
        button.textContent = 'Elegir';
        cardBody.appendChild(button);

        // Añadir el cuerpo a la tarjeta
        card.appendChild(cardBody);

        return card;
    }

    MyProfile = (container) => {
        const fn = new Functions();
        const urlProject = this.url.GetUrlProject();
        const Session_User = JSON.parse(localStorage.getItem("PrototypeSessionUser"));
        const infoUser = Session_User;

        const image = document.createElement("img");
        // image.src = urlProject + `/Public/Img/Photos/${infoUser.UsrPhoto}`;
        image.src = urlProject + `/Public/Img/Photos/610d453bb7bdf.jpg`;
        image.alt = "user-photo";
        image.style.width = "80px";
        image.className = "rounded cursor-pointer";
        image.title = "Mi perfil";

        const div_photo = document.createElement("div");
        div_photo.className = "col-3";
        div_photo.appendChild(image);
        

        const user = document.createElement("div");
        user.textContent = infoUser.UserFirtsName+" "+infoUser.UserSurname;
        user.className = "fw-bold p-2 text-center";
        user.style.fontSize = "18px";
        const role = document.createElement("div");
        role.textContent = infoUser.UserTypeDecription;
        role.className = "text-center";
        role.style.fontSize = "13px";
        const mail = document.createElement("div");
        mail.textContent = infoUser.UseEmail;
        mail.className = "fw-bold text-center";
        mail.style.fontSize = "12px";
        mail.style.color = "steelblue";
        

        const div_data = document.createElement("div");
        div_data.className = "col-9";
        div_data.appendChild(user);
        div_data.appendChild(role);
        div_data.appendChild(mail);


        const div_row = document.createElement("div");
        div_row.className = "row";
        div_row.style.background = "#f2f2f2";

        div_row.appendChild(div_photo)
        div_row.appendChild(div_data)

        const div_container = document.createElement("div");
        div_container.className = "container";
        div_container.appendChild(div_row);




        const table = document.createElement("table");
        table.className = "table table-sm";

        const tbody = document.createElement("tbody");
        tbody.id = "profile_tbody";
        table.appendChild(tbody);

        tbody.appendChild(fn.CreateRowTwoColumns("Id usuario", infoUser.UseId));
        tbody.appendChild(fn.CreateRowTwoColumns("Celular", infoUser.UseDatCellphone));
        tbody.appendChild(fn.CreateRowTwoColumns("Ultimo acceso", infoUser.UseLastAccess));
        // tbody.appendChild(fn.CreateRowTwoColumns("Documento", infoUser.UsrIdentificationNumber));
        // tbody.appendChild(fn.CreateRowTwoColumns("Tipo de documento", infoUser.ItDescription));
        
        const div_container_table = document.createElement("div");
        div_container_table.className = "container py-2";
        div_container_table.appendChild(table);

        document.getElementById(container).appendChild(div_container);
        document.getElementById(container).appendChild(div_container_table);        
    }

    InfoApp = (data) => {
        const div_info = document.createElement("div");
        div_info.className = "alert alert-info";
        div_info.innerText = this.description;
        document.getElementById("content-config").appendChild(div_info);

        const div_solutions = document.createElement("div");
        div_solutions.className = "row";
        div_solutions.id = "div_solutions";
        document.getElementById("content-config").appendChild(div_solutions);

        data.response.data.map(element => {
            document.getElementById("div_solutions").appendChild(this.HomeOption(element));
        })

        document.getElementById("content-config").appendChild(this.FooterOption());
    }

    LangUser = () => {
        // creacion del titulo
        const title = document.createElement("h5");
        title.className = "alert alert-info";
        title.textContent = "Establezca el idioma de la aplicación";

        // creacion del boton
        const iconButton = document.createElement("em");
        iconButton.className = "fas fa-language";

        const buttonSend = document.createElement("div");
        buttonSend.id = "btn-submit";
        buttonSend.name = "btn-submit";
        buttonSend.className = "btn btn-primary btn-lg mt-2";
        buttonSend.appendChild(iconButton);
        buttonSend.append(" "+"Establecer idioma")

        const divButton = document.createElement("div");
        divButton.className = "col-12";
        divButton.appendChild(buttonSend);

        // Creacion del select 
        const container = document.createElement('div');
        container.className = 'col-12 mb-3 position-relative';

        const formFloating = document.createElement('div');
        formFloating.className = 'form-floating';
        formFloating.id = 'input_IdUserTypeUser';

        const select = document.createElement('select');
        select.className = 'form-select';
        select.id = 'selectionLang';
        select.name = 'selectionLang';
        select.title = 'Seleccione idioma';
        select.setAttribute('autocomplete', 'nope');
        select.setAttribute('data-toggle', 'tooltip');
        select.setAttribute('data-placement', 'top');

        const options = [
        { value: '', text: 'Elija una opción' },
        { value: 'Es', text: 'Español' },
        { value: 'En', text: 'English' },
        { value: 'Pr', text: 'Português' }
        ];

        options.forEach(opt => {
            const option = document.createElement('option');
            option.value = opt.value;
            option.textContent = opt.text;
            select.appendChild(option);
        });

        const label = document.createElement('label');
        label.setAttribute('for', 'IdUserTypeUser');
        label.textContent = 'Tipo usuario';

        formFloating.appendChild(select);
        formFloating.appendChild(label);
        container.appendChild(formFloating);

        // ensamblar todo
        document.getElementById("content-config").appendChild(title);
        document.getElementById("content-config").appendChild(container);
        document.getElementById("content-config").appendChild(divButton); 
        
        buttonSend.onclick = function(){
            alert("cambiando idioma")
        }
    }

    UpdatePwdForm = () => {
        // $("#title-config").html('Cambiar mi contraseña');
                        // let form = new Form()
                        // let button = new HtmlButton()
                        // form.CreateFields(data.response.data.Fields);
                        // var buttons = button.CreateButton(data.response.data.Buttons.Submit)
                        // buttons += button.CreateReset({
                        //     "text": "Limpiar formulario",
                        //     "icon": "fas fa-eraser"
                        // })
                        // buttons += button.CreateLink(data.response.data.Buttons.Cancel)
                        // $("#content-config").append(formulary+buttons);
    }

    Customize = () => {
        document.getElementById("content-config").appendChild(this.divCustomize('fondo 1'));
        document.getElementById("content-config").appendChild(this.divCustomize('fondo 2'));
    }

    Enlace = (item, container) => {
        const icons = Files.ConvertJsonToObject('../../Config/Icons.json');
        const icon = icons[item.icon];
        const titleLink = item.text;

        const boxIcon = document.createElement("div");
        boxIcon.className = "container py-2 border-bottom";

        const element = document.createElement("em");
        element.className = `${icon} text-muted`;
        element.textContent = " "+titleLink;
        element.style.fontSize = "14px";
        element.title = titleLink;
        element.setAttribute("data-bs-toggle", "offcanvas");
        element.setAttribute("data-toggle", "tooltip");
        element.setAttribute("data-placement", "right");
        element.setAttribute("aria-controls", "offcanvasUserOptions");
        element.setAttribute("href", "#offcanvasUserOptions");
        element.setAttribute("role", "button");

        element.addEventListener("click", function() {
            const uo = new UserOptions();
            const url = urls.url.apiCore + item.link;
            uo.LoadData(url);
        });

        boxIcon.appendChild(element);

        document.getElementById(container).appendChild(boxIcon);
    }

    Acceso = (data, container) => {
        const settings = this.settings;
        const icons = Files.ConvertJsonToObject('../../Config/Icons.json');
        const icon = icons[data.icon];
        const urls = this.url;
        const fn = new Functions();

        const element = document.createElement("em");
        element.className = `${icon} text-muted`;
        element.textContent = ' '+data.text;
        element.id = "btnChangePhoto";

        const boxIcon = document.createElement("div");
        boxIcon.className = "container py-2 border-bottom";
        boxIcon.style.cursor = "pointer";
        boxIcon.appendChild(element);
        
        document.getElementById(container).appendChild(boxIcon);

        element.onclick = function(){
            const request = {
                title: data.description,
                confirmButton: "Submit",
                url: urls.url.apiCore + data.link,
                settings: settings
            };
            const fun = fn[data.functionName]
            if(typeof fun == 'function'){
                fun(request);
            }
        }
    }
}