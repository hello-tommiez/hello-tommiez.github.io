/* =========================================================
   TM Resume + Portfolio — main.js
   - Header + Footer dùng chung cho mọi trang (sửa 1 chỗ ở đây)
   - Menu mobile
   - Gallery "Graphic and social": lọc, xem thêm, lightbox
   ========================================================= */

const SITE = {
  email: "hello.tommiez@gmail.com",
  gmail: "https://mail.google.com/mail/?view=cm&fs=1&to=hello.tommiez@gmail.com",
  linkedin: "https://www.linkedin.com/in/hogggtamm/",
  cv: "https://drive.google.com/file/d/1eGDQ2d-rOMRSDDbNGnFFDOh0oFwHhLI8/view?usp=drive_link",
  nav: [
    { key: "about", label: "About", href: "/" },
    { key: "portfolio", label: "Portfolio", href: "/portfolio/" },
  ],
};

/* ---------- Danh sách project (sửa card ở đây cho MỌI trang) ----------
   group: "featured" → Featured projects · "more" → More projects
   Thứ tự trong mảng = thứ tự hiện trên trang.
   "Next project" ở trang chi tiết tự lấy 2 project đứng sau trang hiện tại. */
const PROJECTS = [
  {
    key: "perfima",
    group: "featured",
    title: "Perfima",
    eyebrow: "Fintech · AI",
    desc: "Personal finance management powered by AI.",
    cover: "/assets/img/projects/perfima/perfima-cover.webp",
    alt: "Perfima app cover",
    href: "/portfolio/perfima",
  },
  {
    key: "paydaes",
    group: "more",
    title: "Paydaes - HRMS+ Web App",
    eyebrow: "HRTech · Paydaes",
    desc: "All-in-one HR platform: payroll, leave, attendance and claims.",
    cover: "/assets/img/projects/paydaes/paydaes-cover.webp",
    alt: "Paydaes cover",
    href: "/portfolio/paydaes",
  },
  {
    key: "qvid",
    group: "more",
    title: "QVID - AI Video Generator",
    eyebrow: "AI · Video · OceanLabs",
    desc: "AI video generator. I designed its first design system.",
    cover: "/assets/img/projects/qvid/qvid-cover.webp",
    alt: "QVID cover",
    href: "/portfolio/qvid",
  },
  {
    key: "hrm",
    group: "more",
    title: "HRM - HR & Project Management Web App",
    eyebrow: "HRTech · Designveloper",
    desc: "A suite of modules that helps users manage human resources.",
    cover: "/assets/img/projects/hrm/hrm-cover.webp",
    alt: "HRM app cover",
    href: "https://www.behance.net/gallery/153678965/HRM-HR-Project-Management-Web-App",
    external: true, // mở tab mới
  },
];

function projectCard(p, variant) {
  const target = p.external ? ' target="_blank" rel="noopener"' : "";
  return `
  <article class="card ${variant}">
    <div class="card__media"><img src="${p.cover}" alt="${p.alt}" loading="lazy"></div>
    <div class="card__body">
      <p class="card__eyebrow">${p.eyebrow}</p>
      <h3 class="card__title"><a class="card__link" href="${p.href}"${target}>${p.title}</a></h3>
      <p class="card__desc">${p.desc}</p>
    </div>
  </article>`;
}

function renderProjects() {
  // Trang Portfolio: <div class="project-grid" data-projects="featured|more">
  document.querySelectorAll("[data-projects]").forEach((slot) => {
    const group = slot.dataset.projects;
    const variant = group === "featured" ? "card--elevated" : "card--outline";
    slot.innerHTML = PROJECTS.filter((p) => p.group === group)
      .map((p) => projectCard(p, variant))
      .join("");
  });

  // Trang chi tiết: <body data-project="qvid"> + <div class="next-project__cards" data-next-projects>
  const next = document.querySelector("[data-next-projects]");
  if (next) {
    const i = PROJECTS.findIndex((p) => p.key === document.body.dataset.project);
    const picks = [1, 2].map((n) => PROJECTS[(i + n + PROJECTS.length) % PROJECTS.length]);
    next.innerHTML = picks.map((p) => projectCard(p, "card--elevated card--horizontal")).join("");
  }
}

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
        <img src="/assets/img/logo.svg" alt="tm studio" width="68" height="48">
      </a>
      <nav class="site-nav" id="site-nav" aria-label="Main">
        ${links}
         <a class="btn btn--primary nav-cta" href="${SITE.cv}" target="_blank" rel="noopener">Download CV</a>
      </nav>
      <a class="btn btn--primary header-cta" href="${SITE.cv}" target="_blank" rel="noopener">Download CV</a>
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
        <a class="btn btn--link emphasis" href="${SITE.gmail}" target="_blank" rel="noopener">Email</a>
        <a class="btn btn--link emphasis" href="${SITE.linkedin}" target="_blank" rel="noopener">LinkedIn</a>
      </div>
    </div>
  </footer>`;
}

/* ---------- Gallery "Graphic and social" ----------
   Tự đọc ảnh trong assets/img/graphics/ qua GitHub API:
   graphics/<nhóm>/<ảnh>             → 1 ô ảnh, mỗi nhóm = 1 filter
   graphics/<nhóm>/<thư-mục>/<ảnh…>  → 1 ô carousel nhiều slide
   Không có ảnh → cả section ẩn. */
const GRAPHICS = {
  repo: "hello-tommiez/hello-tommiez.github.io",
  branch: "main",
  root: "assets/img/graphics/",
  cacheMinutes: 10, // lưu kết quả 10 phút để đỡ gọi API
};
const IMG_EXT = /\.(jpe?g|png|webp|gif|avif)$/i;

// "02-summer-sale.jpg" → "Summer sale"
function prettyName(name) {
  const s = name.replace(IMG_EXT, "").replace(/^\d+[-_ ]*/, "").replace(/[-_]+/g, " ").trim();
  return s.charAt(0).toUpperCase() + s.slice(1);
}

async function fetchGraphicPaths() {
  const KEY = "tm-graphics";
  try {
    const c = JSON.parse(sessionStorage.getItem(KEY) || "null");
    if (c && Date.now() - c.t < GRAPHICS.cacheMinutes * 60000) return c.paths;
  } catch (e) {}
  const res = await fetch(`https://api.github.com/repos/${GRAPHICS.repo}/git/trees/${GRAPHICS.branch}?recursive=1`);
  if (!res.ok) throw new Error(`GitHub API ${res.status}`);
  const { tree } = await res.json();
  const paths = tree
    .filter((n) => n.type === "blob" && n.path.startsWith(GRAPHICS.root) && IMG_EXT.test(n.path))
    .map((n) => n.path)
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  try { sessionStorage.setItem(KEY, JSON.stringify({ t: Date.now(), paths })); } catch (e) {}
  return paths;
}

