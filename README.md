# Arcade Zone

A modern multi-game website for playing classic browser games with friends — complete with a shared leaderboard powered by Firebase Firestore.

---

## Background

Built as a free, no-server-required game hub that a group of friends can all access, play, and compete on. The design is clean and modern with per-game accent colors, glass-morphism cards, and Lucide icons. Every decision favors simplicity: no build tools, no npm, no frameworks — just HTML, CSS, and vanilla JavaScript that deploys directly to GitHub Pages.

The shared leaderboard uses Firebase Firestore's free tier so scores persist across devices and sessions without any backend infrastructure.

---

## Features

- **6 fully playable games** built on the HTML5 Canvas API
- **Shared leaderboard** — scores sync across all players via Firebase
- **Modern clean UI** — dark theme with per-game accent colors, glass-morphism cards, Lucide icons
- **Username persistence** — name saved to `localStorage` so you only type it once
- **Mobile-friendly** — touch controls and D-pad overlays on all games
- **Real sprite assets** — CC0-licensed pixel art sprites (runner character, spinning coin)
- **Zero cost** — GitHub Pages (hosting) + Firebase free tier (database)

---

## The 6 Games

| Game | Description | Controls |
|------|-------------|----------|
| **Snake** | Grow the snake by eating food, avoid walls and yourself | Arrows / WASD |
| **Breakout** | Bounce a ball to destroy all bricks before they respawn | Mouse / Touch |
| **Temple Run** | Lane-switching 3D runner — collect coins, dodge obstacles, don't stop | Arrows / Swipe |
| **Tetris** | Classic falling tetrominoes — clear lines, level up | Arrows + Space (hard drop) |
| **Space Shooter** | Space Invaders-style — survive enemy waves | Arrows + Space to fire |
| **Pac-Man** | Eat all dots, avoid ghosts, use power pellets to fight back | Arrows / WASD |

---

## Architecture

| Layer | Choice | Reason |
|-------|--------|--------|
| Hosting | GitHub Pages | Free, zero config, HTTPS |
| Database | Firebase Firestore | Free tier, real-time, no server needed |
| Font | Outfit (Google Fonts CDN) | Clean modern type, 400–800 weight range |
| Icons | Lucide (CDN) | Consistent SVG icon set, tree-shakeable |
| Styling | Vanilla CSS + custom properties | No build step, full design token control |
| Logic | Vanilla JavaScript (ES Modules) | Works directly in browser, no bundler |

---

## File Structure

```
/
├── index.html                  ← Landing page (game grid + leaderboard)
├── README.md
├── css/
│   └── style.css               ← Global theme (design tokens, layout, modal, HUD)
├── js/
│   ├── firebase-config.js      ← Firebase app init (fill in your config here)
│   └── leaderboard.js          ← submitScore() / getTopScores() / getHiScore()
├── assets/
│   ├── runner-sheet.png        ← CC0 runner sprite sheet (256×96, 8 frames/row)
│   └── coin_sprite.png         ← CC0 spinning coin strip (64×12, 4 frames)
└── games/
    ├── snake/index.html
    ├── breakout/index.html
    ├── runner/index.html        ← Temple Run-style lane switcher
    ├── tetris/index.html
    ├── space-shooter/index.html
    └── pacman/index.html
```

---

## Visual Design

### Color Palette

| Name | Hex | Used for |
|------|-----|----------|
| Background | `#0d0d14` | Page background |
| Surface | `#161624` | Cards, panels |
| Snake green | `#22c55e` | Snake game accent |
| Breakout blue | `#38bdf8` | Breakout game accent |
| Runner amber | `#f59e0b` | Temple Run game accent |
| Tetris purple | `#a855f7` | Tetris game accent |
| Space indigo | `#6366f1` | Space Shooter game accent |
| Pac-Man yellow | `#eab308` | Pac-Man game accent |

### Design System
- **Glass-morphism cards** — `backdrop-filter: blur`, per-game `--card-color` and `--card-glow` CSS vars
- **Lucide icons** — `arrow-left` (nav back), `gamepad-2` (logo), `grid-2x2` (games section), `trophy` (leaderboard)
- **HUD system** — `.game-hud` bar with `.hud-label` / `.hud-val` pairs per game
- **Modal system** — `.modal-overlay` + `.modal-box` for game-over score submission
- **`<kbd>` tags** — styled control hints on every game page

---

## Setup

### 1. Firebase (required for leaderboard)

