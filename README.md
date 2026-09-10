# Mehar Ali Corporation — Static Website

A complete corporate website built with **HTML5, CSS3 and vanilla JavaScript only**.
No build step, no frameworks, no dependencies. Open `index.html` in a browser and it works.

## Structure

```text
mehar-ali-corporation/
├── index.html            Home (hero, trust, about, stats, products,
│                         industries, why us, process, gallery, CTA, contact)
├── about.html            About Us
├── products.html         Product listing with category filter
├── industries.html       Industries we serve
├── contact.html          Contact details, inquiry form, map
├── privacy.html          Privacy Policy
├── terms.html            Terms & Conditions
├── products/
│   ├── foundry-coke.html
│   └── carbon-dust.html
├── css/
│   ├── style.css         Design tokens + all components
│   └── responsive.css    Breakpoints (1200 / 1024 / 900 / 768 / 560 / 380)
├── js/
│   ├── main.js           Header, mobile menu, scroll reveals, lightbox, year
│   ├── products.js       Product filter + quote prefill links
│   └── contact.js        Form validation + success message
└── assets/
    ├── images/           All photography
    ├── icons/            (empty — icons are inline SVG)
    └── documents/        (empty — put PDF catalogs here)
```

## How to update things

### Logo
Each page has a text logo:

```html
<a class="logo" href="index.html">
  <span class="logo__mark">Mehar Ali</span>
  <span class="logo__sub">Corporation</span>
</a>
```

Replace the two `<span>`s with `<img src="assets/images/logo.svg" alt="Mehar Ali Corporation" height="44">`.
It works on both dark and light backgrounds — supply a light-coloured logo, since the header and footer are dark.

### Phone, WhatsApp and email
Current values: **0320 886 2187** and **meharalicorporation@gmail.com**.
Search and replace across all `.html` files:

- `tel:+923208862187` — phone links
- `https://wa.me/923208862187` — WhatsApp links
- `mailto:meharalicorporation@gmail.com` — email links
- the visible text `0320 886 2187`

### Images
Drop replacements into `assets/images/` using the same filenames and nothing else needs to change.
Keep photos compressed (WebP or optimised JPEG) and keep the `width`/`height` attributes accurate.

| File | Used for |
| --- | --- |
| `hero.jpg` | Home hero background |
| `about.jpg` | About section portrait image |
| `cta.jpg` | Dark call-to-action band |
| `product-foundry-coke.jpg`, `product-carbon-dust.jpg` | Product cards and product pages |
| `ind-*.jpg` | Industry cards |
| `gallery-1…6.jpg` | Gallery + lightbox |
| `og-image.jpg` | Social sharing preview |

### Products
1. Copy `products/carbon-dust.html` to `products/<new-product>.html` and edit the content.
2. Copy a `<article class="product-card">` block in `products.html`, update the image, text and `href`, and set `data-category`.
3. Add a matching filter button: `<button class="btn btn--outline" type="button" data-filter="<category>">…</button>`.
4. Add the product to the footer "Products" list on each page.

Specification values marked `[ADD CONFIRMED VALUES]` on the product pages are deliberate placeholders —
replace them only with figures you can support.

### PDF catalogs
Put files in `assets/documents/` and add a download section where you want it:

```html
<a class="btn btn--dark" href="assets/documents/product-catalog.pdf" download>Download Catalog</a>
```

No catalog section is included yet because no documents were supplied — placeholder PDF links are worse than none.

### Contact form
The form validates in the browser and shows a success message; it does **not** send email on its own.
To make it deliver messages, open `js/contact.js` and replace the body of `sendInquiry()` — the file
contains a ready Formspree example. EmailJS, a custom API, or a PHP endpoint work the same way.

### Map
The map and "Get Directions" button use the supplied location:
`https://maps.app.goo.gl/Dc4WyBbJzJK9bNAt5`. Search for that URL to change it.

## Notes

- Colours, spacing and radii live as CSS variables at the top of `css/style.css`.
- Animations respect `prefers-reduced-motion`.
- Every page has its own title, meta description, canonical link, Open Graph and Twitter tags;
  the home and contact pages carry LocalBusiness JSON-LD and the product pages carry Product JSON-LD.
- Canonical links are relative. When the site gets its own domain, replace them with absolute URLs.
