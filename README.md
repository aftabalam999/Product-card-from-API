# Product Cards (Dummy User Card)

A small front-end page that pulls product data from the Fake Store API and renders responsive cards with category filtering, price sorting, and simple pagination.

## Features

- Fetches live products from `https://fakestoreapi.com/products`
- Category filter plus price sort (low→high, high→low)
- Pagination (4 items per page) with prev/next and page numbers
- Responsive card layout with hover effects and lazy-loaded images

## Quick Start

1. Open `index.html` in a browser (or use a local server such as VS Code Live Server) from the `Dummy-User-Card` directory.
2. Wait for products to load; use the category dropdown and sort selector to refine results.

## Files

- `index.html` — markup with filter controls and containers
- `style.css` — layout, card styling, and pagination styles
- `app.js` — fetches products, applies filtering/sorting, and renders pagination

## Notes

- Requires network access to reach Fake Store API.
- Adjust `itemPerPage` in `app.js` if you want more or fewer items per page.
