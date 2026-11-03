
class MyComponent extends HTMLElement {
    
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
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
                <h2>Hola, soy un componente!</h2>
                <p>Este es un ejemplo de componente en JavaScript.</p>
            </div>
        `;
    }
}

customElements.define('my-component', MyComponent);