1. Go to [console.firebase.google.com](https://console.firebase.google.com)
2. Create a new project
3. Add a **Web app** (the `</>` icon) — no Firebase Hosting needed
4. Copy the `firebaseConfig` object shown and paste it into `js/firebase-config.js`
5. In the Firebase console: **Build → Firestore Database → Create database → Start in test mode**

```js
// js/firebase-config.js
const firebaseConfig = {
  apiKey:            "YOUR_API_KEY",
  authDomain:        "YOUR_PROJECT_ID.firebaseapp.com",
  projectId:         "YOUR_PROJECT_ID",
  storageBucket:     "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId:             "YOUR_APP_ID"
};
```

> **Firestore free tier limits:** 50,000 reads/day · 20,000 writes/day · 1 GB storage — more than enough for a group of friends.

### 2. GitHub Pages

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/arcade
git push -u origin main
```

Then in GitHub: **Settings → Pages → Source: `main` / `(root)`**

Your site will be live at: `https://YOUR_USERNAME.github.io/arcade`

> Firebase requires HTTPS, which GitHub Pages provides automatically.

### 3. Local Testing

Run a local server from the project root (required for ES module imports):

```bash
python -m http.server 8080
```

Then open `http://localhost:8080`. Games work offline. The leaderboard requires a configured Firebase project.

---

## Firestore Data Model

**Collection:** `scores`

```json
{
  "game":      "snake",
  "player":    "Alice",
  "score":     12400,
  "timestamp": "<server timestamp>"
}
```

- `game` is one of: `snake`, `breakout`, `runner`, `tetris`, `space-shooter`, `pacman`
- `player` is capped at 12 characters
- The leaderboard queries top 5 per game, ordered by `score` descending

---

## Leaderboard API

```js
import { submitScore, getTopScores, getHiScore } from './js/leaderboard.js';

// Submit a score after game over
await submitScore('snake', 'Alice', 12400);

// Get top 5 scores for a game
const scores = await getTopScores('tetris', 5);
// → [{ player: 'Bob', score: 9800 }, ...]

// Get single highest score (for game card display)
const hi = await getHiScore('breakout');
// → { player: 'Alice', score: 14200 }
```

---

## Changelog

### v1.1.0 — 2026-03-15

**Modern UI redesign + Temple Run game + Pac-Man fixes**

- **UI overhaul** — switched from retro CRT aesthetic to modern dark UI with glass-morphism cards, per-game accent colors, and Lucide icons throughout
- **Temple Run** — replaced Endless Runner with a 3-lane perspective runner: lane switching, coin collection with CC0 sprite (4-frame spinning coin strip), obstacles (blocks / barriers / walls), double jump, swipe support, progressive speed ramp
- **Real sprites** — CC0-licensed `runner-sheet.png` (256×96, 8-frame run cycle + jump frames) and `coin_sprite.png` (64×12 strip) loaded from `assets/`; canvas fallback if not found
- **Pac-Man fixed** — complete rewrite: tile-based discrete movement (no floating-point drift), redesigned 20×22 maze with type-5 ghost door, proper ghost state machine (`INSIDE → EXITING → ROAM → FRIGHT → DEAD`) with scripted exit path
- **Lucide icons** — added to landing page and all 6 game pages (`arrow-left` back nav, `gamepad-2` logo, `grid-2x2` section header, `trophy` leaderboard)
- **Font** — switched from Press Start 2P to Outfit (400–800 weight) for clean modern readability

### v1.0.0 — 2026-03-15

**Initial release — full site built from scratch**

- `index.html` — landing page with 6 game cards and tabbed leaderboard
- `css/style.css` — global design system with CSS custom properties
- `js/firebase-config.js` — Firebase v10 modular SDK init
- `js/leaderboard.js` — `submitScore`, `getTopScores`, `getHiScore`, `getSavedPlayerName`, `savePlayerName`
- **Snake** — grid-based movement, multi-level speed scaling, death flash, leaderboard integration
- **Breakout** — physics-based angle control from paddle hit position, 6 brick row colors, multi-level brick refresh, mouse + touch support
- **Endless Runner** — scrolling obstacles, double jump, progressive speed ramp (later replaced by Temple Run)
- **Tetris** — all 7 tetrominoes, ghost piece, wall kick rotation, hard drop, soft drop scoring, next-piece preview
- **Space Shooter** — Space Invaders grid enemies with wave progression, enemy bullets, explosion particles, invincibility frames, touch fire button
- **Pac-Man** — full 20×22 maze, 4 ghosts with directional AI, power pellet frightened mode with flash warning, tunnel wrap, mobile D-pad
