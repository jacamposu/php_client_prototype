import { Url } from '../../Public/Js/Url.js';


export class Menu {

    constructor(obj) {
        this.firtsLevelMenu = obj.linksMenu.ml1;
        this.secondLevelMenu = obj.linksMenu.ml2;
        this.thirdLevelMenu = obj.linksMenu.ml3;
        const url = new Url()
        this.urlProject = url.GetUrlProject()
    }

    LoadMenu(content_id) {
        this.firtsLevelMenu.forEach(menu => {
            const div_item = document.createElement("div");
            div_item.className = "menu-item";

            const div_link = document.createElement("div");
            div_link.className = "menu-link";

            const div_content = document.createElement("div");
            div_content.className = "menu-content";

            const icon = document.createElement("i");
            icon.className = menu.MenIcon;

            const span = document.createElement("span");
            span.textContent = menu.MenName;
            
            const icon_down = document.createElement("i");
            icon_down.className = "fas fa-chevron-down arrow";

            div_item.appendChild(div_link);
            div_link.appendChild(div_content);
            div_content.appendChild(icon);
            div_content.appendChild(span);
            div_link.appendChild(icon_down);

            const div_submenu = document.createElement("div");
            div_submenu.className = "submenu";
            div_submenu.id = 's_' + menu.MenId;

            const div_floating_submenu = document.createElement("div");
            div_floating_submenu.className = "floating-submenu";

            const div_floating_title = document.createElement("div");
            div_floating_title.className = "floating-title";
            div_floating_title.textContent = menu.MenName;

            div_item.appendChild(div_submenu);
            div_item.appendChild(div_floating_submenu);

            div_floating_submenu.appendChild(div_floating_title);
            div_floating_submenu.id = 'f_' + menu.MenId;

console.log(div_item)
            // document.getElementById(content_id).appendChild(div_item);

            // li.onclick = function (e){
            //     li.classList.toggle('open');
            // }


            this.LoadSubmenu(menu.MenParentMenu);
        })
    }

    LoadSubmenu(firtsLevelParentId) {
        this.secondLevelMenu.filter(menu => menu.MenParentMenu === firtsLevelParentId).forEach(menu => {
            if (menu.MenMenuType == 'P') 
                console.log("ParentSubmenu", menu.MenName);
                // this.ParentSubmenu(menu, firtsLevelParentId);
            else{
                this.SubmenuSecondLevel(menu, firtsLevelParentId);
                this.SubmenuSecondLevel2(menu, firtsLevelParentId);
            }
                
        });
    }

    ParentSubmenu(menu, firtsLevelParentId){
    
        const li = document.createElement("li");
        const link = document.createElement("a");
        const icon = document.createElement("em");
        const iconD = document.createElement("em");
        const text = document.createElement("span");
        const ul = document.createElement("ul");

        const list = document.createElement("ul");
        // const button = document.createElement("button");

        link.setAttribute('data-title', menu.MenName);
        icon.className = menu.MenIcon;
        text.textContent = menu.MenName;
        iconD.className = "fas fa-chevron-down chevron";

        

        link.appendChild(icon);
        link.appendChild(text);
        link.appendChild(iconD);

        ul.className = "menu";
        ul.id = "sub_ul_"+menu.MenId;//"ul_"+menu.MenParentMenu;

        li.appendChild(link);
        li.appendChild(ul);


        
        // document.getElementById(content_id).appendChild(li);

        li.onclick = function (e){
            console.log(e)
            li.classList.toggle('open');
        }

        // div_ul.className = "collapse container_submenu";
        // div_ul.id = 'submenu_'+menu.MenId;

        list.className = "btn-toggle-nav list-unstyled fw-normal pb-1 small px-4 border-bottom";
        list.id = "sub_ul_"+menu.MenId;

        // button.className = "btn btn-toggle align-items-center rounded collapsed";
        // button.setAttribute('data-bs-toggle', 'collapse');
        // button.setAttribute('data-bs-target', '#submenu_'+menu.MenId);
        // button.setAttribute('aria-expanded', 'true');
        // button.setAttribute('aria-controls', 'submenu_'+menu.MenId);
        // button.appendChild(icon);
        // button.appendChild(link);


        // ul.appendChild();
        // li.appendChild(button);
        // li.appendChild(div_ul);

        document.getElementById("ul_"+firtsLevelParentId).appendChild(li);

        this.SubmenuThirdLevel(menu.MenId, firtsLevelParentId);
    }

    SubmenuSecondLevel(menu, param1) {
        const url = this.urlProject+"/"+menu.MenUrl;
        const location = window.location.href;

        // const li = document.createElement("li");
        const link = document.createElement("a");
        link.href = url;
        // link.className = "text-primary";
        // link.style.textDecoration = "none";
        // link.setAttribute('data-title', menu.MenName);
        link.textContent = menu.MenName;

        if(location.toString().trim().toLowerCase() == url.toString().trim().toLowerCase()){
            link.classList.add("link-menu-active");
            // const parent = document.getElementById("menu_"+param1);
            // parent.classList.add("show");
        }
        
        document.getElementById('s_'+param1).appendChild(link);
        // document.getElementById('f_'+param1).appendChild(link);
    }

    SubmenuSecondLevel2(menu, param1) {
        const url = this.urlProject+"/"+menu.MenUrl;
        const location = window.location.href;

        // const li = document.createElement("li");
        const link = document.createElement("a");
        link.href = url;
        // link.className = "text-primary";
        link.style.textDecoration = "none";
        link.setAttribute('data-title', menu.MenName);
        link.textContent = menu.MenName;

        // if(location.toString().trim().toLowerCase() == url.toString().trim().toLowerCase()){
        //     link.classList.add("link-menu-active");
        //     const parent = document.getElementById("menu_"+param1);
        //     // parent.classList.add("show");
        // }
        
        document.getElementById('f_'+param1).appendChild(link);
    }

    SubmenuThirdLevel(secondLevelParentId, firtsLevelParentId) {
        this.thirdLevelMenu.filter(menu => menu.MenParentMenu == secondLevelParentId).forEach(menu => {
            const url = this.urlProject+"/"+menu.MenUrl;
            const location = window.location.href;
            
            const li = document.createElement("li");
            li.className = "mb-1";

            const link = document.createElement("a");
            link.href = this.urlProject+"/"+menu.MenUrl;
            link.style.textDecoration = "none";
            link.className = "text-primary";

            if(location.toString().trim().toLowerCase() == url.toString().trim().toLowerCase()){
                link.classList.add("link-menu-active");
                const parent = document.getElementById("submenu_"+secondLevelParentId);
                parent.classList.add("show");
                const primerPadre = document.getElementById("menu_"+firtsLevelParentId);
                primerPadre.classList.add("show");
            }

            const icon = document.createElement("em");
            icon.className = menu.MenIcon;
        
            const text = document.createElement("span");
            text.className = "text_menu";
            text.textContent = menu.MenName;

            link.appendChild(icon);
            link.appendChild(text);                
            li.appendChild(link);

            document.getElementById("sub_ul_"+secondLevelParentId).appendChild(li);
        })
    }
}