function groupGraphics(paths) {
  const groups = new Map(); // "social" → Map("ten-anh" → item)
  paths.forEach((path) => {
    const parts = path.slice(GRAPHICS.root.length).split("/");
    if (parts.length < 2) return; // ảnh nằm thẳng trong graphics/ → bỏ qua
    const [group, name] = parts;  // name = tên ảnh, hoặc tên thư mục carousel
    if (!groups.has(group)) groups.set(group, new Map());
    const items = groups.get(group);
    if (!items.has(name)) items.set(name, { group, title: prettyName(name), images: [] });
    items.get(name).images.push("/" + encodeURI(path));
  });
  return groups;
}

async function initGallery() {
  const gallery = document.querySelector("[data-gallery]");
  if (!gallery) return;
  const section = gallery.closest("section");
  const filterBar = gallery.querySelector("[data-filters]");
  const masonry = gallery.querySelector("[data-masonry]");

  let groups;
  try { groups = groupGraphics(await fetchGraphicPaths()); }
  catch (e) { console.warn("Graphics:", e); return; } // lỗi → section vẫn ẩn
  if (!groups.size) return;                             // không có ảnh → ẩn

  const keys = [...groups.keys()];
  const multi = keys.length > 1;

  filterBar.innerHTML =
    (multi ? `<button class="tag" type="button" data-filter="all">All</button>` : "") +
    keys.map((k) => `<button class="tag" type="button" data-filter="${k}">${prettyName(k)}</button>`).join("");

  masonry.innerHTML = keys
    .flatMap((k) => [...groups.get(k).values()])
    .map((item) => {
      const label = prettyName(item.group);
      const badge = item.images.length > 1 ? `${label} · ${item.images.length}` : label;
      return `
      <button class="graphic-tile graphic-tile--portrait" type="button" data-category="${item.group}"
        data-images="${item.images.join(", ")}" aria-label="${item.title}, ${badge}">
        <img src="${item.images[0]}" alt="${item.title}" loading="lazy">
        <span class="graphic-tile__overlay"></span>
        <span class="badge badge--sm">${badge}</span>
        <span class="graphic-tile__caption"><span class="body-md emphasis">${item.title}</span><span class="body-sm">${badge}</span></span>
      </button>`;
    })
    .join("");

  // Ô lấy đúng tỉ lệ ảnh thật (vuông, 4:5, 9:16…)
  masonry.querySelectorAll("img").forEach((img) => {
    const fit = () => { img.parentElement.style.aspectRatio = `${img.naturalWidth} / ${img.naturalHeight}`; };
    img.complete && img.naturalWidth ? fit() : img.addEventListener("load", fit, { once: true });
  });

  section.hidden = false;

  /* Lọc + View all */
  const tiles = [...masonry.querySelectorAll(".graphic-tile")];
  const filters = [...filterBar.querySelectorAll("[data-filter]")];
  const moreBtn = gallery.querySelector("[data-show-all]");
  const LIMIT = Number(gallery.dataset.limit || 8);
  let showAll = false;
  let active = multi ? "all" : keys[0];

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
    filters.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.filter === active)));
  }

  filters.forEach((btn) => btn.addEventListener("click", () => { active = btn.dataset.filter; update(); }));
  moreBtn?.addEventListener("click", () => { showAll = true; update(); });
  update();

  /* Lightbox */
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
