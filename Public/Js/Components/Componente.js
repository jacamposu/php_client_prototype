class ConfigContent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' }); // Shadow DOM para encapsulamiento
  }

  connectedCallback() {
    const description = this.getAttribute('description') || '';
    const data = JSON.parse(this.getAttribute('data') || '[]');

    const container = document.createElement('div');
    container.id = 'content-config';

    // Info alert
    const divInfo = document.createElement('div');
    divInfo.className = 'alert alert-info';
    divInfo.innerText = description;
    container.appendChild(divInfo);

    // Solutions container
    const divSolutions = document.createElement('div');
    divSolutions.className = 'row';
    divSolutions.id = 'div_solutions';
    container.appendChild(divSolutions);

    // Render each solution
    data.forEach(element => {
      const option = this.HomeOption(element);
      if (option) divSolutions.appendChild(option);
    });

    // Footer
    const footer = this.FooterOption();
    if (footer) container.appendChild(footer);

    this.shadowRoot.appendChild(container);
  }

  // Métodos para generar contenido dinámico
  HomeOption(element) {
    const div = document.createElement('div');
    div.className = 'col';
    div.innerText = element.name || 'Opción';
    return div;
  }

  FooterOption() {
    const footer = document.createElement('div');
    footer.className = 'footer';
    footer.innerText = 'Pie de página';
    return footer;
  }
}

customElements.define('config-content', ConfigContent);
