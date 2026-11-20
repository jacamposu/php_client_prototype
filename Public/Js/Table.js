import { Files } from './Files.js';
import { ActionsPage } from './ActionsPage.js';


export class Table {
    constructor(config) {
        this.config = config;
    }

    createTable(data,container,table_id){
        document.getElementById(container).innerHTML = "";
        this.tableStructure(table_id,container);
        this.Caption(data,table_id);
        this.TH(data.thead,data.metadata,table_id);
        this.TR(data.tbody,data.metadata,table_id);
    }

    Caption(data,table_id){
        const caption = document.createElement("caption");
        caption.innerHTML = data.caption;
        document.getElementById(table_id).appendChild(caption);
    }

    tableStructure(table_id,container){
        const table = document.createElement("table");
        table.id = table_id;
        table.className = 'table table-sm table-striped table-bordered bg-white';
        
        const thead = document.createElement("thead");
        thead.id = table_id+"_thead";

        const tr_thead = document.createElement("tr");
        tr_thead.id = "tr_"+table_id;
        thead.appendChild(tr_thead);

        const tbody = document.createElement("tbody")
        tbody.id = table_id+"_tbody";

        table.appendChild(thead);
        table.appendChild(tbody);
        document.getElementById(container).appendChild(table);
	}

    TH(data,metadata,table_id){
        let countTH = 1;
        data.forEach(element => {
            let metadataField = metadata[element.fieldName];
            let description = element.description;
            let btnActionColumn = "";

            if(typeof metadataField === 'object' && metadataField !== null)
                description = metadataField.desc;

            if(element.showSortColumnButton)
                btnActionColumn = this.HTMLActionsTableColumn(element,metadataField,countTH);

            const th = document.createElement("th");
            th.scope = "col";
            th.id = "col_"+element.fieldName;
            
            const div_content = document.createElement("div");
            div_content.className = "d-flex justify-content-between";

            const div_desc = document.createElement("div");
            div_desc.className = "text-center text-xss py-2 w-100";
            div_desc.innerHTML = description;

            const div_action = document.createElement("div");
            div_action.className = "d-inline";
            div_action.innerHTML = btnActionColumn;

            div_content.appendChild(div_desc);
            div_content.appendChild(div_action);
            th.appendChild(div_content);
            document.getElementById("tr_"+table_id).appendChild(th);

            countTH++;
        })
    }

    TR(data,metadata,table_id){
        let count = 0;

        data.forEach(element => {
            const row_id = table_id+"_tbody_tr_"+count;
            const tr_tbody = this.AddRow(row_id);
            document.getElementById(table_id+"_tbody").appendChild(tr_tbody);
            
            let btnAction = this.btnaction(row_id,count,"Acción");

            element.actionColumn.forEach(info => {
                this.htmlOption(info,btnAction); 
            });

            element.row.forEach(cell => {
                const inputType = metadata[cell.fieldDictionary].inputType;
                const td = this.AddCell(cell,metadata);
                let content = this.TD(cell,inputType);
                td.appendChild(content);
                document.getElementById(row_id).appendChild(td);
            });

            count++;
        });
    }

    TD(cell,inputType) {    
        if (!cell) return null;   
        switch (inputType) {
            case 'Badge':
                return this.Label('text-white','',cell.text);
                
            case 'Checkbox':
                return this.Checkbox();

            case 'Font':
                return this.Font(cell);

            case 'FontFile':
                const emClass = cell.class == '' ? this.icons.Question : cell.class
                return this.FontFile(cell,emClass);

            case 'Image':
                return this.Image(cell)

            case 'Link':
                return this.Link(cell);

            case 'Password':
                return this.Password();

            default:
                if (cell.length > 100) {
                    return this.DefaultShort(cell);
                }
                return this.DefaultText('text-xs font-weight-bold mb-0','td-description',cell.text);
        }
    }

    AddCell(cell,metadata){
        const td = document.createElement("td");
        td.classname = 'appCellTable '+cell.class;
        td.style.alignContent = metadata[cell.fieldDictionary].align;
        return td;
    }

    AddRow(id){
        const tr = document.createElement("tr");
        tr.id = id;
        return tr;
    }

