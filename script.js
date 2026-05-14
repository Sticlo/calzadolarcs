(function () {
  var testimonials = [
    {
      quote:
        "La calidad es excelente y el estilo es exactamente el vintage elegante que buscaba. Volveré sin duda.",
      name: "Gorella Ganitella",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop&q=80",
    },
    {
      quote:
        "Sandalias cómodas para caminar todo el día. El empaque y la atención al detalle marcan la diferencia.",
      name: "María Soler",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&h=120&fit=crop&q=80",
    },
    {
      quote:
        "Pedí un bolso y unos mocasines: llegaron rápido y lucen mejor que en las fotos. Muy recomendable.",
      name: "Ana Belén Ruiz",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&q=80",
    },
    {
      quote:
        "Me encanta la estética de la marca. Se nota la curaduría en cada par que compré en el outlet.",
      name: "Lucía Fernández",
      avatar:
        "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=120&h=120&fit=crop&q=80",
    },
  ];

  var track = document.getElementById("testimonialTrack");
  var dotsWrap = document.getElementById("testimonialDots");
  var viewport = track && track.parentElement;
  if (!track || !dotsWrap || !viewport) return;

  var slidesPerView = function () {
    return window.matchMedia("(min-width: 768px)").matches ? 2 : 1;
  };

  var pageCount = function () {
    return Math.ceil(testimonials.length / slidesPerView());
  };

  var currentPage = 0;

  function renderSlides() {
    track.innerHTML = "";
    testimonials.forEach(function (t) {
      var slide = document.createElement("div");
      slide.className = "testimonial";
      slide.innerHTML =
        '<article class="testimonial__card">' +
        '<img class="testimonial__avatar" src="' +
        t.avatar +
        '" alt="" width="56" height="56" loading="lazy" />' +
        '<div class="testimonial__body">' +
        '<p class="testimonial__quote">“' +
        t.quote +
        '”</p>' +
        '<p class="testimonial__name">' +
        t.name +
        "</p>" +
        '<span class="testimonial__shoe" aria-hidden="true">👠</span>' +
        "</div>" +
        "</article>";
      track.appendChild(slide);
    });
  }

  function renderDots() {
    dotsWrap.innerHTML = "";
    var pages = pageCount();
    for (var i = 0; i < pages; i++) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "testimonials__dot";
      btn.setAttribute("role", "tab");
      btn.setAttribute("aria-label", "Página " + (i + 1) + " de testimonios");
      btn.setAttribute("aria-selected", i === currentPage ? "true" : "false");
      btn.dataset.page = String(i);
      btn.addEventListener("click", function () {
        currentPage = parseInt(this.dataset.page, 10);
        update();
      });
      dotsWrap.appendChild(btn);
    }
  }

  function layoutSlides() {
    var w = viewport.offsetWidth;
    var spv = slidesPerView();
    var slideW = w / spv;
    var slides = track.querySelectorAll(".testimonial");
    slides.forEach(function (el) {
      el.style.width = slideW + "px";
      el.style.flexBasis = slideW + "px";
    });
  }

  function update() {
    var spv = slidesPerView();
    var maxPage = Math.max(0, Math.ceil(testimonials.length / spv) - 1);
    if (currentPage > maxPage) currentPage = maxPage;

    layoutSlides();
    var w = viewport.offsetWidth;
    track.style.transform = "translateX(" + -(currentPage * w) + "px)";

    var dots = dotsWrap.querySelectorAll(".testimonials__dot");
    dots.forEach(function (d, idx) {
      d.setAttribute("aria-selected", idx === currentPage ? "true" : "false");
    });
  }

  var resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      renderDots();
      update();
    }, 150);
  });

  renderSlides();
  renderDots();
  update();

  var auto = setInterval(function () {
    var pages = pageCount();
    currentPage = (currentPage + 1) % pages;
    update();
  }, 6000);

  document.addEventListener("visibilitychange", function () {
    if (document.hidden) clearInterval(auto);
  });
})();

(function () {
  var form = document.getElementById("newsletterForm");
  var feedback = document.getElementById("newsletterFeedback");
  if (!form || !feedback) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var input = form.querySelector('input[name="email"]');
    if (!input) return;
    if (!input.checkValidity()) {
      feedback.textContent = "Introduce un correo válido.";
      return;
    }
    feedback.textContent = "¡Gracias! Te hemos añadido a la lista (demo).";
    input.value = "";
  });
})();

