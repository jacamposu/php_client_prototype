class MyComponent4 extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['data'];
  }

  get data() {
    return JSON.parse(this.getAttribute('data'));
  }

  set data(value) {
    this.setAttribute('data', JSON.stringify(value));
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.render();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const data = this.data || {};
    this.shadowRoot.innerHTML = `
      <style>
        .my-component {
          font-family: Arial, sans-serif;
          padding: 10px;
          background-color: #f0f0f0;
          border: 1px solid #ccc;
        }
      </style>
      <div class="my-component">
        <h2>${data.title || 'Título por defecto'}</h2>
        <p>${data.content || 'Contenido por defecto'}</p>
      </div>
    `;
  }
}

customElements.define('my-component4', MyComponent4);
