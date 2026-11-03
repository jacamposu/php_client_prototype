class MyComponent2 extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['title', 'content'];
  }

  get title() {
    return this.getAttribute('title');
  }

  set title(value) {
    this.setAttribute('title', value);
  }

  get content() {
    return this.getAttribute('content');
  }

  set content(value) {
    this.setAttribute('content', value);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.render();
  }

  connectedCallback() {
    this.render();
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
        <h2>${this.title}</h2>
        <p>${this.content}</p>
      </div>
    `;
  }
}

customElements.define('my-component2', MyComponent2);