    btnaction(row_id,counter,buttonName){
        const td = document.createElement("td");

        const div = document.createElement("div");
        div.className = "btn-group";

        const button = document.createElement("button");
        button.className = "btn btn-outline-primary btn-sm dropdown-toggle";
        button.type = "button";
        button.setAttribute("data-bs-toggle", "dropdown");
        button.setAttribute("aria-expanded", "false");
        button.textContent = buttonName;

        const ul = document.createElement("ul");
        ul.className = "dropdown-menu";
        ul.id = row_id+"_cellAction_"+counter;

        div.appendChild(button);
        div.appendChild(ul);
        td.appendChild(div);

        document.getElementById(row_id).appendChild(td);
        return ul.id;
    }

    htmlOption(element,container) {
        const optionHandlers = {
            modal: 'modal',
            slider: 'slider',
            confirm: 'confirm'
        };
        this.UlActionList(element,optionHandlers[element.type],container);
    }

    UlActionList(element,type,container){
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.className = element.class;
        a.title = element.title;
        
        if(type == 'modal' || type == 'slider'){
            const toggle = {
                modal: 'modal',
                slider: 'offcanvas'
            };
            const target = {
                modal: '#staticBackdrop',
                slider: '#offcanvasRight'
            };
            a.setAttribute('data-bs-toggle', toggle[type]);
            a.setAttribute('data-bs-target', target[type]);
            if(type == 'slider')
                a.setAttribute('aria-controls', 'offcanvasRight');
        }
        if(type != 'default'){
            a.setAttribute('data-function', element.onclick.functionName);
            a.setAttribute('data-keyfield', element.onclick.params.keyfield);
            a.setAttribute('data-record', element.onclick.params.record);
            a.setAttribute('data-action', element.onclick.params.action);
        }

        const em = document.createElement('em');
        em.className = element.icon;

        const span = document.createElement('span');
        span.className = element.color;
        span.textContent = element.name;

        a.appendChild(em);
        a.appendChild(span);
        li.appendChild(a);

        document.getElementById(container).appendChild(li);

        // EVENTOS
        const actionPage = new ActionsPage(this.config);
        // const functionName = ;
        a.onclick = function(){
            try {
                if (typeof actionPage[element.onclick.functionName] === 'function') {
                    actionPage[element.onclick.functionName](element.onclick.params);
                } else {
                    throw new Error(`Method [${element.onclick.functionName}] not found.`);
                }
            } catch (error) {
                console.error('Error al ejecutar el método dinámico:', error);
            }
        }
    }

    Checkbox(){
        const check = document.createElement("em")
        check.classname = this.icons.Checkbox+" fa-2x text-success";
        return check;
    }

    Font(cell){
        const check = document.createElement("em")
        check.classname = cell.text+" fa-1x text-dark";

        const label = document.createElement("label");
        label.appendChild(check);
        label.append(" "+cell.text);
        return label;
    }

    FontFile(cell,emClass){
        const check = document.createElement("em")
        check.classname = emClass;
        check.style.color = cell.color

        const label = document.createElement("label");
        label.appendChild(check);
        label.append(" "+cell.text);
        return label;
    }

    Image(cell){
        const img = document.createElement("img");
        img.src = cell.text;
        img.width = "80px";
        img.height = "80px";
        return img;
    }

    Link(cell){
        // <a href="${}" id="${}" name="${}" target="${}" ${cell.eventJS} />${}</a>
        const href = document.createElement("img");
        href.href = cell.url;
        href.id = cell.field;
        href.tagName = cell.keyField;
        href.target = cell.target
        href.innerHTML = cell.text;
    }

    Password(){
        const html = new HTML()
        const label = document.createElement("label");
        label.className = "text-secondary";

        label.appendChild(html.em(this.icons.Ellipsis+" fa-2x"));
        label.appendChild(html.em(this.icons.Ellipsis+" fa-2x"));
        label.appendChild(html.em(this.icons.Ellipsis+" fa-2x"));

        return label
    }

    DefaultShort(cell){
        const html = new HTML()
        const icon = html.em(this.icons.Ellipsis)
        let label = html.label('', '', cell.text)
        let a_href = html.a(cell.url, 'font-weight-bold', cell.title, icon)
        return label+' '+a_href
    }

