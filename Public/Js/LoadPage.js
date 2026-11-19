import { Load } from '../../Public/Js/Load.js';
import { ActionsPage } from '../../Public/Js/ActionsPage.js';
import { Url } from '../../Public/Js/Url.js';
import {UserOptions} from '../../Public/Js/UserOptions.js';


$(document).ready(async function(){
    const load = new Load();
    const url = new Url();
    console.log(url)
    const uo = new UserOptions();

    // Context
    if (!localStorage.getItem("PrototpeContext")) {
        const urlApiCore = url.GetUrlApiCore();
        await load.GetContext(urlApiCore+'/Context/All/');
    }

    const context = JSON.parse(localStorage.getItem("PrototpeContext"));
    const Session_User = JSON.parse(localStorage.getItem("PrototypeSessionUser"));

    // load.Menu(context);

    // uo.optionsMenu(context);

    load.Profile(context);

    load.info($("#loadInfo").val());

    // load table
    if(!window.location.href.includes("Home/Home")){
        const action = new ActionsPage();
        action.CreateTable($("#urlTable").val());
    }else{
        
    }

    // tooltips
    $('[data-toggle="tooltip"]').tooltip();









    // const tohome = document.getElementById('link_home');
    // tohome.href = "http://localhost/Prototipo/Home/Home/";
    // tohome.setAttribute("data-toggle", "tooltip");
    // tohome.setAttribute("data-placement", "right");
    // tohome.title = "Ir al inicio";

    // const conf = document.getElementById('btn_configuration');
    // conf.setAttribute("data-toggle", "tooltip");
    // conf.setAttribute("data-placement", "right");
    // conf.title = "Configuración";

    // menu show/hide
    // const projectName = document.getElementById('project_name');
    // projectName.textContent = " PROTOTIPO";

    // const environment = document.getElementById('environment_text');
    // environment.textContent = 'DEV';

    // const user_session = document.getElementById('user_session');
    // user_session.textContent = Session_User.UserFirtsName.substring(0,1)+Session_User.UserSurname.substring(0,1);
    // user_session.title = Session_User.UserFirtsName+' '+Session_User.UserSurname;
    // user_session.setAttribute("data-toggle", "tooltip");
    // user_session.setAttribute("data-placement", "right");

    // const botonToggle = document.getElementById('sh_menu');
    // botonToggle.title = "Cerrar menú";
    // botonToggle.setAttribute("data-toggle", "tooltip");
    // botonToggle.setAttribute("data-placement", "right");

    // const container_menu = document.getElementById('container_menu');
    // const container_main = document.getElementById('container_main');

    /*botonToggle.addEventListener('click', function () {
        container_menu.classList.toggle('hide-menu');
        container_main.classList.toggle('hide-menu-content-main');
        const icon = botonToggle.children
        if(container_menu.classList.contains('hide-menu')){
            icon[0].classList.remove("fa-minus");
            icon[0].classList.add("fa-bars");
            
            
            const elements = document.getElementsByClassName("text_menu");
            for (let i = 0; i < elements.length; i++) {
                elements[i].classList.add("d-none");
            }

            const subs = document.getElementsByClassName("container_submenu");
            for (let i = 0; i < subs.length; i++) {
                subs[i].classList.remove("show");
            }

            environment_text.textContent = '';


            // botonToggle.setAttribute("data-toggle", "tooltip");
            // botonToggle.setAttribute("data-placement", "right");

             //aria-controls="offcanvasMenu" 
             // data-toggle="tooltip" 
             // data-placement="right" 
             // aria-label="Mostrar/Ocultar menu" 
             // data-bs-original-title="Mostrar/Ocultar menu"
            
            botonToggle.title = "Abrir menú";
        }else{
            icon[0].classList.add("fa-minus");
            icon[0].classList.remove("fa-bars");
            botonToggle.title = "Cerrar menú";

            const elements = document.getElementsByClassName("text_menu");
            for (let i = 0; i < elements.length; i++) {
                elements[i].classList.remove("d-none");
            }
            environment_text.textContent = 'ENTORNO DE PRUEBAS';
        }
    });*/

    $("#content-preload").attr("class", "d-none");
});


const sidebar = document.getElementById("sidebar");
const toggleSidebar = document.getElementById("toggleSidebar");

toggleSidebar.addEventListener("click", () => {

    if (window.innerWidth <= 768) {

        sidebar.classList.toggle("mobile-open");
        return;
    }

    sidebar.classList.toggle("collapsed");

    // cerrar todos los submenus al colapsar

    if (sidebar.classList.contains("collapsed")) {

        document
            .querySelectorAll(".menu-item")
            .forEach(item => item.classList.remove("active"));
    }

});

document.querySelectorAll(".menu-link").forEach(link => {

    link.addEventListener("click", function () {

        // IMPORTANTE:
        // En modo colapsado NO expandir

        if (sidebar.classList.contains("collapsed")) {
            return;
        }

        const parent = this.parentElement;

        document
            .querySelectorAll(".menu-item")
            .forEach(item => {

                if (item !== parent) {
                    item.classList.remove("active");
                }

            });

        parent.classList.toggle("active");
    });

});

/* USER MENU */

const userBtn = document.getElementById("userBtn");
const userDropdown = document.getElementById("userDropdown");

userBtn.addEventListener("click", (e) => {

    e.stopPropagation();

    userDropdown.classList.toggle("show");

});

document.addEventListener("click", () => {

    userDropdown.classList.remove("show");

});

/* RIGHT PANEL */

const rightPanel = document.getElementById("rightPanel");
const rightPanelBtn = document.getElementById("rightPanelBtn");
const closePanelButton = document.getElementById("closePanel");
const overlay = document.getElementById("overlay");

function closePanel() {

    rightPanel.classList.remove("show");
    overlay.classList.remove("show");

}

rightPanelBtn.addEventListener("click", () => {

    rightPanel.classList.add("show");
    overlay.classList.add("show");

});

closePanelButton.addEventListener("click", closePanel);

overlay.addEventListener("click", closePanel);

/* RESPONSIVE */

window.addEventListener("resize", () => {

    if (window.innerWidth > 768) {
        sidebar.classList.remove("mobile-open");
    }

});
