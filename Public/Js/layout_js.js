const sidebar = document.getElementById('sidebar');
const breadcrumb = document.getElementById('breadcrumb');

/* Toggle sidebar (desktop + mobile) */
document.getElementById('toggleSidebar').onclick = () => {
    if (window.innerWidth <= 768) {
        sidebar.classList.toggle('open');
    } else {
        sidebar.classList.toggle('collapsed');
    }
};

/* Submenús + breadcrumb */
document.querySelectorAll('.menu > li > a').forEach(a=>{
    console.log(a);
    a.onclick=()=>{
        if(!sidebar.classList.contains('collapsed')){
            a.parentElement.classList.toggle('open');
        }
        updateBreadcrumb([a.dataset.title]);
    };
});

document.querySelectorAll('.submenu a').forEach(s=>{
    s.onclick=e=>{
        e.stopPropagation();
        updateBreadcrumb([
            s.closest('li').querySelector('a').dataset.title,
            s.dataset.title
        ]);
    };
});

function updateBreadcrumb(items){
    breadcrumb.innerHTML='<li class="breadcrumb-item">Inicio</li>';
    items.forEach(i=>{
        breadcrumb.innerHTML+=`<li class="breadcrumb-item active">${i}</li>`;
    });
}

/* Tema */
document.getElementById('toggleTheme').onchange=e=>{
    document.body.classList.toggle('dark',e.target.checked);
};