/* =========================================================
   TM Resume + Portfolio — main.js
   - Header + Footer dùng chung cho mọi trang (sửa 1 chỗ ở đây)
   - Menu mobile
   - Gallery "Graphic and social": lọc, xem thêm, lightbox
   ========================================================= */

const SITE = {
  email: "hello.tommiez@gmail.com",
  linkedin: "https://www.linkedin.com/in/your-handle", // TODO: thay link LinkedIn thật
  cv: "/cv.pdf",
  nav: [
    { key: "about", label: "About", href: "/" },
    { key: "portfolio", label: "Portfolio", href: "/portfolio/" },
  ],
};

/* ---------- Header ---------- */
function renderHeader() {
  const slot = document.getElementById("site-header");
  if (!slot) return;
  const current = document.body.dataset.page; // "about" | "portfolio"

  const links = SITE.nav
    .map(
      (item) =>
        `<a class="btn btn--ghost" href="${item.href}"${
          item.key === current ? ' aria-current="page"' : ""
        }>${item.label}</a>`
    )
    .join("");

  slot.outerHTML = `
  <header class="site-header">
    <div class="container site-header__inner">
      <a class="site-logo" href="/" aria-label="tm studio — About">
        <img src="/assets/img/logo-tmstudio.svg" alt="tm studio" width="68" height="48">
      </a>
      <nav class="site-nav" id="site-nav" aria-label="Main">
        ${links}
        <a class="btn btn--primary nav-cta" href="${SITE.cv}" download>Download CV</a>
      </nav>
      <a class="btn btn--primary header-cta" href="${SITE.cv}" download>Download CV</a>
      <button class="btn btn--ghost menu-toggle" type="button" aria-controls="site-nav" aria-expanded="false" aria-label="Open menu">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
      </button>
    </div>
  </header>`;

  const toggle = document.querySelector(".menu-toggle");
  const nav = document.getElementById("site-nav");
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });
}

/* ---------- Footer ---------- */
function renderFooter() {
  const slot = document.getElementById("site-footer");
  if (!slot) return;
  slot.outerHTML = `
  <footer class="site-footer">
    <div class="container site-footer__inner">
      <p class="body-sm text-hint">© ${new Date().getFullYear()} tm studio. All rights reserved.</p>
      <div class="site-footer__links">
        <a class="btn btn--link emphasis" href="mailto:${SITE.email}">Email</a>
        <a class="btn btn--link emphasis" href="${SITE.linkedin}" target="_blank" rel="noopener">LinkedIn</a>
      </div>
    </div>
  </footer>`;
}

/* ---------- Gallery ---------- */
function initGallery() {
  const gallery = document.querySelector("[data-gallery]");
  if (!gallery) return;

  const tiles = [...gallery.querySelectorAll(".graphic-tile")];
  const filters = [...gallery.querySelectorAll("[data-filter]")];
  const moreBtn = gallery.querySelector("[data-show-all]");
  const LIMIT = Number(gallery.dataset.limit || 8);
  let showAll = false;
  let active = "all";

  function update() {
    let shown = 0;
    tiles.forEach((tile) => {
      const match = active === "all" || tile.dataset.category === active;
      const visible = match && (showAll || shown < LIMIT);
      tile.hidden = !visible;
      if (visible) shown++;
    });
    const total = tiles.filter((t) => active === "all" || t.dataset.category === active).length;
    if (moreBtn) moreBtn.hidden = showAll || total <= LIMIT;
  }

  filters.forEach((btn) =>
    btn.addEventListener("click", () => {
      active = btn.dataset.filter;
      filters.forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
      update();
    })
  );
  moreBtn?.addEventListener("click", () => { showAll = true; update(); });
  update();

  /* Lightbox — mỗi tile có data-images="a.jpg, b.jpg" (carousel nhiều ảnh) */
  const box = document.getElementById("lightbox");
  if (!box) return;
  const img = box.querySelector("img");
  const caption = box.querySelector("[data-caption]");
  const counter = box.querySelector("[data-counter]");
  let slides = [];
  let index = 0;

  function show(i) {
    index = (i + slides.length) % slides.length;
    img.src = slides[index];
    counter.textContent = slides.length > 1 ? `${index + 1} / ${slides.length}` : "";
    box.querySelectorAll("[data-nav]").forEach((b) => (b.hidden = slides.length < 2));
  }

  tiles.forEach((tile) =>
    tile.addEventListener("click", () => {
      slides = (tile.dataset.images || "").split(",").map((s) => s.trim()).filter(Boolean);
      if (!slides.length) return;
      img.alt = tile.querySelector("img")?.alt || "";
      caption.textContent = tile.getAttribute("aria-label") || "";
      show(0);
      box.showModal();
    })
  );
  box.querySelector("[data-nav='prev']").addEventListener("click", () => show(index - 1));
  box.querySelector("[data-nav='next']").addEventListener("click", () => show(index + 1));
  box.querySelector("[data-close]").addEventListener("click", () => box.close());
  box.addEventListener("click", (e) => { if (e.target === box) box.close(); });
  box.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") show(index - 1);
    if (e.key === "ArrowRight") show(index + 1);
  });
}

renderHeader();
renderFooter();
initGallery();
