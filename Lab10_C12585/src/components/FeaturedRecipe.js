// components/FeaturedRecipe.js
// Web Component: <featured-recipe>
// Lab 10: Shadow DOM + Slots nombrados + Variables CSS + CSS Parts

class FeaturedRecipe extends HTMLElement {

  static get observedAttributes() {
    return ["emoji", "gradient", "time", "portions", "calories", "rating"];
  }

  constructor() {
    super();
    // SHADOW DOM
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== null) this.render();
  }

  get recipeEmoji()    { return this.getAttribute("emoji")    ?? "🍲"; }
  get recipeGradient() { return this.getAttribute("gradient") ?? "linear-gradient(135deg, #ffcc80, #e65100)"; }
  get recipeTime()     { return this.getAttribute("time")     ?? "?"; }
  get recipePortions() { return this.getAttribute("portions") ?? "?"; }
  get recipeCalories() { return this.getAttribute("calories") ?? "?"; }
  get recipeRating()   { return this.getAttribute("rating")   ?? "?"; }

  render() {
    this.shadowRoot.setHTMLUnsafe(/* html */`
      <style>
        :host {
          display: block;
        }

        /* part="wrapper" */
        .featured-wrapper {
          background: var(--color-surface, #ffffff);
          border-radius: var(--card-radius, 1rem);
          box-shadow: var(--card-shadow, 0 4px 24px rgba(0,0,0,0.08));
          padding: 3rem 2rem;
          font-family: var(--font-body, 'DM Sans', sans-serif);
          color: var(--color-text, #1a1a1a);
        }

        /* part="section-title" */
        .section-title {
          font-family: var(--font-display, Georgia, serif);
          font-size: clamp(1.8rem, 3vw, 2.5rem);
          font-weight: 900;
          margin-bottom: 2rem;
          position: relative;
          display: inline-block;
        }

        .section-title::after {
          content: '';
          position: absolute;
          bottom: -6px;
          left: 0;
          width: 50%;
          height: 4px;
          background: var(--color-primary, #c0392b);
          border-radius: 2px;
        }

        /* Grid por áreas — igual que Lab 9 */
        .grid {
          display: grid;
          grid-template-areas:
            "img info"
            "stats info";
          grid-template-columns: 300px 1fr;
          gap: 1.5rem;
          align-items: start;
        }

        /* part="image" */
        .dest-imagen {
          grid-area: img;
          background: ${this.recipeGradient};
          border-radius: var(--card-radius, 1rem);
          height: 250px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 6rem;
        }

        /* part="info" */
        .dest-info {
          grid-area: info;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        /* part="stats" */
        .dest-stats {
          grid-area: stats;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.75rem;
        }

        .stat-box {
          background: var(--color-bg, #fffdf8);
          border: 2px solid var(--color-border, #e8e0d0);
          border-radius: 0.5rem;
          padding: 1rem;
          text-align: center;
          font-size: 0.85rem;
          color: var(--color-text-light, #6b6b6b);
          line-height: 1.6;
        }

        .stat-box strong {
          font-size: 1.3rem;
          color: var(--color-text, #1a1a1a);
          display: block;
        }

        /*
          ::slotted() — estilos para slots nombrados desde Light DOM
          El usuario usa: <h3 slot="title">Texto</h3>
                          <p  slot="description">Texto</p>
                          <ul slot="ingredients">...</ul>
                          <span slot="tag">Categoría</span>
        */
        ::slotted([slot="tag"]) {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--color-primary, #c0392b);
        }

        ::slotted([slot="title"]) {
          font-family: var(--font-display, Georgia, serif);
          font-size: 2rem;
          font-weight: 900;
          line-height: 1.2;
          margin: 0;
        }

        ::slotted([slot="description"]) {
          color: var(--color-text-light, #6b6b6b);
          line-height: 1.7;
          margin: 0;
        }

        ::slotted([slot="ingredients"]) {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .btn-primary {
          display: inline-block;
          background: var(--color-primary, #c0392b);
          color: white;
          font-weight: 700;
          font-size: 0.95rem;
          padding: 0.85rem 2rem;
          border-radius: 999px;
          text-decoration: none;
          transition: all 0.25s;
          align-self: flex-start;
          cursor: pointer;
          border: none;
          font-family: inherit;
        }

        .btn-primary:hover {
          background: var(--color-primary-dark, #922b21);
          transform: translateY(-2px);
        }

        @media (max-width: 700px) {
          .grid {
            grid-template-areas:
              "img"
              "stats"
              "info";
            grid-template-columns: 1fr;
          }
        }
      </style>

      <div class="featured-wrapper" part="wrapper">
        <h2 class="section-title" part="section-title">Receta de la semana</h2>

        <div class="grid">

          <!-- part="image" → featured-recipe::part(image) { } -->
          <div class="dest-imagen" part="image">${this.recipeEmoji}</div>

          <!--
            part="info"
            Contiene 4 slots nombrados: tag, title, description, ingredients
          -->
          <div class="dest-info" part="info">
            <slot name="tag"></slot>
            <slot name="title"></slot>
            <slot name="description"></slot>
            <slot name="ingredients"></slot>
            <button class="btn-primary" part="button">Ver receta completa</button>
          </div>

          <!-- part="stats" -->
          <div class="dest-stats" part="stats">
            <div class="stat-box">⏱<br/><strong>${this.recipeTime} min</strong><br/>preparación</div>
            <div class="stat-box">👤<br/><strong>${this.recipePortions}</strong><br/>porciones</div>
            <div class="stat-box">🔥<br/><strong>${this.recipeCalories}</strong><br/>kcal</div>
            <div class="stat-box">⭐<br/><strong>${this.recipeRating}</strong><br/>rating</div>
          </div>

        </div>
      </div>
    `);
  }
}

customElements.define("featured-recipe", FeaturedRecipe);