(function () {
  var PRODUCTS = {
    "larcs-t1": { name: "Plataforma rojo pasión", price: 1290, img: "assets/vitrina-tacones.png" },
    "larcs-t2": { name: "Strass noche", price: 1180, img: "assets/vitrina-tacones.png" },
    "larcs-t3": { name: "Stiletto nude elegancia", price: 1350, img: "assets/vitrina-tacones.png" },
    "larcs-t4": { name: "Bloque terracota", price: 1090, img: "assets/vitrina-tacones.png" },
    "larcs-t5": { name: "T-bar metálico plata", price: 1220, img: "assets/vitrina-tacones.png" },
    "larcs-t6": { name: "Clear minimal", price: 980, img: "assets/vitrina-tacones.png" },
  };

  // ── Wompi: reemplaza "pub_test_" por tu llave real de producción cuando estés listo
  var WOMPI_PUBLIC_KEY = "pub_test_BxFYLFu3BW3VFJybC347qwdPGRpMAHim";

  // Los precios del catálogo están en COP. El total se convierte a centavos para Wompi.
  var SHIPPING_FLAT = 15000; // $15.000 COP de ejemplo — ajusta según tu operación

  var cartToggle = document.getElementById("cartToggle");
  var cartClose = document.getElementById("cartClose");
  var drawer = document.getElementById("cartDrawer");
  var backdrop = document.getElementById("cartBackdrop");
  var cartToast = document.getElementById("cartToast");
  var cartAddFeedback = document.getElementById("cartAddFeedback");
  var navToggle = document.getElementById("navToggle");
  var siteNav = document.getElementById("siteNav");
  var stepCart = document.getElementById("cartStepCart");
  var stepCheckout = document.getElementById("cartStepCheckout");
  var stepSuccess = document.getElementById("cartStepSuccess");
  var cartTitle = document.getElementById("cartTitle");
  var cartLinesEl = document.getElementById("cartLines");
  var cartEmpty = document.getElementById("cartEmpty");
  var cartSummaryBlock = document.getElementById("cartSummaryBlock");
  var cartSubtotalEl = document.getElementById("cartSubtotal");
  var cartShippingEl = document.getElementById("cartShipping");
  var cartTotalEl = document.getElementById("cartTotal");
  var btnGoCheckout = document.getElementById("btnGoCheckout");
  var btnBackCart = document.getElementById("btnBackCart");
  var wompiContainer = document.getElementById("wompiContainer");
  var wompiSummary = document.getElementById("wompiOrderSummary");
  var wompiPanel = document.getElementById("wompiPanel");
  var codPanel = document.getElementById("codPanel");
  var shipName = document.getElementById("shipName");
  var shipPhone = document.getElementById("shipPhone");
  var shipAddress = document.getElementById("shipAddress");
  var shipHp = document.getElementById("shipHp");
  var payMethodWompi = document.getElementById("payMethodWompi");
  var payMethodCOD = document.getElementById("payMethodCOD");
  var btnFinishDemo = document.getElementById("btnFinishDemo");
  var successTitle = document.getElementById("successTitle");
  var successText = document.getElementById("successText");

  if (!drawer || !backdrop || !cartLinesEl) return;

  var cart = [];
  var addFlashTimer;

  var openers = ["heroOpenCart", "shippingOpenCart", "pagosOpenCart", "ctaOpenCart"]
    .map(function (id) {
      return document.getElementById(id);
    })
    .filter(Boolean);

  function formatMoney(n) {
    return "$" + Math.round(n).toLocaleString("es-MX", { maximumFractionDigits: 0 });
  }

  function cartKey(id, size) {
    return id + "|" + size;
  }

  function getSubtotal() {
    return cart.reduce(function (sum, line) {
      var p = PRODUCTS[line.id];
      return sum + (p ? p.price : 0) * line.qty;
    }, 0);
  }

  function showStep(step) {
    if (!stepCart || !stepCheckout || !stepSuccess) return;
    stepCart.hidden = step !== "cart";
    stepCheckout.hidden = step !== "checkout";
    stepSuccess.hidden = step !== "success";
    if (cartTitle) {
      if (step === "cart") cartTitle.textContent = "Tu carrito";
      else if (step === "checkout") cartTitle.textContent = "Confirmar pedido";
      else cartTitle.textContent = "¡Pedido recibido!";
    }
  }

  function updateBadge() {
    var count = cart.reduce(function (s, line) {
      return s + line.qty;
    }, 0);
    var badge = document.getElementById("cartBadge");
    if (badge) badge.textContent = String(count);
    if (cartToggle) {
      cartToggle.setAttribute(
        "aria-label",
        count ? "Abrir carrito, " + count + " artículos" : "Abrir carrito vacío"
      );
    }
  }

  function flashAdded(msg) {
    if (!cartAddFeedback) return;
    cartAddFeedback.textContent = msg;
    clearTimeout(addFlashTimer);
    addFlashTimer = setTimeout(function () {
      cartAddFeedback.textContent = "";
    }, 2200);
  }

  function renderCart() {
    cartLinesEl.innerHTML = "";
    var subtotal = getSubtotal();
    var hasItems = cart.length > 0;

    if (cartEmpty) cartEmpty.hidden = hasItems;
    if (cartSummaryBlock) cartSummaryBlock.hidden = !hasItems;
    if (btnGoCheckout) btnGoCheckout.disabled = !hasItems;

    if (!hasItems) {
      if (cartSubtotalEl) cartSubtotalEl.textContent = formatMoney(0);
      if (cartShippingEl) cartShippingEl.textContent = formatMoney(0);
      if (cartTotalEl) cartTotalEl.textContent = formatMoney(0);
      updateBadge();
      return;
    }

    cart.forEach(function (line) {
      var p = PRODUCTS[line.id];
      if (!p) return;
      var li = document.createElement("li");
      li.className = "cart-line";
      li.dataset.key = cartKey(line.id, line.size);
      var lineTotal = p.price * line.qty;
      li.innerHTML =
        '<img class="cart-line__img" src="' +
        p.img +
        '" alt="" width="72" height="72" />' +
        '<div class="cart-line__info">' +
        '<p class="cart-line__name">' +
        p.name +
        "</p>" +
        '<p class="cart-line__meta">Talla ' +
        line.size +
        (line.qty > 1 ? " · Cantidad " + line.qty : "") +
        "</p>" +
        '<button type="button" class="cart-line__remove" data-key="' +
        cartKey(line.id, line.size) +
        '">Quitar</button>' +
        "</div>" +
        '<span class="cart-line__price">' +
        formatMoney(lineTotal) +
        "</span>";

      li.querySelector(".cart-line__remove").addEventListener("click", function () {
        var key = this.getAttribute("data-key");
        cart = cart.filter(function (x) {
          return cartKey(x.id, x.size) !== key;
        });
        renderCart();
      });

      cartLinesEl.appendChild(li);
    });

    var ship = subtotal > 0 ? SHIPPING_FLAT : 0;
    if (cartSubtotalEl) cartSubtotalEl.textContent = formatMoney(subtotal);
    if (cartShippingEl) cartShippingEl.textContent = formatMoney(ship);
    if (cartTotalEl) cartTotalEl.textContent = formatMoney(subtotal + ship);
    updateBadge();
  }

  function addToCart(productId, size) {
    if (!PRODUCTS[productId]) return;
    var key = cartKey(productId, size);
    var found = cart.find(function (l) {
      return cartKey(l.id, l.size) === key;
    });
    if (found) found.qty += 1;
    else cart.push({ id: productId, size: size, qty: 1 });
    renderCart();
    flashAdded("Añadido al carrito: " + PRODUCTS[productId].name + " (talla " + size + ")");
  }

  document.querySelectorAll(".js-add-to-cart").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var id = this.getAttribute("data-product-id");
      var card = this.closest(".product-card");
      var sel = card && card.querySelector(".product-card__size");
      var size = sel ? sel.value : "25";
      showStep("cart");
      addToCart(id, size);
      openCart();
    });
  });

  function openCart() {
    drawer.classList.add("is-open");
    backdrop.classList.add("is-visible");
    document.body.classList.add("is-cart-open");
    drawer.setAttribute("aria-hidden", "false");
    backdrop.setAttribute("aria-hidden", "false");
    if (cartToggle) cartToggle.setAttribute("aria-expanded", "true");
    if (navToggle && siteNav) closeNav();
    if (cartClose) cartClose.focus();
  }

  function closeCart() {
    showStep("cart");
    if (cartToast) cartToast.textContent = "";
    if (wompiContainer) wompiContainer.innerHTML = "";
    if (wompiSummary) wompiSummary.innerHTML = "";
    [shipName, shipPhone, shipAddress].forEach(function (el) { if (el) el.value = ""; });
    if (shipHp) shipHp.value = "";
    setPayMethod("wompi");
    drawer.classList.remove("is-open");
    backdrop.classList.remove("is-visible");
    document.body.classList.remove("is-cart-open");
    drawer.setAttribute("aria-hidden", "true");
    backdrop.setAttribute("aria-hidden", "true");
    if (cartToggle) cartToggle.setAttribute("aria-expanded", "false");
    if (cartToggle) cartToggle.focus();
  }

  function closeNav() {
    document.body.classList.remove("is-nav-open");
    if (navToggle) navToggle.setAttribute("aria-expanded", "false");
  }

  function openNav() {
    document.body.classList.add("is-nav-open");
    if (navToggle) navToggle.setAttribute("aria-expanded", "true");
  }

  function toggleNav() {
    if (document.body.classList.contains("is-nav-open")) closeNav();
    else openNav();
  }

  if (cartToggle) {
    cartToggle.addEventListener("click", function () {
      if (drawer.classList.contains("is-open")) closeCart();
      else {
        showStep("cart");
        openCart();
      }
    });
  }

  openers.forEach(function (btn) {
    btn.addEventListener("click", function () {
      showStep("cart");
      openCart();
    });
  });

  if (cartClose) cartClose.addEventListener("click", closeCart);
  backdrop.addEventListener("click", closeCart);

  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    if (!drawer.classList.contains("is-open")) {
      closeNav();
      return;
    }
    if (stepCheckout && !stepCheckout.hidden) {
      showStep("cart");
      e.preventDefault();
      return;
    }
    closeCart();
  });

  function generateReference() {
    return "LARCS-" + Date.now() + "-" + Math.random().toString(36).slice(2, 8).toUpperCase();
  }

  function renderWompiCheckout(amountInCents) {
    if (!wompiContainer) return;

    // Resumen del pedido
    if (wompiSummary) {
      var subtotal = getSubtotal();
      var total = subtotal + SHIPPING_FLAT;
      wompiSummary.innerHTML =
        "<div class='wompi-summary__row'><span>Subtotal</span><span>" + formatMoney(subtotal) + "</span></div>" +
        "<div class='wompi-summary__row wompi-summary__row--muted'><span>Env\u00edo</span><span>" + formatMoney(SHIPPING_FLAT) + "</span></div>" +
        "<div class='wompi-summary__row wompi-summary__row--total'><span>Total</span><span>" + formatMoney(total) + "</span></div>";
    }

    // Construir URL del checkout hosteado de Wompi
    // Si se abre en local (file://) usar la URL del sitio desplegado
    var SITE_URL = "https://sticlo.github.io/calzadolarcs/";

    function getRedirectUrl() {
      // Wompi requiere HTTPS. En local siempre usamos la URL de producción.
      return SITE_URL + "?payment=ok";
    }

    wompiContainer.innerHTML =
      "<button type='button' class='btn btn--checkout btn--wompi-pay' id='btnWompiPay'>" +
      "<svg width='18' height='18' viewBox='0 0 24 24' fill='none' aria-hidden='true' style='flex-shrink:0'>" +
      "<path d='M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z' fill='currentColor'/>" +
      "</svg>" +
      " Pagar con Wompi" +
      "</button>";

    var btnWompiPay = document.getElementById("btnWompiPay");
    if (btnWompiPay) {
      btnWompiPay.addEventListener("click", function () {
        // Validar campos de envío
        var name = (shipName ? shipName.value.trim() : "");
        var phone = (shipPhone ? shipPhone.value.replace(/\D/g, "") : "");
        var address = (shipAddress ? shipAddress.value.trim() : "");
        if (!name) { if (cartToast) cartToast.textContent = "Ingresa tu nombre completo."; if (shipName) shipName.focus(); return; }
        if (!/^3[0-9]{9}$/.test(phone)) { if (cartToast) cartToast.textContent = "Ingresa un celular colombiano v\u00e1lido (ej. 3001234567)."; if (shipPhone) shipPhone.focus(); return; }
        if (!address) { if (cartToast) cartToast.textContent = "Ingresa tu direcci\u00f3n de entrega."; if (shipAddress) shipAddress.focus(); return; }
        if (cartToast) cartToast.textContent = "";

        var ref = generateReference();
        var amtStr = String(amountInCents);
        var currency = "COP";

        // Resumen de items
        var itemsSummary = cart.map(function (l) {
          var p = PRODUCTS[l.id];
          return (p ? p.name : l.id) + " T." + l.size + " x" + l.qty;
        }).join(" | ");

        btnWompiPay.disabled = true;
        btnWompiPay.textContent = "Procesando...";

        // Enviar datos a Formspree (fire-and-forget)
        fetch("https://formspree.io/f/mkoyaqlb", {
          method: "POST",
          headers: { "Content-Type": "application/json", "Accept": "application/json" },
          body: JSON.stringify({
            nombre: name,
            telefono: phone,
            direccion: address,
            metodo: "Wompi (en l\u00ednea)",
            items: itemsSummary,
            total: formatMoney(getSubtotal() + SHIPPING_FLAT),
            referencia: ref
          }),
        }).catch(function () {}); // no bloquear si Formspree falla

        fetch("/sign", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ reference: ref, amount: amtStr, currency: currency }),
        })
          .then(function (r) { return r.json(); })
          .then(function (data) {
            var url = "https://checkout.wompi.co/p/?" +
              "public-key=" + encodeURIComponent(WOMPI_PUBLIC_KEY) +
              "&currency=" + currency +
              "&amount-in-cents=" + amtStr +
              "&reference=" + encodeURIComponent(ref) +
              "&signature:integrity=" + encodeURIComponent(data.signature) +
              "&redirect-url=" + encodeURIComponent(getRedirectUrl());
            window.location.href = url;
          })
          .catch(function () {
            // Fallback para pruebas locales sin el worker (sin firma de integridad)
            var url = "https://checkout.wompi.co/p/?" +
              "public-key=" + encodeURIComponent(WOMPI_PUBLIC_KEY) +
              "&currency=" + currency +
              "&amount-in-cents=" + amtStr +
              "&reference=" + encodeURIComponent(ref) +
              "&redirect-url=" + encodeURIComponent(getRedirectUrl());
            window.location.href = url;
          });
      });
    }
  }

  function setPayMethod(method) {
    var isWompi = method === "wompi";
    if (wompiPanel) wompiPanel.hidden = !isWompi;
    if (codPanel) codPanel.hidden = isWompi;
    if (payMethodWompi) {
      payMethodWompi.classList.toggle("is-selected", isWompi);
      payMethodWompi.setAttribute("aria-pressed", String(isWompi));
    }
    if (payMethodCOD) {
      payMethodCOD.classList.toggle("is-selected", !isWompi);
      payMethodCOD.setAttribute("aria-pressed", String(!isWompi));
    }
  }

  if (payMethodWompi) payMethodWompi.addEventListener("click", function () { setPayMethod("wompi"); });
  if (payMethodCOD) payMethodCOD.addEventListener("click", function () { setPayMethod("cod"); });

  var COD_COOLDOWN_MS = 60000; // 60 segundos entre envíos
  var codLastSubmit = 0;

  var btnConfirmCOD = document.getElementById("btnConfirmCOD");
  if (btnConfirmCOD) {
    btnConfirmCOD.addEventListener("click", function () {
      // 1. Honeypot
      if (shipHp && shipHp.value.trim() !== "") return;

      // 2. Validar campos compartidos
      var name = (shipName ? shipName.value.trim() : "");
      var phone = (shipPhone ? shipPhone.value.replace(/\D/g, "") : "");
      var address = (shipAddress ? shipAddress.value.trim() : "");
      if (!name) { if (cartToast) cartToast.textContent = "Ingresa tu nombre completo."; if (shipName) shipName.focus(); return; }
      if (!/^3[0-9]{9}$/.test(phone)) { if (cartToast) cartToast.textContent = "Ingresa un celular colombiano v\u00e1lido (ej. 3001234567)."; if (shipPhone) shipPhone.focus(); return; }
      if (!address) { if (cartToast) cartToast.textContent = "Ingresa tu direcci\u00f3n de entrega."; if (shipAddress) shipAddress.focus(); return; }

      // 3. Cooldown
      var now = Date.now();
      if (now - codLastSubmit < COD_COOLDOWN_MS) {
        var secsLeft = Math.ceil((COD_COOLDOWN_MS - (now - codLastSubmit)) / 1000);
        if (cartToast) cartToast.textContent = "Espera " + secsLeft + " segundos antes de intentar de nuevo.";
        return;
      }

      if (cartToast) cartToast.textContent = "";
      codLastSubmit = now;

      // Resumen de items
      var itemsSummary = cart.map(function (l) {
        var p = PRODUCTS[l.id];
        return (p ? p.name : l.id) + " T." + l.size + " x" + l.qty;
      }).join(" | ");

      // Enviar a Formspree
      fetch("https://formspree.io/f/mkoyaqlb", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          nombre: name,
          telefono: phone,
          direccion: address,
          metodo: "Contra entrega",
          items: itemsSummary,
          total: formatMoney(getSubtotal() + SHIPPING_FLAT),
          referencia: generateReference()
        }),
      }).catch(function () {}); // no bloquear si Formspree falla

      cart = [];
      renderCart();
      if (successTitle) successTitle.textContent = "\u00a1Pedido confirmado!";
      if (successText) successText.textContent =
        "Hola " + name + ", recibimos tu pedido contra entrega. " +
        "Te contactaremos por WhatsApp al " + phone + " para coordinar la entrega.";
      showStep("success");
      [shipName, shipPhone, shipAddress].forEach(function (el) { if (el) el.value = ""; });
    });
  }

  if (btnGoCheckout) {
    btnGoCheckout.addEventListener("click", function () {
      if (cart.length === 0) return;
      showStep("checkout");
      if (cartToast) cartToast.textContent = "";
      var total = getSubtotal() + SHIPPING_FLAT;
      renderWompiCheckout(total * 100);
    });
  }

  if (btnBackCart) {
    btnBackCart.addEventListener("click", function () {
      showStep("cart");
      if (cartToast) cartToast.textContent = "";
      if (wompiContainer) wompiContainer.innerHTML = "";
      if (wompiSummary) wompiSummary.innerHTML = "";
      setPayMethod("wompi");
    });
  }

  if (btnFinishDemo) {
    btnFinishDemo.addEventListener("click", function () {
      closeCart();
    });
  }

  if (navToggle && siteNav) {
    navToggle.addEventListener("click", toggleNav);
    siteNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeNav);
    });
  }

  // Detectar retorno desde Wompi (?payment=ok)
  (function () {
    var params = new URLSearchParams(window.location.search);
    if (params.get("payment") === "ok") {
      history.replaceState(null, "", window.location.pathname);
      cart = [];
      renderCart();
      openCart();
      showStep("success");
    }
  }());

  showStep("cart");
  renderCart();
})();

// ── Scroll reveal ────────────────────────────────────────────────────────────
(function () {
  var revealEls = document.querySelectorAll('[data-reveal]');
  if (!revealEls.length) return;

  if (!('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('is-revealed'); });
    return;
  }

  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(function (el) { obs.observe(el); });
}());

// ── Stats counter ────────────────────────────────────────────────────────────
(function () {
  var statEls = document.querySelectorAll('[data-count]');
  if (!statEls.length || !('IntersectionObserver' in window)) return;

  var statsObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var el = entry.target;
      var target = parseInt(el.dataset.count, 10);
      var duration = 1600;
      var startTime = null;
      function tick(now) {
        if (!startTime) startTime = now;
        var elapsed = now - startTime;
        var progress = Math.min(elapsed / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target).toLocaleString('es-MX');
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      statsObs.unobserve(el);
    });
  }, { threshold: 0.4 });

  statEls.forEach(function (el) { statsObs.observe(el); });
}());
