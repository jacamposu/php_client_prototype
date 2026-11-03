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

document.querySelectorAll(".menu-link")
.forEach(link => {

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


