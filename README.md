# 🎬 CinePulse - Interactive Movie Ticket Booking Mini Project

A modern, responsive, and feature-packed **Movie Ticket Booking Web Application** built with pure HTML5, CSS3, and Vanilla JavaScript.

---

## 🚀 Quick Start

### Option 1: Run with Dev Server (Active)
The development server is already running! You can access it anytime at:
👉 **[http://localhost:3000](http://localhost:3000)**

To run it again later:
```bash
npm run dev
```

### Option 2: Open Directly (Zero Server Required)
You can simply double-click **`index.html`** in File Explorer or open it in any browser (Chrome, Edge, Firefox, Safari).

---

## ✨ Features Built For You

### 1. 📊 Real-Time Live Seat Availability & Remaining Ticket Counters
- **Total Capacity:** Tracks all 64 seats in the theater.
- **Available Seats Counter:** Live updates showing exactly how many seats are open for booking.
- **Tickets Booked Counter:** Displays how many seats are already occupied by other customers.
- **Selected Seats Counter:** Dynamically shows your current selection (`A3`, `A4`, etc.) and counts.
- **Live Occupancy Progress Bar:** Visual color gradient showing current auditorium occupancy percentage and remaining seats.

### 2. 🪑 3D Curved Cinema Theater Seating Grid
- **Curved illuminated screen** with realistic ambient movie lighting and perspective.
- **Tiered Seating:**
  - **VIP Recliners** (Rows A & B - Gold Accent)
  - **Premium** (Rows C, D & E - Cyan Accent)
  - **Classic / Standard** (Rows F, G & H - Indigo Accent)
- **Interactive Seat States:**
  - 🟢 **Available:** Click to select.
  - ✨ **Selected:** Vibrant green glow with bounce micro-animation.
  - 🔴 **Booked / Occupied:** Locked out and cannot be re-booked.

### 3. 🎥 Multi-Movie & Showtime Switcher
- Choose between blockbusters:
  - *Dune: Part Two*
  - *Oppenheimer*
  - *Spider-Man: Beyond the Spider-Verse*
  - *Interstellar (10th Anniversary IMAX)*
- **Independent Seat Memory:** Each combination of movie, date, and showtime maintains its own booked seats in browser `localStorage`!

### 4. 💱 Currency Switcher
- Toggle between **₹ INR** and **$ USD** instantly.

### 5. 🎟️ Digital Boarding-Pass Ticket Generator
- Clicking **"Confirm Booking"** generates an authentic digital cinema ticket stub complete with:
  - Cinema & Screen details (Audi 1, 4K Dolby)
  - Movie title, genre, runtime, and rating
  - Selected seat list and total price
  - Dynamic procedural **SVG QR Code**
  - Unique **Booking Reference ID** (e.g. `CP-834912`)
  - **Print / Download** button formatted specifically for printing or PDF saving.

---

## 📁 Project Structure

```
ram project/
├── index.html       # Semantic HTML5 layout and modal structure
├── style.css        # Cinematic dark theme, glassmorphism, animations & print styles
├── app.js           # State management, seating matrix, live calculations & ticket generator
├── package.json     # Project config and dev server scripts
└── README.md        # Documentation and guide
```
