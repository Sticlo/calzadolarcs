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

  var SHIPPING_FLAT = 120;

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
  var fakeCheckoutForm = document.getElementById("fakeCheckoutForm");
  var btnFinishDemo = document.getElementById("btnFinishDemo");

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
      else if (step === "checkout") cartTitle.textContent = "Pago simulado";
      else cartTitle.textContent = "Pedido demo";
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
    if (fakeCheckoutForm) fakeCheckoutForm.reset();
    if (cartToast) cartToast.textContent = "";
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

  if (btnGoCheckout) {
    btnGoCheckout.addEventListener("click", function () {
      if (cart.length === 0) return;
      showStep("checkout");
      if (cartToast) cartToast.textContent = "";
      var first = fakeCheckoutForm && fakeCheckoutForm.querySelector("input");
      if (first) setTimeout(function () { first.focus(); }, 200);
    });
  }

  if (btnBackCart) {
    btnBackCart.addEventListener("click", function () {
      showStep("cart");
      if (cartToast) cartToast.textContent = "";
    });
  }

  if (fakeCheckoutForm) {
    fakeCheckoutForm.addEventListener("submit", function (e) {
      e.preventDefault();
      if (cartToast) cartToast.textContent = "";
      if (!fakeCheckoutForm.checkValidity()) {
        fakeCheckoutForm.reportValidity();
        return;
      }
      var fd = new FormData(fakeCheckoutForm);
      var digits = String(fd.get("cardnumber") || "").replace(/\D/g, "");
      if (digits.length < 15) {
        if (cartToast) cartToast.textContent = "Introduce un número de tarjeta de prueba (15+ dígitos).";
        return;
      }
      cart = [];
      renderCart();
      showStep("success");
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
