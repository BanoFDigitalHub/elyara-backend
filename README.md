# MINIMAL LUXE — Backend + Admin Panel

Complete Node.js + Express + MongoDB backend for your fashion e-commerce site with full admin panel.

## 🚀 Setup

```bash
# 1. Install dependencies
npm install

# 2. Make sure .env file is configured (it already is)
# 3. Seed the admin user (first time only)
npm run seed

# 4. Start the server
npm start
# OR for development with auto-reload:
npm run dev
```

## 📂 Access

- **API base:** http://localhost:5000/api
- **Admin panel:** http://localhost:5000/admin
- **Uploaded images:** http://localhost:5000/uploads/filename.jpg

### Admin Login
- Email: `admin@minimalluxe.com`
- Password: `Admin@123`

---

## 📁 Project Structure

```
minimal-luxe-backend/
├── config/db.js               # MongoDB connection
├── models/
│   ├── User.js                # Admin user
│   ├── Product.js             # Product schema (full)
│   ├── Order.js               # Orders
│   └── Settings.js            # Site settings (hero, For Her, etc)
├── controllers/               # Business logic
├── routes/                    # Express routes
├── middleware/                # Auth, errors, multer upload
├── utils/                     # Slug generator, JWT, admin seeder
├── admin/                     # Admin panel (HTML + JS)
│   ├── index.html             # Login
│   ├── dashboard.html         # Main admin UI
│   └── app.js                 # All admin logic
├── uploads/                   # Uploaded product images
├── .env                       # Environment variables
├── server.js                  # Main server
└── package.json
```

---

## 🌐 API Endpoints

### Public
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | List products (with pagination, filter, sort) |
| GET | `/api/products/slug/:slug` | Get product by slug |
| GET | `/api/products/:id` | Get product by ID |
| GET | `/api/products/categories/list` | Get distinct categories |
| GET | `/api/settings` | Get site settings |
| GET | `/api/forher` | Get For Her section data |
| GET | `/api/settings/category-hero/:category` | Get category hero data |
| POST | `/api/orders` | Create a customer order |
| POST | `/api/auth/login` | Admin login |

### Admin (require Bearer token)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products/admin/all` | All products (incl. inactive) |
| POST | `/api/products` | Create product |
| PUT | `/api/products/:id` | Update product |
| DELETE | `/api/products/:id` | Delete product |
| PATCH | `/api/products/:id/toggle` | Toggle active status |
| GET | `/api/orders` | All orders |
| PATCH | `/api/orders/:id/status` | Update order status |
| GET | `/api/orders/stats/dashboard` | Dashboard stats |
| PUT | `/api/settings` | Update settings |
| POST | `/api/upload/single` | Upload single image |
| POST | `/api/upload/multiple` | Upload multiple images |

### Product query params
- `?page=1&limit=12`
- `?sort=-createdAt` (newest) / `sort=pricePKR` (cheap first)
- `?category=New Arrival` (exact match)
- `?search=kurta`
- `?featured=true`

---

## 🔑 Slug Generation

When a product is created, a slug is auto-generated in format:
```
productname-XXXXX
```
Example: `"Embroidered Kurta"` → `embroidered-kurta-54821`

Full link (used for sharing / productLink field):
```
https://minimalluxe.com/product/embroidered-kurta-54821
```

Change `DOMAIN` in `.env` for production.

---

## 🎛️ Admin Panel Features

### Dashboard
- Total orders, pending orders, revenue
- Recent orders table
- Product counts

### Products
- **Add Product** with ALL fields:
  - Name → slug auto-generated
  - Category, fabric, SKU
  - Prices in **PKR / USD / EUR / GBP** (with discount variants for each)
  - Sizes (comma-separated)
  - **Size Chart Builder** — admin builds custom table, adds/removes rows & columns
  - **Dupatta toggle** — checkbox + optional separate pricing in all 4 currencies
  - **Main image**: URL OR upload (both supported)
  - **Variant images**: URL OR upload (multiple with optional color label)
  - Description + **Additional Details** (key-value pairs)
  - **Reviews** — add customer name, star rating, comment
  - Active toggle, Featured toggle, stock
- Edit, delete, toggle active
- Copy product link button
- Search

### Orders
- See all orders with customer info
- **WhatsApp button** — clicks opens chat with customer with auto-filled message using their number from the order
- Change status via dropdown (pending → delivered)
- View full order details
- Delete

### Home Page
- Hero image, heading, button text, button link

### For Her Section
- Main big image
- 4 slots (image, title, product slug link, prices in 4 currencies)

### Shop By Category (home grid)
- Add/remove category cards with image, display name, and category link

### Category Heroes
- For each category page (e.g. New Arrival), set hero image, label, subtitle, and thumbnail

### Announcement Bar
- Desktop text + mobile marquee text

### Contact Info
- WhatsApp, phone, email, address, social links

---

## 🖼️ Image Upload

All images support BOTH options:
1. **Paste URL** (e.g. from Pinterest, unsplash) — saved as-is
2. **Upload file** — saved to `/uploads` folder, returns full URL

Works in every image field throughout admin panel.

---

## 🔗 Connecting the Frontend

Your existing frontend files (`index.html`, `productdetail.html`, category page) already point to `http://localhost:5000/api` and will work immediately after starting this backend.

The API responses match the exact shape your frontend expects:
- Products have `slug`, `mainImage`, `pricePKR`, `discountPricePKR`, `priceUSD`, etc.
- Settings has `heroImage`, `heroHeading`, `announcementText`, etc.
- For Her has `mainImage`, `slot1`–`slot4`.

---

## 🛠️ Production Tips

1. Change `JWT_SECRET` to a long random string
2. Set `DOMAIN` to your real domain (https://yoursite.com)
3. Use a CDN or cloud storage (Cloudinary, S3) for uploaded images in production
4. Add rate limiting (express-rate-limit)
5. Use HTTPS

---

## 📞 Support

Ubaida — if tumhe koi issue aaye ya extra features chahiye toh bata dena.
