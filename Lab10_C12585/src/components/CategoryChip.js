// components/CategoryChip.js
// Web Component: <category-chip>
// Lab 10: Shadow DOM + Slot + Variables CSS + CSS Parts

class CategoryChip extends HTMLElement {

  constructor() {
    super();
    // SHADOW DOM
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.setHTMLUnsafe(/* html */`
      <style>
        :host {
          display: inline-block;
        }

        /* part="chip" → recipe-chip::part(chip) { } */
        .chip {
          background: var(--chip-bg, var(--color-surface, #ffffff));
          border: 2px solid var(--chip-border-color, var(--color-border, #e8e0d0));
          color: var(--chip-color, var(--color-text, #1a1a1a));
          padding: 0.6rem 1.4rem;
          border-radius: var(--chip-radius, 999px);
          font-weight: 500;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.2s;
          font-family: var(--font-body, 'DM Sans', sans-serif);
          display: inline-block;
        }

        .chip:hover {
          background: var(--chip-hover-bg, var(--color-primary, #c0392b));
          color: var(--chip-hover-color, white);
          border-color: var(--chip-hover-bg, var(--color-primary, #c0392b));
          transform: translateY(-2px);
        }

        /*
          ::slotted(*) → el texto o contenido interno del chip
          viene del Light DOM via el slot por defecto (sin nombre)
        */
        ::slotted(*) {
          pointer-events: none;
        }
      </style>

      <!--
        SLOT por defecto (sin nombre):
        <category-chip>🥗 Ensaladas</category-chip>
        El texto "🥗 Ensaladas" cae aquí.
      -->
      <div class="chip" part="chip">
        <slot></slot>
      </div>
    `);
  }
}

customElements.define("category-chip", CategoryChip);
