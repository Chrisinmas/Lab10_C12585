# RecetApp — Lab 10: Shadow DOM, Slots, Variables CSS y CSS Parts

## Cómo abrir el proyecto

1. Descomprimí el ZIP y abrí la carpeta en **VS Code**
2. Instalá la extensión **Live Server** (si no la tenés)
3. Clic derecho en `src/index.html` → **Open with Live Server**

---

## Estructura del proyecto

```
lab10-webcomponents/
└── src/
    ├── index.html           ← Página principal
    ├── main.js              ← Importa los componentes
    ├── styles/
    │   └── main.css         ← CSS global + variables + ::part()
    └── components/
        ├── RecipeCard.js    ← <recipe-card>
        ├── CategoryChip.js  ← <category-chip>
        └── FeaturedRecipe.js← <featured-recipe>
```

---

## ¿Cómo puede el profe cambiar los componentes?

Hay **tres formas** de personalizar los componentes desde afuera, sin tocar el código interno de cada componente.

---

### 1. Variables CSS

Las variables CSS **atraviesan el Shadow DOM**. Basta con definirlas en `:root` o directamente en el selector del componente en `main.css`.

**Variables disponibles:**

| Variable | Qué controla | Valor por defecto |
|---|---|---|
| `--color-primary` | Color principal (tags, botones, bordes) | `#c0392b` |
| `--color-primary-dark` | Hover del color principal | `#922b21` |
| `--color-surface` | Fondo de las cards | `#ffffff` |
| `--color-bg` | Fondo de la página | `#fffdf8` |
| `--color-text` | Color del texto principal | `#1a1a1a` |
| `--color-text-light` | Color del texto secundario | `#6b6b6b` |
| `--color-border` | Color de bordes | `#e8e0d0` |
| `--font-display` | Fuente de títulos | `'Playfair Display', Georgia, serif` |
| `--font-body` | Fuente del cuerpo | `'DM Sans', sans-serif` |
| `--card-radius` | Redondeo de las cards | `1rem` |
| `--card-shadow` | Sombra de las cards | `0 4px 24px rgba(0,0,0,0.08)` |
| `--card-shadow-hover` | Sombra al hacer hover | `0 12px 40px rgba(0,0,0,0.15)` |
| `--chip-radius` | Redondeo de los chips | `999px` |
| `--chip-bg` | Fondo de los chips | hereda `--color-surface` |
| `--chip-border-color` | Borde de los chips | hereda `--color-border` |
| `--chip-hover-bg` | Fondo al hacer hover en chip | hereda `--color-primary` |
| `--card-tag-color` | Color del tag en recipe-card | hereda `--color-primary` |

**Ejemplo — cambiar el color principal a azul:**
```css
/* en main.css */
:root {
  --color-primary: #1565c0;
  --color-primary-dark: #0d47a1;
}
```

**Ejemplo — hacer las cards completamente cuadradas:**
```css
:root {
  --card-radius: 0;
  --chip-radius: 0;
}
```

---

### 2. CSS Parts (`::part()`)

Los componentes exponen ciertas partes internas con el atributo `part="..."`. Desde `main.css` se pueden estilizar con `::part()` **sin necesidad de tocar el componente**.

**Parts disponibles por componente:**

#### `<recipe-card>`
| Part | Elemento |
|---|---|
| `image` | El emoji/imagen de la tarjeta |
| `tag` | La etiqueta de categoría |
| `meta` | La fila de tiempo, porciones y rating |

#### `<category-chip>`
| Part | Elemento |
|---|---|
| `chip` | El contenedor completo del chip |

#### `<featured-recipe>`
| Part | Elemento |
|---|---|
| `wrapper` | El contenedor general de la receta destacada |
| `section-title` | El título "Receta de la semana" |
| `image` | El emoji/imagen grande |
| `info` | La columna de texto (título, descripción, ingredientes) |
| `stats` | La grilla de estadísticas |
| `button` | El botón "Ver receta completa" |

**Ejemplo — cambiar el color del botón de la receta destacada:**
```css
/* en main.css */
featured-recipe::part(button) {
  background: navy;
  border-radius: 0;
}
```

**Ejemplo — agregar un borde a la imagen de las cards:**
```css
recipe-card::part(image) {
  border: 4px solid var(--color-primary);
}
```

**Ejemplo — cambiar solo la imagen de la card destacada:**
```css
recipe-card[featured]::part(image) {
  border-radius: 0;
  width: 250px;
}
```

---

### 3. Slots (contenido HTML)

El texto de los componentes viene del HTML como **slots nombrados**. Se puede cambiar directamente en `index.html` sin tocar ningún componente.

#### `<recipe-card>` — slots disponibles

```html
<recipe-card emoji="🥗" tag="Ensaladas" time="10" portions="4" rating="4.5"
             gradient="linear-gradient(135deg, #66bb6a, #1b5e20)">

  <!-- Slot "title": el título de la receta -->
  <h3 slot="title">Mi nuevo título</h3>

  <!-- Slot "description": la descripción corta -->
  <p slot="description">Mi nueva descripción.</p>

</recipe-card>
```

#### `<category-chip>` — slot por defecto

```html
<!-- El texto va directamente dentro del elemento -->
<category-chip>🌮 Tacos</category-chip>
```

#### `<featured-recipe>` — slots disponibles

```html
<featured-recipe emoji="🥘" time="60" portions="4" calories="350" rating="4.8"
                 gradient="linear-gradient(135deg, #a5d6a7, #1b5e20)">

  <!-- Slot "tag": categoría de la receta -->
  <span slot="tag">Vegetariano</span>

  <!-- Slot "title": título principal -->
  <h3 slot="title">Gallo pinto deluxe</h3>

  <!-- Slot "description": párrafo de descripción -->
  <p slot="description">El plato bandera de Costa Rica, pero elevado.</p>

  <!-- Slot "ingredients": lista de ingredientes -->
  <ul slot="ingredients">
    <li>2 tazas de arroz cocido</li>
    <li>1 taza de frijoles negros</li>
    <li>Culantro y chile dulce al gusto</li>
  </ul>

</featured-recipe>
```

---

### Resumen rápido

| Técnica | Para qué sirve | Dónde se edita |
|---|---|---|
| **Variables CSS** | Colores, fuentes, radios, sombras globales | `main.css` → `:root {}` |
| **CSS Parts** | Elementos específicos dentro del componente | `main.css` → `componente::part(nombre) {}` |
| **Slots** | El texto y contenido HTML del componente | `index.html` → dentro del tag del componente |
| **Atributos HTML** | Datos técnicos: emoji, tiempo, porciones, gradiente | `index.html` → en los atributos del tag |
