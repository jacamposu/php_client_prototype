class MyComponent3 extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.addEventListeners();
  }

  addEventListeners() {
    const button = this.shadowRoot.querySelector('button');
    button.addEventListener('click', this.handleClick.bind(this));
  }

  handleClick() {
    confirm('¡Has presionado el botón!');
  }

  render() {
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
        <h2>Hola, soy un componente con eventos!</h2>
        <button>Haz clic aquí</button>
      </div>
    `;
  }
}

customElements.define('my-component3', MyComponent3);
