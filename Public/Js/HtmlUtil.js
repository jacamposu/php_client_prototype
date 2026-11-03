import { Util } from '../../Public/Js/Util.js';


export class HtmlUtil {
    
    constructor() {
        this.util = new Util();
    }

    PrintIcon(font, size = null, color = null) {
        size = this.util.IsNullOrEmpty(size) ? 'fa-1x' : size;
        color = this.util.IsNullOrEmpty(color) ? 'text-dark' : color;
        return `<em class="${font} ${size} ${color}"></em>`;
    }

    TextRequiredFields() {
        let icon = this.PrintIcon('CircleExclamation', null, 'text-danger', '**********text*********'); //$langResource['Info']['Required']
        return `${icon} <em class="text-primary">**********text*********</em>` //$langResource['Info']['Required']
    }

    ErrorInput(id) {
        return ``
    }

    countChars(idName, strlen, numChars, text = 'chars') {
        return `
			<small class="text-muted">
				[<span id="CountCharsTXA_${idName}">${strlen}/${numChars}</span> ${text}]
			</small>
		`;
    }

    LinkMenu(url, txtIcon, desc, bginfo) {
        let icon = this.PrintIcon(txtIcon, 'nav-icon', '')
        return `<a href="${url}" class="nav-link ${bginfo}">${icon}<p> ${desc}</p></a>`
    }

    LinkMenuParent(type, number, vMenu) {
        let icon = this.PrintIcon(vMenu['MenIcon'], 'nav-icon', '')
        return `
			<a href="#${type}${number}" class="nav-link" data-target="#${type}${number}" id="${vMenu['MenId']}" onclick="openMenuLS(this.id);">
				${icon}
				<p>**********text********* <em class="right fas fa-angle-left"></em></p>
		    </a>` //$langMenu[$vMenu['MenId']]
    }
}