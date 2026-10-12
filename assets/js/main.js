/*
 * Tomate de La Cañada-Níjar — JS compartido, vanilla, sin dependencias.
 * El texto vive en el HTML (para SEO); este script solo añade comportamiento.
 */
(function () {
  "use strict";

  /* ---- Menú móvil ---- */
  var toggle = document.querySelector("[data-menu-toggle]");
  var nav = document.querySelector("[data-nav-principal]");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var abierto = nav.getAttribute("data-abierto") === "true";
      nav.setAttribute("data-abierto", String(!abierto));
      toggle.setAttribute("aria-expanded", String(!abierto));
    });
  }

  /* ---- Idioma: recordar preferencia sin redirigir nunca automáticamente ---- */
  var htmlLang = document.documentElement.lang;
  if (htmlLang) {
    try { localStorage.setItem("tomate_idioma", htmlLang.slice(0, 2)); } catch (e) { /* almacenamiento no disponible */ }
  }

  /* ---- Consentimiento: cookies y contenido externo (Google Maps) ----
   * Sin consentimiento no se carga nada de Google Maps: el mapa muestra un
   * aviso y solo se inserta el <iframe> cuando el visitante lo acepta (desde
   * el propio mapa o desde el aviso). La elección se guarda en localStorage
   * y se puede cambiar desde el enlace "Cookies" del pie de página. */
  var CLAVE_CONSENTIMIENTO = "tomate_consentimiento";
  var TEXTOS_COOKIES = {
    es: {
      titulo: "Privacidad y cookies",
      texto: "Usamos solo el almacenamiento necesario para que la web funcione (tu idioma y esta elección). Con tu permiso cargamos además contenido externo de Google Maps, que recibe tu dirección IP y puede usar cookies. Puedes cambiar tu elección cuando quieras desde el enlace «Cookies» del pie de página.",
      aceptar: "Aceptar todo",
      rechazar: "Solo necesarias"
    },
    de: {
      titulo: "Datenschutz und Cookies",
      texto: "Wir verwenden nur die für den Betrieb der Website notwendige Speicherung (Ihre Sprache und diese Auswahl). Mit Ihrer Einwilligung laden wir zusätzlich externe Inhalte von Google Maps, die Ihre IP-Adresse erhalten und Cookies setzen können. Sie können Ihre Auswahl jederzeit über den Link „Cookie-Einstellungen“ in der Fußzeile ändern.",
      aceptar: "Alle akzeptieren",
      rechazar: "Nur notwendige"
    }
  };
  var textosCookies = TEXTOS_COOKIES[(htmlLang || "de").slice(0, 2)] || TEXTOS_COOKIES.de;
  var avisoCookies = null;

  function leerConsentimiento() {
    try {
      var valor = JSON.parse(localStorage.getItem(CLAVE_CONSENTIMIENTO));
      return valor && typeof valor.externos === "boolean" ? valor : null;
    } catch (e) {
      return null;
    }
  }

  function guardarConsentimiento(externos) {
    try {
      localStorage.setItem(CLAVE_CONSENTIMIENTO, JSON.stringify({ externos: externos, fecha: new Date().toISOString(), version: 1 }));
    } catch (e) { /* almacenamiento no disponible: la elección vale solo para esta visita */ }
  }

  function cargarMapas() {
    document.querySelectorAll("[data-mapa-google]").forEach(function (marco) {
      if (marco.querySelector("iframe")) return;
      var iframe = document.createElement("iframe");
      iframe.src = marco.getAttribute("data-src");
      iframe.title = marco.getAttribute("data-titulo") || "";
      iframe.loading = "lazy";
      iframe.referrerPolicy = "strict-origin-when-cross-origin";
      iframe.allowFullscreen = true;
      marco.innerHTML = "";
      marco.appendChild(iframe);
    });
  }

  function decidirConsentimiento(externos) {
    var mapasCargados = document.querySelector("[data-mapa-google] iframe");
    guardarConsentimiento(externos);
    if (avisoCookies) avisoCookies.hidden = true;
    if (externos) {
      cargarMapas();
    } else if (mapasCargados) {
      /* Retirar un consentimiento ya dado: recargar para quitar el contenido de Google */
      window.location.reload();
    }
  }

  function mostrarAvisoCookies(enfocar) {
    if (!avisoCookies) {
      avisoCookies = document.createElement("section");
      avisoCookies.className = "aviso-cookies";
      avisoCookies.setAttribute("role", "dialog");
      avisoCookies.setAttribute("aria-labelledby", "aviso-cookies-titulo");
      avisoCookies.setAttribute("aria-describedby", "aviso-cookies-texto");
      avisoCookies.innerHTML =
        '<h2 class="aviso-cookies__titulo" id="aviso-cookies-titulo"></h2>' +
        '<p id="aviso-cookies-texto"></p>' +
        '<div class="aviso-cookies__acciones">' +
        '<button class="boton aviso-cookies__boton" type="button" data-cookies-aceptar></button>' +
        '<button class="boton aviso-cookies__boton" type="button" data-cookies-rechazar></button>' +
        "</div>";
      avisoCookies.querySelector("h2").textContent = textosCookies.titulo;
      avisoCookies.querySelector("p").textContent = textosCookies.texto;
      avisoCookies.querySelector("[data-cookies-aceptar]").textContent = textosCookies.aceptar;
      avisoCookies.querySelector("[data-cookies-rechazar]").textContent = textosCookies.rechazar;
      avisoCookies.querySelector("[data-cookies-aceptar]").addEventListener("click", function () { decidirConsentimiento(true); });
      avisoCookies.querySelector("[data-cookies-rechazar]").addEventListener("click", function () { decidirConsentimiento(false); });
      document.body.appendChild(avisoCookies);
    }
    avisoCookies.hidden = false;
    if (enfocar) avisoCookies.querySelector("button").focus();
  }

  var consentimiento = leerConsentimiento();
  if (consentimiento && consentimiento.externos) {
    cargarMapas();
  } else if (!consentimiento) {
    mostrarAvisoCookies(false);
  }
  document.querySelectorAll("[data-cargar-mapa]").forEach(function (boton) {
    boton.addEventListener("click", function () { decidirConsentimiento(true); });
  });
  document.querySelectorAll("[data-abrir-cookies]").forEach(function (boton) {
    boton.addEventListener("click", function () { mostrarAvisoCookies(true); });
  });

  /* ---- Formularios de suscripción (sin backend: solo feedback visual) ---- */
  document.querySelectorAll("[data-form-suscripcion]").forEach(function (form) {
    form.addEventListener("submit", function (evt) {
      evt.preventDefault();
      var mensaje = form.querySelector("[data-mensaje-exito]") || form.parentElement.querySelector("[data-mensaje-exito]");
      if (mensaje) {
        mensaje.hidden = false;
      }
      form.reset();
    });
  });

  /* ---- Buscador por código postal (Kaufen / Dónde comprar) ---- */
  var formPostal = document.querySelector("[data-form-postal]");
  if (formPostal) {
    formPostal.addEventListener("submit", function (evt) {
      evt.preventDefault();
      var input = formPostal.querySelector("[data-postal-input]");
      var select = formPostal.querySelector("[data-postal-cadena]");
      var error = formPostal.querySelector("[data-postal-error]");
      var valor = (input.value || "").trim();
      var esValido = /^[0-9]{5}$/.test(valor);

      if (!esValido) {
        if (error) error.hidden = false;
        input.setAttribute("aria-invalid", "true");
        return;
      }
      if (error) error.hidden = true;
      input.removeAttribute("aria-invalid");

      var url = select.value;
      window.open(url, "_blank", "noopener");
    });
  }

  /* ---- Gráfico comparativo de azúcares y ácidos (SVG dibujado por JS) ---- */
  var grafico = document.querySelector("[data-grafico-comparativo]");
  if (grafico) {
    try {
      dibujarGraficoComparativo(grafico);
    } catch (e) {
      /* Si algo falla, el marcador estático de respaldo en el HTML permanece visible */
    }
  }

  function dibujarGraficoComparativo(contenedor) {
    var datosRaw = contenedor.getAttribute("data-valores");
    if (!datosRaw) return;
    var datos = JSON.parse(datosRaw);

    var ancho = 640;
    var alto = 280;
    var margenIzq = 70;
    var margenInf = 40;
    var margenSup = 20;
    var margenDer = 20;

    var maxValor = 0;
    datos.forEach(function (d) {
      if (d.azucares !== null && d.azucares > maxValor) maxValor = d.azucares;
      if (d.acidos !== null && d.acidos > maxValor) maxValor = d.acidos;
    });
    maxValor = Math.ceil((maxValor * 1.1) / 500) * 500;

    var svgNS = "http://www.w3.org/2000/svg";
    var svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("viewBox", "0 0 " + ancho + " " + alto);
    svg.setAttribute("role", "img");
    svg.setAttribute("aria-label", contenedor.getAttribute("data-titulo") || "");

    var plotAncho = ancho - margenIzq - margenDer;
    var plotAlto = alto - margenSup - margenInf;
    var grupoAncho = plotAncho / datos.length;
    var barraAncho = Math.min(34, grupoAncho / 3);

    /* Ejes */
    var eje = document.createElementNS(svgNS, "line");
    eje.setAttribute("x1", margenIzq);
    eje.setAttribute("y1", margenSup + plotAlto);
    eje.setAttribute("x2", margenIzq + plotAncho);
    eje.setAttribute("y2", margenSup + plotAlto);
    eje.setAttribute("stroke", "rgba(255,255,255,0.25)");
    svg.appendChild(eje);

    [0, 0.5, 1].forEach(function (frac) {
      var y = margenSup + plotAlto - frac * plotAlto;
      var valor = Math.round(frac * maxValor);
      var linea = document.createElementNS(svgNS, "line");
      linea.setAttribute("x1", margenIzq);
      linea.setAttribute("y1", y);
      linea.setAttribute("x2", margenIzq + plotAncho);
      linea.setAttribute("y2", y);
      linea.setAttribute("stroke", "rgba(255,255,255,0.08)");
      svg.appendChild(linea);

      var texto = document.createElementNS(svgNS, "text");
      texto.setAttribute("x", margenIzq - 10);
      texto.setAttribute("y", y + 4);
      texto.setAttribute("text-anchor", "end");
      texto.setAttribute("font-size", "11");
      texto.setAttribute("fill", "#ccc");
      texto.textContent = valor;
      svg.appendChild(texto);
    });

    datos.forEach(function (d, i) {
      var cx = margenIzq + grupoAncho * i + grupoAncho / 2;

      if (d.azucares !== null) {
        var hA = (d.azucares / maxValor) * plotAlto;
        var rectA = document.createElementNS(svgNS, "rect");
        rectA.setAttribute("x", cx - barraAncho - 3);
        rectA.setAttribute("y", margenSup + plotAlto - hA);
        rectA.setAttribute("width", barraAncho);
        rectA.setAttribute("height", hA);
        rectA.setAttribute("fill", "#2A9D9C");
        rectA.setAttribute("rx", "2");
        svg.appendChild(rectA);
      }

      if (d.acidos !== null) {
        var hB = (d.acidos / maxValor) * plotAlto;
        var rectB = document.createElementNS(svgNS, "rect");
        rectB.setAttribute("x", cx + 3);
        rectB.setAttribute("y", margenSup + plotAlto - hB);
        rectB.setAttribute("width", barraAncho);
        rectB.setAttribute("height", hB);
        rectB.setAttribute("fill", "#E8862A");
        rectB.setAttribute("rx", "2");
        svg.appendChild(rectB);
      }

      if (d.azucares === null && d.acidos === null) {
        var texto0 = document.createElementNS(svgNS, "text");
        texto0.setAttribute("x", cx);
        texto0.setAttribute("y", margenSup + plotAlto - 8);
        texto0.setAttribute("text-anchor", "middle");
        texto0.setAttribute("font-size", "10");
        texto0.setAttribute("fill", "#999");
        texto0.textContent = "—";
        svg.appendChild(texto0);
      }

      var label = document.createElementNS(svgNS, "text");
      label.setAttribute("x", cx);
      label.setAttribute("y", alto - margenInf + 20);
      label.setAttribute("text-anchor", "middle");
      label.setAttribute("font-size", "12");
      label.setAttribute("fill", "#eee");
      label.textContent = d.nombre;
      svg.appendChild(label);
    });

    contenedor.innerHTML = "";
    contenedor.appendChild(svg);
  }
})();
