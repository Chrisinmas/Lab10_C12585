// components/RecipeCard.js
// Web Component: <recipe-card>
// Lab 10: Shadow DOM + Slots + Variables CSS + CSS Parts

class RecipeCard extends HTMLElement {

  static get observedAttributes() {
    return ["tag", "time", "portions", "rating", "emoji", "gradient", "featured"];
  }

  constructor() {
    super();
    // SHADOW DOM: el CSS queda encapsulado, no afecta ni es afectado por el exterior
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== null) this.render();
  }

  get cardTag()      { return this.getAttribute("tag")      ?? "General"; }
  get cardTime()     { return this.getAttribute("time")     ?? "?"; }
  get cardPortions() { return this.getAttribute("portions") ?? "?"; }
  get cardRating()   { return this.getAttribute("rating")   ?? "?"; }
  get cardEmoji()    { return this.getAttribute("emoji")    ?? "🍽️"; }
  get cardGradient() { return this.getAttribute("gradient") ?? "linear-gradient(135deg, #ccc, #999)"; }
  get isFeatured()   { return this.hasAttribute("featured"); }

  render() {
    // Renderizamos en shadowRoot (no en this)
    this.shadowRoot.setHTMLUnsafe(/* html */`
      <style>
        /*
          :host → representa al propio elemento <recipe-card>
          Nota: las variables CSS SÍ atraviesan el Shadow DOM
        */
        :host {
          display: block;
          height: 100%;
        }

        .card {
          background: var(--color-surface, #ffffff);
          border-radius: var(--card-radius, 1rem);
          box-shadow: var(--card-shadow, 0 4px 24px rgba(0,0,0,0.08));
          overflow: hidden;
          transition: transform 0.25s, box-shadow 0.25s;
          display: flex;
          flex-direction: ${this.isFeatured ? "row" : "column"};
          height: 100%;
          font-family: var(--font-body, 'DM Sans', sans-serif);
        }

        .card:hover {
          transform: translateY(-4px);
          box-shadow: var(--card-shadow-hover, 0 12px 40px rgba(0,0,0,0.15));
        }

        /* part="image" → el profe puede usar recipe-card::part(image) {} */
        .card-img {
          background: ${this.cardGradient};
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 3.5rem;
          ${this.isFeatured
            ? "width: 180px; flex-shrink: 0;"
            : "height: 140px;"
          }
        }

        .card-body {
          padding: ${this.isFeatured ? "1.5rem 2rem" : "1.25rem"};
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          flex: 1;
        }

        /* part="tag" */
        .card-tag {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--card-tag-color, #c0392b);
        }

        /* part="meta" */
        .card-meta {
          display: flex;
          gap: 1rem;
          font-size: 0.8rem;
          color: var(--color-text-light, #6b6b6b);
          margin-top: 0.5rem;
          flex-wrap: wrap;
        }

        /*
          ::slotted() → aplica estilos al contenido
          que el usuario inyecta via slots desde el Light DOM.
          Solo aplica a elementos de nivel 1 directo.
        */
        ::slotted([slot="title"]) {
          font-family: var(--font-display, Georgia, serif);
          font-size: 1.2rem;
          font-weight: 700;
          line-height: 1.3;
          margin: 0;
        }

        ::slotted([slot="description"]) {
          font-size: 0.9rem;
          color: var(--color-text-light, #6b6b6b);
          margin: 0;
          flex: 1;
        }
      </style>

      <div class="card">

        <!--
          part="image":
          Desde fuera se puede estilizar con:
          recipe-card::part(image) { border-radius: 0; }
        -->
        <div class="card-img" part="image">${this.cardEmoji}</div>

        <div class="card-body">

          <span class="card-tag" part="tag">${this.cardTag}</span>

          <!--
            SLOT nombrado "title":
            El HTML externo pone: <h3 slot="title">Mi receta</h3>
            Si no se provee, el slot queda vacío (sin fallback visible)
          -->
          <slot name="title"></slot>

          <!--
            SLOT nombrado "description":
            El HTML externo pone: <p slot="description">Descripción</p>
          -->
          <slot name="description"></slot>

          <div class="card-meta" part="meta">
            <span>⏱ ${this.cardTime} min</span>
            <span>👤 ${this.cardPortions} porciones</span>
            <span>⭐ ${this.cardRating}</span>
          </div>

        </div>
      </div>
    `);
  }
}

customElements.define("recipe-card", RecipeCard);
