# Tomate de La Cañada-Níjar — sitio web bilingüe (DE / ES)

Sitio estático (HTML5 + CSS + JavaScript vanilla, sin frameworks ni build)
para la IGP "Tomate de La Cañada-Níjar", dirigido al mercado alemán.
Alemán en la raíz, español bajo `/es/`.

## Estructura de carpetas

```
/index.html                  Alemán (raíz)         → Start
/ueber-uns.html                                     → Über uns
/sorten.html                                        → Sorten
/anbau.html                                         → Anbau
/rezepte/index.html                                 → Rezepte (índice)
/rezepte/tomatensuppe.html                          → Receta: Tomatensuppe
/gesundheit.html                                    → Gesundheit
/kaufen.html                                        → Kaufen
/entdecken.html                                     → Landing QR (sin menú)

/es/index.html                Español                → Inicio
/es/quienes-somos.html                               → Quiénes somos
/es/variedades.html                                  → Variedades
/es/cultivo.html                                     → Cultivo
/es/recetas/index.html                               → Recetas (índice)
/es/recetas/sopa-de-tomate.html                      → Receta: Sopa de tomate
/es/salud.html                                       → Salud
/es/donde-comprar.html                               → Dónde comprar
/es/descubre.html                                    → Landing QR (sin menú)

/assets/css/main.css          Todo el CSS del sitio, con variables en :root
/assets/js/main.js            JS vanilla: menú móvil, formularios, buscador
                               postal, gráfico comparativo de azúcares/ácidos
/assets/i18n/de.json          Textos en alemán (fuente de verdad)
/assets/i18n/es.json          Textos en español (mismas claves que de.json)
/assets/img/                  Logo e imágenes (placeholders SVG, ver abajo)

/sitemap.xml                  URLs de ambos idiomas con anotaciones hreflang
/robots.txt
```

Cada página en alemán tiene su equivalente exacto en español (mismo
contenido, slug traducido). El selector de idioma de la cabecera (DE | ES)
siempre enlaza a la página equivalente, nunca a la portada.

## Cómo editar los textos

**Los archivos `/assets/i18n/de.json` y `/assets/i18n/es.json` son la
fuente de verdad del contenido.** Ambos tienen exactamente las mismas
claves, en el mismo orden, para que sea fácil comparar y traducir.

Importante: por motivos de SEO (para que Google indexe el texto sin
depender de JavaScript), **el texto no se carga desde el JSON en tiempo
de ejecución**: está escrito directamente en cada HTML. Esto significa que:

1. Para llevar un registro claro de qué texto va en cada idioma, edita
   primero el JSON correspondiente.
2. Después, copia el mismo cambio a mano en el HTML de esa página (busca
   el texto antiguo con el buscador de tu editor y sustitúyelo).
3. Si tienes conocimientos de programación, puedes escribir un pequeño
   script que genere el HTML a partir del JSON y una plantilla; los
   nombres de las claves ya están preparados para ello.

## Cómo editar la identidad visual

Todo el color y la tipografía se controlan desde las variables al
principio de `/assets/css/main.css`:

```css
:root {
  --negro: #0D0D0D;
  --vino: #6B1620;
  --rojo-logo: #D42E23;
  --turquesa: #2A9D9C;
  --naranja: #E8862A;
  --verde: #2F7A3E;
  --crema: #F5F1EA;
  --blanco-roto: #FBF9F6;
}
```

No añadas colores fuera de esta lista: todos los acentos deben salir del
logo para mantener la coherencia de marca. Las tipografías (Cormorant
Garamond para titulares, Inter para el cuerpo) se cargan desde Google
Fonts en el `<head>` de cada página.

## Imágenes: qué es real y qué es un placeholder

**Importante:** los dos archivos de imagen mencionados en el encargo
(`Logo_tomate_la_can_ada.jpg` y `Tomate_corazon_.jpeg`) no llegaron a
adjuntarse a esta sesión de trabajo — solo se recibió el documento de
instrucciones. Por eso:

