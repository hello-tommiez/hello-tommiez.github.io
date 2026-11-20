# hello-tommiez.github.io

Resume + Portfolio của Tam Nguyen Hong — HTML/CSS/JS thuần, deploy bằng GitHub Pages.
Code dựng từ Figma "TM · Resume - Portfolio" (page 🎨 Portfolio).

## Cấu trúc

```
/
├── index.html               ← About (trang chủ)
├── 404.html                 ← trang lỗi (dùng tạm cho trang chưa làm)
├── cv.pdf                   ← CV Product Designer (tự thêm)
├── .nojekyll
├── portfolio/
│   ├── index.html           ← Portfolio · Overview      → /portfolio/
│   ├── perfima.html         ← (sắp làm)                  → /portfolio/perfima
│   ├── tms-system.html      ← (sắp làm)                  → /portfolio/tms-system
│   ├── qvid.html            ← (sắp làm)                  → /portfolio/qvid
│   └── hrm.html             ← (sắp làm)                  → /portfolio/hrm
└── assets/
    ├── css/tokens.css       ← biến màu, font, spacing (TM's System)
    ├── css/styles.css       ← base, component, layout từng trang
    ├── js/main.js           ← header/footer dùng chung, menu mobile, gallery
    └── img/                 ← ảnh export từ Figma
```

## Ảnh cần export từ Figma

| File | Lấy từ node | Gợi ý export |
|---|---|---|
| assets/img/logo-tmstudio.svg | Site / Header → logo | SVG |
| assets/img/favicon.svg | monogram "tm" | SVG |
| assets/img/portrait.jpg | About · Desktop → portrait (ảnh gốc) | JPG 2x |
| assets/img/projects/perfima-cover.jpg | Card · Perfima → Image | JPG 2x (768×360) |
| assets/img/projects/qvid-cover.jpg | Card · QVID → media | JPG 2x |
| assets/img/projects/hrm-cover.jpg | Card · HRM → media | JPG 2x |
| assets/img/graphics/*.jpg | bài social / key visual | JPG, đặt tên theo `data-images` trong portfolio/index.html |

## Sửa nhanh

- Link LinkedIn, email, đường dẫn CV, menu: `assets/js/main.js` → object `SITE`.
- Màu / font / spacing: `assets/css/tokens.css`.
- Thêm project card: copy một `<article class="card ...">` trong `portfolio/index.html`.
- Thêm ảnh graphic: copy một `<button class="graphic-tile ...">` (hướng dẫn nằm ngay trong comment).

## Deploy

1. Tạo repo tên đúng `hello-tommiez.github.io`.
2. Push toàn bộ thư mục này lên nhánh `main`.
3. Settings → Pages → Source: *Deploy from a branch* → `main` / `(root)`.
4. Chạy thử local: `python3 -m http.server` rồi mở http://localhost:8000
   (mở file trực tiếp sẽ lỗi đường dẫn vì site dùng đường dẫn tuyệt đối `/assets/...`).
