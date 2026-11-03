export class Pagination{
    pagination(pagination) {
        let content = '';
        if (pagination != "null") {
            pagination.forEach(element => {
                content += this.htmlPagination(element);
            });
        }
        return content;
    }

    htmlPagination(element) {
        var text = element.value == null ? '' : element.value;
        return `
            <li class="page-item ${element.class}" data-toggle="tooltip" data-placement="top" title="${element.title}" onclick="action.Pagination('${element.href}');">
                <span class="page-link">
                    <em class="${element.icon}"></em>
                    ${text}
                </span>
            </li>
        `;
    }
}