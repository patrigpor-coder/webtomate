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
/rezepte/gazpacho.html                              → Receta: Gazpacho
/gesundheit.html                                    → Gesundheit
/kaufen.html                                        → Kaufen
/entdecken.html                                     → Landing QR (sin menú)

/es/index.html                Español                → Inicio
/es/quienes-somos.html                               → Quiénes somos
/es/variedades.html                                  → Variedades
/es/cultivo.html                                     → Cultivo
/es/recetas/index.html                               → Recetas (índice)
/es/recetas/sopa-de-tomate.html                      → Receta: Sopa de tomate
/es/recetas/gazpacho-andaluz.html                    → Receta: Gazpacho andaluz
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
- Fotografías reales (optimizadas a JPEG, máx. 1600 px de ancho):
  `hero-corazon-tomates.jpg` (portada y landing QR), `receta-sopa-tomate.jpg`,
  `receta-gazpacho.jpg`, `variedad-redondo-liso.jpg`, `variedad-asurcado.jpg`,
  `variedad-oblongo.jpg`, `variedad-cereza.jpg` y `cultivo-parral.jpg`
  (página Cultivo/Anbau). Para cambiar una foto, sustituye el archivo
  manteniendo el nombre; si cambian sus proporciones, actualiza también
  los atributos `width`/`height` de la etiqueta `<img>`.
- El logo SVG incluye un comentario `<!-- SUSTITUIR -->` al principio
  explicando qué sustituir.
- En la página "Kaufen"/"Dónde comprar" **no se usan los logotipos de
  REWE ni EDEKA**: cada tarjeta muestra el nombre de la cadena como una
  placa tipográfica propia (clase `.tarjeta-cadena__logo`, fuente de
  cuerpo en mayúsculas, color vino sobre crema). Debajo de las tarjetas,
  una nota (`.nota-cadenas`) aclara que los nombres se citan solo como
  referencia comercial y que la distribución es una propuesta del proyecto.
- Fotos del paso a paso: la sopa de tomate ya tiene las seis
  (`sopa-paso-1.jpg` … `sopa-paso-6.jpg`, como `<img class="paso-foto
  paso-foto--imagen">`). El gazpacho sigue con cajas placeholder
  (`<div class="paso-foto">` con comentario `SUSTITUIR`): sustitúyelas por
  una `<img>` con las mismas clases cuando tengas las fotos.

El sello (logo) que aparece superpuesto en la esquina inferior derecha de
las fotografías se coloca por CSS (clase `.foto-sellada` + `.foto-sellada__sello`)
y NO está incrustado en la imagen: puedes cambiar el logo sin tocar las
fotos.

## Dominio

El sitio está publicado con **GitHub Pages** en
`https://patrigpor-coder.github.io/webtomate/`, que se actualiza solo
cada vez que cambia la rama principal del repositorio. Todas las URLs
absolutas usan ese dominio:

- Todos los `<link rel="canonical">` y `<link rel="alternate" hreflang="...">`
- Las etiquetas `og:url`, `og:image`, `twitter:image`
- Los JSON-LD (`Organization`, `BreadcrumbList`, `Recipe`, `FAQPage`)
- `/sitemap.xml`, `/robots.txt` y `meta.domain` en los JSON de textos

Si más adelante se usa un dominio propio, basta con configurarlo en
GitHub (Settings → Pages → Custom domain) y hacer un buscar-y-reemplazar
de `https://patrigpor-coder.github.io/webtomate` por el dominio nuevo
(sin barra final) en todo el proyecto.

Nota: los buscadores solo leen `robots.txt` en la raíz del dominio
(`patrigpor-coder.github.io/robots.txt`), no dentro de `/webtomate/`.
Mientras el sitio viva en esa subcarpeta, envía el sitemap a Google
directamente desde Google Search Console.

## Formularios

Los formularios de suscripción (newsletter) y el buscador por código
postal funcionan solo en el navegador (JavaScript), sin backend: al
enviarlos se muestra un mensaje de confirmación, pero **no se envía
ningún correo real ni se guarda ningún dato**. Para que la suscripción
funcione de verdad, conecta el `<form>` a tu proveedor de email marketing
(Mailchimp, Brevo, etc.) o a tu propio backend.

## Cookies y Google Maps

- **Aviso de cookies** (`assets/js/main.js`, sección "Consentimiento"):
  aparece en la primera visita con dos botones del mismo peso, "Aceptar
  todo" y "Solo necesarias". La elección se guarda en `localStorage`
  (clave `tomate_consentimiento`) y se puede cambiar desde el enlace
  "Cookies" / "Cookie-Einstellungen" del pie de página. Los textos están
  en `main.js` y en la sección `cookies` de los JSON de textos.
- **Mapa de Google** (Quiénes somos / Über uns): el `<iframe>` no está en
  el HTML. Se inserta solo cuando el visitante da su consentimiento, desde
  el aviso o con el botón "Aceptar y cargar el mapa". La URL del mapa está
  en el atributo `data-src` de `[data-mapa-google]` (versión alemana con
  los parámetros de idioma `!1sde!2sde`). Para cambiar la ubicación, pega
  en `data-src` la URL `src` del código de inserción de Google Maps
  (sustituyendo `&` por `&amp;`) y actualiza la dirección del pie del mapa.
- **Pendiente:** las tipografías se cargan desde Google Fonts, que también
  conecta con Google sin consentimiento. Para cumplir del todo el RGPD en
  Alemania conviene alojarlas en el propio sitio.

## Pendiente para publicar

1. **Fotografías pendientes**: logo en PNG con fondo transparente y fotos
   de cada paso del gazpacho.
2. **Recetas 3 y siguientes**: los índices de recetas (`rezepte/index.html`
   y `es/recetas/index.html`) tienen una tarjeta "Demnächst" / "Próximamente"
   lista para sustituir por recetas reales (instrucciones en comentarios
   `<!-- SUSTITUIR -->` dentro de esos archivos).
3. **Dominio propio** (opcional): hoy el sitio usa el dominio de GitHub
   Pages (ver sección "Dominio" arriba).
4. **Impresum / Datenschutz** (aviso legal / privacidad): los enlaces del
   pie de página apuntan a `#` como marcador de posición; falta redactar
   y enlazar estas páginas legales, obligatorias en Alemania. La política
   de privacidad debe mencionar Google Maps y el aviso de cookies.
5. **Formulario de suscripción real**: conectar a un proveedor de email
   marketing o backend propio (ver sección "Formularios" arriba).