- `/assets/img/logo-tomate-la-canada.svg` es una **reconstrucción
  provisional** del sello descrito (fondo circular, "TOMATE" en arco rojo,
  "LA CAÑADA · NÍJAR" en arco inferior, cuadrado central turquesa/rojo/
  naranja y estrella verde). Sustitúyelo por el recorte real en PNG con
  fondo transparente en cuanto tengas el archivo original. El sitio
  referencia el logo por su ruta (`logo-tomate-la-canada.svg`); si lo
  sustituyes por un `.png`, actualiza la extensión en los HTML (búsqueda
  y reemplazo de `logo-tomate-la-canada.svg` por `logo-tomate-la-canada.png`
  en todos los archivos).
- `/assets/img/hero-corazon-tomates.svg` es un **placeholder ilustrado**
  del corazón de tomates sobre fondo negro (proporción vertical
  correcta). Sustitúyelo por la fotografía real con el mismo nombre de
  archivo (cambiando la extensión si hace falta) para no tener que tocar
  el HTML.
- `/assets/img/variedad-*.svg` (4 archivos) son placeholders de las
  fotos de cada variedad en la página de Variedades/Sorten.
- `/assets/img/receta-sopa-tomate.svg` es el placeholder de la foto del
  plato terminado en la receta.
- Todos estos archivos incluyen un comentario `<!-- SUSTITUIR -->` al
  principio explicando qué sustituir.
- Los logos de REWE y EDEKA en la página "Kaufen"/"Dónde comprar" son
  cajas de texto placeholder (`<!-- SUSTITUIR: Logo REWE -->` /
  `<!-- SUSTITUIR: Logo EDEKA -->`): sustitúyelos por los logos oficiales
  respetando las condiciones de uso de marca de cada cadena.
- Las fotos de cada paso de la receta son cajas placeholder (clase
  `.paso-foto`): añade una etiqueta `<img>` dentro de cada una cuando
  tengas las fotos del paso a paso.

El sello (logo) que aparece superpuesto en la esquina inferior derecha de
las fotografías se coloca por CSS (clase `.foto-sellada` + `.foto-sellada__sello`)
y NO está incrustado en la imagen: puedes cambiar el logo sin tocar las
fotos.

## Dominio

Todas las URLs canónicas, hreflang, Open Graph y el sitemap usan el
dominio de ejemplo `https://www.tomate-lacanada.de`. Antes de publicar,
sustituye este dominio por el real en:

- Todos los `<link rel="canonical">` y `<link rel="alternate" hreflang="...">`
- Las etiquetas `og:url`, `og:image`, `twitter:image`
- Los JSON-LD (`Organization`, `BreadcrumbList`, `Recipe`)
- `/sitemap.xml` y `/robots.txt`

Un buscar-y-reemplazar de `https://www.tomate-lacanada.de` por tu dominio
real en todo el proyecto es suficiente.

## Formularios

Los formularios de suscripción (newsletter) y el buscador por código
postal funcionan solo en el navegador (JavaScript), sin backend: al
enviarlos se muestra un mensaje de confirmación, pero **no se envía
ningún correo real ni se guarda ningún dato**. Para que la suscripción
funcione de verdad, conecta el `<form>` a tu proveedor de email marketing
(Mailchimp, Brevo, etc.) o a tu propio backend.

## Pendiente para publicar

1. **Fotografías reales de producto**: logo en PNG con fondo transparente,
   fotografía del corazón de tomates, fotos de cada variedad, foto del
   plato de sopa de tomate y fotos de cada paso de la receta.
2. **Recetas 2 y siguientes**: los índices de recetas (`rezepte/index.html`
   y `es/recetas/index.html`) tienen dos tarjetas "Demnächst" / "Próximamente"
   listas para sustituir por recetas reales (instrucciones en comentarios
   `<!-- SUSTITUIR -->` dentro de esos archivos).
3. **Logos de REWE y EDEKA** en la página Kaufen / Dónde comprar.
4. **Dominio real** en canonical, hreflang, Open Graph, JSON-LD, sitemap.xml
   y robots.txt (ver sección "Dominio" arriba).
5. **Impresum / Datenschutz** (aviso legal / privacidad): los enlaces del
   pie de página apuntan a `#` como marcador de posición; falta redactar
   y enlazar estas páginas legales, obligatorias en Alemania.
6. **Formulario de suscripción real**: conectar a un proveedor de email
   marketing o backend propio (ver sección "Formularios" arriba).
