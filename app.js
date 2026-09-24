/**
 * CinePulse - Interactive Movie Ticket Booking Engine
 * Pure Vanilla JavaScript with LocalStorage Persistence
 */

(function () {
  'use strict';

  // ==========================================================================
  // 1. Movie Catalogue & Seating Configuration
  // ==========================================================================

  const MOVIES = [
    {
      id: 'dune2',
      title: 'Dune: Part Two',
      genre: 'Sci-Fi / Adventure',
      rating: '8.9',
      duration: '2h 46m',
      basePriceINR: 280,
      basePriceUSD: 14,
      accentColor: '#e09f58',
      posterSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%">
        <defs>
          <linearGradient id="duneGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#1e1309"/>
            <stop offset="50%" stop-color="#4a2c11"/>
            <stop offset="100%" stop-color="#e09f58"/>
          </linearGradient>
        </defs>
        <rect width="400" height="300" fill="url(#duneGrad)"/>
        <circle cx="200" cy="180" r="100" fill="#e28743" opacity="0.3"/>
        <path d="M-50,300 Q150,150 450,300 Z" fill="#2b1a0d"/>
        <path d="M-50,300 Q200,200 450,280 Z" fill="#1b0f07"/>
        <text x="50%" y="42%" text-anchor="middle" fill="#fff" font-family="'Outfit', sans-serif" font-weight="800" font-size="28" letter-spacing="4">DUNE: PART TWO</text>
        <text x="50%" y="54%" text-anchor="middle" fill="#fcd34d" font-family="'Space Grotesk', monospace" font-size="14" letter-spacing="2">EXPERIENCE IN IMAX 70MM</text>
      </svg>`
    },
    {
      id: 'oppenheimer',
      title: 'Oppenheimer',
      genre: 'Biography / Drama',
      rating: '8.8',
      duration: '3h 00m',
      basePriceINR: 250,
      basePriceUSD: 13,
      accentColor: '#ea580c',
      posterSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%">
        <defs>
          <radialGradient id="oppGrad" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stop-color="#ff7b00"/>
            <stop offset="40%" stop-color="#9a1b02"/>
            <stop offset="100%" stop-color="#0a0503"/>
          </radialGradient>
        </defs>
        <rect width="400" height="300" fill="url(#oppGrad)"/>
        <circle cx="200" cy="150" r="85" fill="none" stroke="#fed7aa" stroke-width="2" stroke-dasharray="8 6" opacity="0.4"/>
        <circle cx="200" cy="150" r="120" fill="none" stroke="#ea580c" stroke-width="1.5" opacity="0.3"/>
        <text x="50%" y="46%" text-anchor="middle" fill="#fff" font-family="'Outfit', sans-serif" font-weight="800" font-size="28" letter-spacing="5">OPPENHEIMER</text>
        <text x="50%" y="58%" text-anchor="middle" fill="#fdba74" font-family="'Space Grotesk', monospace" font-size="13" letter-spacing="3">A CHRISTOPHER NOLAN MASTERPIECE</text>
      </svg>`
    },
    {
      id: 'spiderman',
      title: 'Spider-Man: Beyond',
      genre: 'Animation / Action',
      rating: '9.0',
      duration: '2h 20m',
      basePriceINR: 220,
      basePriceUSD: 11,
      accentColor: '#ec4899',
      posterSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%">
        <defs>
          <linearGradient id="spiderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#090a1f"/>
            <stop offset="50%" stop-color="#4c0519"/>
            <stop offset="100%" stop-color="#0284c7"/>
          </linearGradient>
        </defs>
        <rect width="400" height="300" fill="url(#spiderGrad)"/>
        <polygon points="50,0 200,300 350,0" fill="rgba(236,72,153,0.18)"/>
        <text x="50%" y="42%" text-anchor="middle" fill="#fff" font-family="'Outfit', sans-serif" font-weight="800" font-size="25" letter-spacing="3">SPIDER-MAN</text>
        <text x="50%" y="54%" text-anchor="middle" fill="#38bdf8" font-family="'Space Grotesk', monospace" font-weight="700" font-size="15" letter-spacing="4">BEYOND THE SPIDER-VERSE</text>
      </svg>`
    },
    {
      id: 'interstellar',
      title: 'Interstellar: IMAX',
      genre: 'Sci-Fi / Drama',
      rating: '8.7',
      duration: '2h 49m',
      basePriceINR: 260,
      basePriceUSD: 13,
      accentColor: '#06b6d4',
      posterSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%">
        <defs>
          <radialGradient id="starGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#0284c7"/>
            <stop offset="60%" stop-color="#082f49"/>
            <stop offset="100%" stop-color="#020617"/>
          </radialGradient>
        </defs>
        <rect width="400" height="300" fill="url(#starGrad)"/>
        <ellipse cx="200" cy="150" rx="130" ry="25" fill="none" stroke="#38bdf8" stroke-width="3" opacity="0.6"/>
        <circle cx="200" cy="150" r="35" fill="#000000" stroke="#7dd3fc" stroke-width="2"/>
        <text x="50%" y="46%" text-anchor="middle" fill="#fff" font-family="'Outfit', sans-serif" font-weight="800" font-size="28" letter-spacing="6">INTERSTELLAR</text>
        <text x="50%" y="58%" text-anchor="middle" fill="#93c5fd" font-family="'Space Grotesk', monospace" font-size="13" letter-spacing="3">10TH ANNIVERSARY SPECIAL</text>
      </svg>`
    }
  ];

  const DATES = [
    { id: 'd1', label: 'Today', dayNum: '24', month: 'Sep' },
    { id: 'd2', label: 'Tomorrow', dayNum: '25', month: 'Sep' },
    { id: 'd3', label: 'Friday', dayNum: '26', month: 'Sep' },
    { id: 'd4', label: 'Saturday', dayNum: '27', month: 'Sep' }
  ];

  const SHOWTIMES = [
    { id: 't1', time: '11:30 AM', format: 'Dolby 7.1' },
    { id: 't2', time: '02:45 PM', format: 'IMAX 3D' },
    { id: 't3', time: '06:15 PM', format: 'Laser 4K' },
    { id: 't4', time: '09:45 PM', format: 'Atmos 4K' }
  ];

  // Seating Matrix Layout: 8 Rows (A-H), 8 Seats per row (4 left, 4 right) = 64 Seats
  const ROWS_CONFIG = [
    { row: 'A', tier: 'vip', name: 'VIP Recliner', multiplier: 1.4 },
    { row: 'B', tier: 'vip', name: 'VIP Recliner', multiplier: 1.4 },
    { row: 'C', tier: 'premium', name: 'Premium', multiplier: 1.2 },
    { row: 'D', tier: 'premium', name: 'Premium', multiplier: 1.2 },
    { row: 'E', tier: 'premium', name: 'Premium', multiplier: 1.2 },
    { row: 'F', tier: 'standard', name: 'Classic', multiplier: 1.0 },
    { row: 'G', tier: 'standard', name: 'Classic', multiplier: 1.0 },
    { row: 'H', tier: 'standard', name: 'Classic', multiplier: 1.0 }
  ];
  const TOTAL_SEATS_COUNT = 64;

  // Preset demo occupied seats for realistic preview on first load
  const DEFAULT_INITIAL_OCCUPIED = {
    'dune2': ['A3', 'A4', 'B5', 'C1', 'C2', 'D4', 'D5', 'D6', 'E7', 'F2', 'F3', 'G5', 'H8'],
    'oppenheimer': ['B3', 'B4', 'C4', 'C5', 'D3', 'D4', 'E5', 'F6', 'G1', 'G2', 'H4', 'H5'],
    'spiderman': ['A1', 'A2', 'C7', 'C8', 'D1', 'D2', 'E4', 'E5', 'F5', 'F6', 'G4', 'G5'],
    'interstellar': ['A5', 'A6', 'B1', 'B2', 'C3', 'C4', 'D5', 'E2', 'E3', 'F4', 'G7', 'H1']
  };

  // ==========================================================================
  // 2. Application State
  // ==========================================================================

  let state = {
    currency: 'INR', // 'INR' or 'USD'
    selectedMovieId: MOVIES[0].id,
    selectedDateId: DATES[0].id,
    selectedTimeId: SHOWTIMES[2].id, // Default: 06:15 PM
    selectedSeats: [], // Array of seat IDs e.g. ['A3', 'A4']
    storageKeyPrefix: 'cinepulse_v1_'
  };

  // ==========================================================================
  // 3. DOM Elements Cache
  // ==========================================================================

  const el = {
    movieCardsTrack: document.getElementById('movieCardsTrack'),
    dateChips: document.getElementById('dateChips'),
    timeChips: document.getElementById('timeChips'),
    seatingGrid: document.getElementById('seatingGrid'),
    statTotalSeats: document.getElementById('statTotalSeats'),
    statAvailableSeats: document.getElementById('statAvailableSeats'),
    statBookedSeats: document.getElementById('statBookedSeats'),
    statSelectedSeats: document.getElementById('statSelectedSeats'),
    availablePercent: document.getElementById('availablePercent'),
    bookedPercent: document.getElementById('bookedPercent'),
    selectedBadge: document.getElementById('selectedBadge'),
    capacityBarFill: document.getElementById('capacityBarFill'),
    capacityStatusText: document.getElementById('capacityStatusText'),
    capacityOccupancy: document.getElementById('capacityOccupancy'),
    checkoutMovieTitle: document.getElementById('checkoutMovieTitle'),
    checkoutShowtimeBadge: document.getElementById('checkoutShowtimeBadge'),
    selectedSeatsPills: document.getElementById('selectedSeatsPills'),
    checkoutTotalPrice: document.getElementById('checkoutTotalPrice'),
    checkoutBtnLabel: document.getElementById('checkoutBtnLabel'),
    bookTicketsBtn: document.getElementById('bookTicketsBtn'),
    resetDemoBtn: document.getElementById('resetDemoBtn'),
    currButtons: document.querySelectorAll('.curr-btn'),
    // Ticket Modal Elements
    ticketModal: document.getElementById('ticketModal'),
    modalCloseBtn: document.getElementById('modalCloseBtn'),
    ticketMovieTitle: document.getElementById('ticketMovieTitle'),
    ticketGenre: document.getElementById('ticketGenre'),
    ticketDuration: document.getElementById('ticketDuration'),
    ticketRating: document.getElementById('ticketRating'),
    ticketDate: document.getElementById('ticketDate'),
    ticketTime: document.getElementById('ticketTime'),
    ticketSeatCount: document.getElementById('ticketSeatCount'),
    ticketSeatList: document.getElementById('ticketSeatList'),
    ticketTotalAmount: document.getElementById('ticketTotalAmount'),
    ticketBookingId: document.getElementById('ticketBookingId'),
    ticketQrCode: document.getElementById('ticketQrCode'),
    printTicketBtn: document.getElementById('printTicketBtn'),
    bookAnotherBtn: document.getElementById('bookAnotherBtn'),
    toastContainer: document.getElementById('toastContainer')
  };

  // ==========================================================================
  // 4. Persistence & LocalStorage Helpers
  // ==========================================================================

  function getSlotStorageKey() {
    return `${state.storageKeyPrefix}${state.selectedMovieId}_${state.selectedDateId}_${state.selectedTimeId}`;
  }

  function getBookedSeatsForCurrentSlot() {
    const key = getSlotStorageKey();
    const stored = localStorage.getItem(key);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error('Failed to parse stored bookings', e);
      }
    }
    // Return default occupied seats or randomized subset
    const defaultList = DEFAULT_INITIAL_OCCUPIED[state.selectedMovieId] || ['C3', 'C4', 'E5', 'F6'];
    localStorage.setItem(key, JSON.stringify(defaultList));
    return defaultList;
  }

  function saveBookedSeatsForCurrentSlot(newBookedSeats) {
    const key = getSlotStorageKey();
    localStorage.setItem(key, JSON.stringify(newBookedSeats));
  }

  // ==========================================================================
  // 5. Price & Currency Formatting Helpers
  // ==========================================================================

  function formatPrice(amountINR, amountUSD) {
    if (state.currency === 'USD') {
      return `$${amountUSD.toFixed(2)}`;
    }
    return `₹${Math.round(amountINR)}`;
  }

  function getSeatPrice(seatId) {
    const rowLetter = seatId.charAt(0);
    const rowConf = ROWS_CONFIG.find(r => r.row === rowLetter) || ROWS_CONFIG[5];
    const movie = MOVIES.find(m => m.id === state.selectedMovieId);

    const priceINR = Math.round(movie.basePriceINR * rowConf.multiplier);
    const priceUSD = parseFloat((movie.basePriceUSD * rowConf.multiplier).toFixed(2));

    return { priceINR, priceUSD };
  }

  function calculateSelectedTotals() {
    let totalINR = 0;
    let totalUSD = 0;

    state.selectedSeats.forEach(seatId => {
      const { priceINR, priceUSD } = getSeatPrice(seatId);
      totalINR += priceINR;
      totalUSD += priceUSD;
    });

    return { totalINR, totalUSD };
  }

  // ==========================================================================
  // 6. UI Renderers
  // ==========================================================================

  // Render Movie Cards
  function renderMovieCards() {
    el.movieCardsTrack.innerHTML = '';
    MOVIES.forEach(movie => {
      const isSelected = movie.id === state.selectedMovieId;
      const card = document.createElement('div');
      card.className = `movie-card ${isSelected ? 'selected' : ''}`;
      card.dataset.movieId = movie.id;

      const formattedPrice = formatPrice(movie.basePriceINR, movie.basePriceUSD);

      // Convert SVG to data URL for poster image
      const posterDataUri = 'data:image/svg+xml;utf8,' + encodeURIComponent(movie.posterSvg);

      card.innerHTML = `
        <div class="movie-poster-box">
          <img src="${posterDataUri}" alt="${movie.title} Poster" class="movie-poster-img" loading="lazy">
          <div class="movie-poster-gradient"></div>
          <div class="movie-rating-badge">★ ${movie.rating}</div>
        </div>
        <div class="movie-info">
          <h3 class="movie-title">${movie.title}</h3>
          <span class="movie-genre">${movie.genre}</span>
          <div class="movie-meta-row">
            <span class="movie-duration">${movie.duration}</span>
            <span class="movie-base-price">from ${formattedPrice}</span>
          </div>
        </div>
      `;

      card.addEventListener('click', () => {
        if (state.selectedMovieId !== movie.id) {
          state.selectedMovieId = movie.id;
          state.selectedSeats = []; // Clear selected seats when changing movie
          renderAll();
          showToast(`Selected: ${movie.title}`);
        }
      });

      el.movieCardsTrack.appendChild(card);
    });
  }

  // Render Date Chips
  function renderDateChips() {
    el.dateChips.innerHTML = '';
    DATES.forEach(date => {
      const isActive = date.id === state.selectedDateId;
      const chip = document.createElement('button');
      chip.className = `date-chip ${isActive ? 'active' : ''}`;
      chip.innerHTML = `
        <strong>${date.dayNum} ${date.month}</strong>
        <span>${date.label}</span>
      `;

      chip.addEventListener('click', () => {
        if (state.selectedDateId !== date.id) {
          state.selectedDateId = date.id;
          state.selectedSeats = [];
          renderAll();
        }
      });

      el.dateChips.appendChild(chip);
    });
  }

  // Render Showtime Chips
  function renderTimeChips() {
    el.timeChips.innerHTML = '';
    SHOWTIMES.forEach(show => {
      const isActive = show.id === state.selectedTimeId;
      const chip = document.createElement('button');
      chip.className = `time-chip ${isActive ? 'active' : ''}`;
      chip.innerHTML = `
        <strong>${show.time}</strong>
        <span>${show.format}</span>
      `;

      chip.addEventListener('click', () => {
        if (state.selectedTimeId !== show.id) {
          state.selectedTimeId = show.id;
          state.selectedSeats = [];
          renderAll();
        }
      });

      el.timeChips.appendChild(chip);
    });
  }

  // Render Seating Grid
  function renderSeatingGrid() {
    el.seatingGrid.innerHTML = '';
    const bookedSeats = getBookedSeatsForCurrentSlot();

    ROWS_CONFIG.forEach(rowConf => {
      const rowDiv = document.createElement('div');
      rowDiv.className = 'seat-row';

      // Left Row Label
      const leftLabel = document.createElement('span');
      leftLabel.className = 'row-label';
      leftLabel.textContent = rowConf.row;
      rowDiv.appendChild(leftLabel);

      // Left 4 seats
      const leftGroup = document.createElement('div');
      leftGroup.className = 'seats-subgroup';
      for (let num = 1; num <= 4; num++) {
        const seatId = `${rowConf.row}${num}`;
        leftGroup.appendChild(createSeatElement(seatId, rowConf, bookedSeats));
      }
      rowDiv.appendChild(leftGroup);

      // Center Aisle Gap
      const aisle = document.createElement('div');
      aisle.className = 'aisle-gap';
      rowDiv.appendChild(aisle);

      // Right 4 seats
      const rightGroup = document.createElement('div');
      rightGroup.className = 'seats-subgroup';
      for (let num = 5; num <= 8; num++) {
        const seatId = `${rowConf.row}${num}`;
        rightGroup.appendChild(createSeatElement(seatId, rowConf, bookedSeats));
      }
      rowDiv.appendChild(rightGroup);

      // Right Row Label
      const rightLabel = document.createElement('span');
      rightLabel.className = 'row-label';
      rightLabel.textContent = rowConf.row;
      rowDiv.appendChild(rightLabel);

      el.seatingGrid.appendChild(rowDiv);
    });
  }

  function createSeatElement(seatId, rowConf, bookedSeats) {
    const seat = document.createElement('div');
    const isOccupied = bookedSeats.includes(seatId);
    const isSelected = state.selectedSeats.includes(seatId);

    seat.className = `seat ${rowConf.tier}`;
    if (isOccupied) seat.classList.add('occupied');
    if (isSelected) seat.classList.add('selected');

    seat.dataset.seatId = seatId;
    seat.setAttribute('title', `${seatId} (${rowConf.name})`);
    seat.textContent = seatId;

    seat.addEventListener('click', () => {
      handleSeatClick(seatId, isOccupied);
    });

    return seat;
  }

  // Handle Seat Click Toggle
  function handleSeatClick(seatId, isOccupied) {
    if (isOccupied) {
      showToast(`Seat ${seatId} is already booked! Please pick an available seat.`, 'error');
      return;
    }

    const index = state.selectedSeats.indexOf(seatId);
    if (index > -1) {
      state.selectedSeats.splice(index, 1);
    } else {
      if (state.selectedSeats.length >= 8) {
        showToast('Maximum 8 seats allowed per booking.', 'warning');
        return;
      }
      state.selectedSeats.push(seatId);
    }

    // Sort selected seats alphabetically
    state.selectedSeats.sort((a, b) => {
      if (a[0] === b[0]) return parseInt(a.slice(1)) - parseInt(b.slice(1));
      return a.localeCompare(b);
    });

    renderSeatingGrid();
    updateLiveMetrics();
    updateCheckoutBar();
  }

  // ==========================================================================
  // 7. Real-Time Seat Statistics & Metrics Dashboard
  // ==========================================================================

  function updateLiveMetrics() {
    const bookedSeats = getBookedSeatsForCurrentSlot();
    const bookedCount = bookedSeats.length;
    const selectedCount = state.selectedSeats.length;
    // Available seats = Total - Booked - Selected
    const availableCount = TOTAL_SEATS_COUNT - bookedCount - selectedCount;

    // Numerical counters
    el.statTotalSeats.textContent = TOTAL_SEATS_COUNT;
    el.statAvailableSeats.textContent = availableCount;
    el.statBookedSeats.textContent = bookedCount;
    el.statSelectedSeats.textContent = selectedCount;

    // Percentages
    const availablePercentage = Math.round((availableCount / TOTAL_SEATS_COUNT) * 100);
    const bookedPercentage = Math.round((bookedCount / TOTAL_SEATS_COUNT) * 100);
    const totalOccupiedPct = Math.round(((bookedCount + selectedCount) / TOTAL_SEATS_COUNT) * 100);

    el.availablePercent.textContent = `${availablePercentage}%`;
    el.bookedPercent.textContent = `${bookedPercentage}%`;
    el.selectedBadge.textContent = selectedCount === 1 ? '1 Seat' : `${selectedCount} Seats`;

    // Progress Bar Fill
    el.capacityBarFill.style.width = `${totalOccupiedPct}%`;
    el.capacityOccupancy.textContent = `Occupancy: ${totalOccupiedPct}% (${bookedCount + selectedCount}/${TOTAL_SEATS_COUNT})`;
    el.capacityStatusText.textContent = `⚡ ${availableCount} seats remaining for this show`;
  }

  // Update Bottom Checkout Bar
  function updateCheckoutBar() {
    const movie = MOVIES.find(m => m.id === state.selectedMovieId);
    const date = DATES.find(d => d.id === state.selectedDateId);
    const time = SHOWTIMES.find(t => t.id === state.selectedTimeId);

    el.checkoutMovieTitle.textContent = movie.title;
    el.checkoutShowtimeBadge.textContent = `${date.label} (${date.dayNum} ${date.month}) | ${time.time}`;

    // Selected Seats Pills
    el.selectedSeatsPills.innerHTML = '';
    if (state.selectedSeats.length === 0) {
      el.selectedSeatsPills.innerHTML = '<span class="no-selection-hint">No seats selected yet. Click any available seat above!</span>';
      el.checkoutTotalPrice.textContent = state.currency === 'USD' ? '$0.00' : '₹0';
      el.bookTicketsBtn.disabled = true;
      el.checkoutBtnLabel.textContent = 'Select Seats';
    } else {
      state.selectedSeats.forEach(seatId => {
        const pill = document.createElement('span');
        pill.className = 'seat-pill';
        pill.innerHTML = `🪑 ${seatId}`;
        el.selectedSeatsPills.appendChild(pill);
      });

      const { totalINR, totalUSD } = calculateSelectedTotals();
      el.checkoutTotalPrice.textContent = formatPrice(totalINR, totalUSD);
      el.bookTicketsBtn.disabled = false;
      const count = state.selectedSeats.length;
      el.checkoutBtnLabel.textContent = `Confirm Booking (${count} ${count === 1 ? 'Ticket' : 'Tickets'})`;
    }
  }

  // ==========================================================================
  // 8. Booking Confirmation & Digital Ticket Modal
  // ==========================================================================

  function generateQrSvg(codeString) {
    // Generate an authentic procedural SVG QR-code matrix
    let rects = '';
    const matrixSize = 21;
    const cellSize = 100 / matrixSize;

    // Deterministic pseudo-random seed from string
    let hash = 0;
    for (let i = 0; i < codeString.length; i++) {
      hash = (hash << 5) - hash + codeString.charCodeAt(i);
      hash |= 0;
    }

    for (let r = 0; r < matrixSize; r++) {
      for (let c = 0; c < matrixSize; c++) {
        // Standard QR Finder Corners
        const isCornerTopLeft = (r < 7 && c < 7);
        const isCornerTopRight = (r < 7 && c >= matrixSize - 7);
        const isCornerBottomLeft = (r >= matrixSize - 7 && c < 7);

        let isDark = false;
        if (isCornerTopLeft || isCornerTopRight || isCornerBottomLeft) {
          const inBorder = (r === 0 || r === 6 || c === 0 || c === 6 ||
            (isCornerTopRight && (c === matrixSize - 7 || c === matrixSize - 1)) ||
            (isCornerBottomLeft && (r === matrixSize - 7 || r === matrixSize - 1)));
          const inCenter = ((r >= 2 && r <= 4) && (c >= 2 && c <= 4 ||
            (isCornerTopRight && c >= matrixSize - 5 && c <= matrixSize - 3) ||
            (isCornerBottomLeft && c >= 2 && c <= 4)));
          isDark = inBorder || inCenter;
        } else {
          // Body pattern
          isDark = ((hash ^ (r * 17 + c * 31)) % 3) === 0;
        }

        if (isDark) {
          rects += `<rect x="${(c * cellSize).toFixed(2)}" y="${(r * cellSize).toFixed(2)}" width="${cellSize.toFixed(2)}" height="${cellSize.toFixed(2)}" fill="#111827"/>`;
        }
      }
    }

    return rects;
  }

  function handleBookingSubmission() {
    if (state.selectedSeats.length === 0) return;

    const movie = MOVIES.find(m => m.id === state.selectedMovieId);
    const date = DATES.find(d => d.id === state.selectedDateId);
    const time = SHOWTIMES.find(t => t.id === state.selectedTimeId);
    const bookedSeats = getBookedSeatsForCurrentSlot();

    // Check if any selected seat was somehow booked
    const conflict = state.selectedSeats.some(s => bookedSeats.includes(s));
    if (conflict) {
      showToast('One or more selected seats were just taken. Refreshing...', 'error');
      state.selectedSeats = [];
      renderAll();
      return;
    }

    // Generate Booking Reference ID
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    const bookingId = `CP-${randomNum}`;

    // Populate Modal
    el.ticketMovieTitle.textContent = movie.title;
    el.ticketGenre.textContent = movie.genre;
    el.ticketDuration.textContent = movie.duration;
    el.ticketRating.textContent = `⭐ ${movie.rating}`;
    el.ticketDate.textContent = `${date.label}, ${date.dayNum} ${date.month}`;
    el.ticketTime.textContent = time.time;
    el.ticketSeatCount.textContent = state.selectedSeats.length;
    el.ticketSeatList.textContent = state.selectedSeats.join(', ');

    const { totalINR, totalUSD } = calculateSelectedTotals();
    el.ticketTotalAmount.textContent = formatPrice(totalINR, totalUSD);
    el.ticketBookingId.textContent = bookingId;

    // Render Dynamic QR Code
    el.ticketQrCode.innerHTML = generateQrSvg(bookingId);

    // Save newly booked seats to slot persistence
    const updatedBooked = [...bookedSeats, ...state.selectedSeats];
    saveBookedSeatsForCurrentSlot(updatedBooked);

    // Show modal
    el.ticketModal.classList.add('active');
    el.ticketModal.setAttribute('aria-hidden', 'false');

    // Trigger celebration toast
    showToast(`🎉 Success! Booked ${state.selectedSeats.length} ticket(s) for ${movie.title}`);

    // Clear selection in background
    state.selectedSeats = [];
    renderSeatingGrid();
    updateLiveMetrics();
    updateCheckoutBar();
  }

  function closeTicketModal() {
    el.ticketModal.classList.remove('active');
    el.ticketModal.setAttribute('aria-hidden', 'true');
  }

  // Toast Notification System
  function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = 'toast';
    let icon = 'ℹ️';
    if (type === 'error') icon = '⚠️';
    if (type === 'warning') icon = '🔔';
    if (message.includes('🎉')) icon = '🎟️';

    toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
    el.toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(-10px)';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  // ==========================================================================
  // 9. Reset Demo Data & Currency Listeners
  // ==========================================================================

  function resetDemoData() {
    if (confirm('Reset all cinema bookings to default demo state?')) {
      // Remove all cinepulse keys
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith(state.storageKeyPrefix)) {
          localStorage.removeItem(key);
        }
      });
      state.selectedSeats = [];
      renderAll();
      showToast('Demo data restored! All showtimes reset to initial availability.');
    }
  }

  function initCurrencySwitch() {
    el.currButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        el.currButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.currency = btn.dataset.currency;
        renderMovieCards();
        updateCheckoutBar();
        showToast(`Currency switched to ${state.currency}`);
      });
    });
  }

  // ==========================================================================
  // 10. Initialization & Event Bindings
  // ==========================================================================

  function renderAll() {
    renderMovieCards();
    renderDateChips();
    renderTimeChips();
    renderSeatingGrid();
    updateLiveMetrics();
    updateCheckoutBar();
  }

  function init() {
    initCurrencySwitch();
    renderAll();

    // Booking CTA
    el.bookTicketsBtn.addEventListener('click', handleBookingSubmission);

    // Modal Events
    el.modalCloseBtn.addEventListener('click', closeTicketModal);
    el.bookAnotherBtn.addEventListener('click', closeTicketModal);
    el.ticketModal.addEventListener('click', (e) => {
      if (e.target === el.ticketModal) closeTicketModal();
    });

    // Print Ticket
    el.printTicketBtn.addEventListener('click', () => {
      window.print();
    });

    // Reset Demo
    el.resetDemoBtn.addEventListener('click', resetDemoData);

    // Keyboard accessibility: Escape to close modal
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && el.ticketModal.classList.contains('active')) {
        closeTicketModal();
      }
    });
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