    DefaultText(label_class,label_id,label_content){
        const label = document.createElement("label");
        label.className = label_class;
        label.id = label_id;
        label.innerHTML = label_content;
        return label
    }

    CreateVerticalTable(data,table_id,container){
        this.tableStructure(table_id,container);

        let count = 0;
        data.forEach(element => {
            const row_id = table_id+"_tbody_tr_"+count;
            const tr_tbody = this.AddRow(row_id);
            document.getElementById(table_id+"_tbody").appendChild(tr_tbody);
            
            const tdIcon = document.createElement("td");
            tdIcon.innerHTML = this.TableIcon(icons[element.metadata.icon]);
            document.getElementById(row_id).appendChild(tdIcon);

            const tdField = document.createElement("td");
            tdField.innerHTML = element.metadata.desc;
            document.getElementById(row_id).appendChild(tdField);
            
            const tdValue = document.createElement("td");
            tdValue.innerHTML = this.RenderContentCell(element.metadata.inputType, element);
            document.getElementById(row_id).appendChild(tdValue);
       
            count++;
        });
    }

    TableIcon(icon){
        const em = document.createElement("em");
        em.className = icon + " text-muted";
        return em.outerHTML;
    }

    RenderContentCell(datatype,value){
        const renderers = {
            Image: (value) => `<img src="${value.value}" class="img-fluid img-thumbnail rounded" />`,
            Password: () => `<span class="text-muted">${this.icons.Ellipsis}</span>`,
            Longtext: (value) => `<div class="bg-light p-2 border"><em>${value.value}</em></div>`,
            default: (value) => value.value
        };

        return (renderers[datatype] || renderers.default)(value);
    }
    
    HTMLActionsTableColumn(element,metadataField,count){
        let iconAsc = metadataField.inputTypeForm == "Number" ? "fas fa-sort-numeric-down" : "fas fa-sort-alpha-down"
        let iconDesc = metadataField.inputTypeForm == "Number" ? "fas fa-sort-numeric-down-alt" : "fas fa-sort-alpha-down-alt"
        let asc = 'Ascendente'
        let desc = 'Descendente'
        let filter = 'Filtrar'
        return `
                    <div class="btn-group">
                        <button class="btn btn-light btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false"></button>
                        <ul class="dropdown-menu">
                            <h6 class="dropdown-header">Ordenar la vista</h6>
                            <li>
                                <a class="dropdown-item" onclick="sortTable(${count}, 'asc')">
                                    <em class="${iconAsc}"></em>
                                    <span class="text-info">${asc}</span>
                                </a>
                            </li>
                            <li>
                                <a class="dropdown-item" onclick="sortTable(${count}, 'desc')">
                                    <em class="${iconDesc}"></em>
                                    <span class="text-info">${desc}</span>
                                </a>
                            </li>

                            <h6 class="dropdown-header">Ordenar la consulta</h6>
                            <li>
                                <a class="dropdown-item">
                                    <em class="${iconAsc}"></em>
                                    <span class="text-info">${asc}</span>
                                </a>
                            </li>
                            <li>
                                <a class="dropdown-item">
                                    <em class="${iconDesc}"></em>
                                    <span class="text-info">${desc}</span>
                                </a>
                            </li>
                            <h6 class="dropdown-header"></h6>
                            <li>
                                <a class="dropdown-item">
                                    <input type="text" id="filter_table_${count}" class="form-control" placeholder="${filter}" onkeyup="filterTable(${count})">
                                </a>
                            </li>
                        </ul>
                    </div>
                `
    }

    htmlSortColumn(object, type) {
        let html = new HTML()
        let tag = html.em_full('fas fa-sort-down', 'sortView_'+object.key, 'Ordenar Vista', 'onclick="sortTable(\'col_${object.key}\')"', 'data-toggle="tooltip" data-placement="bottom"')
        if (type == "a") {
            let em = html.em_full('fas fa-sort-alpha-down', 'sortTable_'+object.key, 'Ordenar Tabla', 'onclick="action.SortTable(\'${object.column}\')"', 'data-toggle="tooltip" data-placement="bottom"')
            tag = html.span('', em, 'appClrIconSort') 
        }
        return html.div('px-1 border-left', tag)
    }   
}