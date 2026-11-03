export class HTML2{
	span(span_id, span_content, span_class){
		return `<span id="${span_id}" class="${span_class}">${span_content}</span>`
	}
	div(div_class, div_content){
		return `<div class="${div_class}">${div_content}</div>`
	}
	li(){
		return `<li></li>`
	}
	strong(){
		return `<strong></strong>`
	}
	em(em_class){
		return `<em class="${em_class}"></em>`
	}
	em_full(em_class, em_id, em_title, event, data){
		return `<em class="${em_class}" id="${em_id}" ${event} title="${em_title}" ${data}></em>`
	}
	ul(ul_content){
		return `<ul>${ul_content}</ul>`
	}
	a(a_href, a_class, a_title, a_text){
		return `<a href="${a_href}" class="${a_class}" title="${a_title}">${a_text}</a>`
	}
	p(p_text){
		return `<p>${p_text}</p>`
	}
	label(label_class, label_id, label_content){
		return `<label class="${label_class}" id="${label_id}">${label_content}</label>`
	}
	img(img_src){
		return `<img src="${img_src}" />`
	}
	table(table_id, table_class, table_content){
		return `<table id="${table_id}" class="${table_class}">${table_content}</table>`
	}
	thead(thead_content){
		return `<thead>${thead_content}</thead>`
	}
	tbody(tbody_content, table_id){
		return `<tbody id="${table_id}_tbody">${tbody_content}</tbody>`
	}
	tr(tr_content, event){
		return `<tr ${event}>${tr_content}</tr>`
	}
	th(th_class, th_id, th_content){
		return `<th class="${th_class}" id="${th_id}"><small><small>${th_content}</small></small></th>`
	}
	td(td_class, td_align, td_content){
		return `<td class="${td_class}" align="${td_align}">${td_content}</td>`
	}
}