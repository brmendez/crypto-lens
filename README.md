
# CryptoLens
🔗 **Live Demo:** https://crypto-lens.onrender.com/

CryptoLens is a minimal, real-time cryptocurrency market tracker built with Vite, React, and TypeScript. It fetches live market data from CoinGecko and displays key metrics for top coins in a clean, theme-switchable interface.

## Features

- **Live Market Data:** Fetches up-to-date prices and 24h changes for major cryptocurrencies using the CoinGecko API.
- **Coin Search:** Search for any coin by name or symbol. Results are debounced and cached in memory. Selecting a coin filters the view to that coin and syncs the selection to the URL (`?coin=<id>`), so deep links and the browser back button work.
- **Theme Toggle:** Switch between light and dark modes. Theme preference is saved in localStorage.
- **TypeScript & React:** Built with modern React and TypeScript for reliability and maintainability.
- **Vite Powered:** Fast development and build times with Vite.

## Getting Started

### Prerequisites
- Node.js (v18 or newer recommended)
- npm or yarn

### Installation

```bash
# Clone the repository
$ git clone https://github.com/your-username/crypto-lens.git
$ cd crypto-lens

# Install dependencies
$ npm install
# or
yarn install
```

### Running Locally

```bash
# Start the development server
$ npm run dev
# or
yarn dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser to view the app.

## Project Structure

Feature-based architecture — each feature owns its components, hooks, types, and context.

```
crypto-lens/
├── public/
├── src/
│   ├── api/
│   │   └── fetchJson.ts            # Base fetch utility
│   ├── components/
│   │   ├── CryptoTracker.tsx       # App shell; coordinates list and search views
│   │   └── ThemeContext.tsx
│   ├── features/
│   │   ├── coinList/               # Market list feature
│   │   │   ├── coinList.types.ts
│   │   │   ├── components/
│   │   │   │   ├── CoinListItem.tsx
│   │   │   │   └── LoadingSkeleton.tsx
│   │   │   └── hooks/
│   │   │       └── useFetchMarketData.ts
│   │   └── search/                 # Search feature
│   │       ├── search.types.ts
│   │       ├── context/
│   │       │   └── search.context.tsx
│   │       ├── components/
│   │       │   ├── SearchBar.tsx
│   │       │   └── SearchDropdown.tsx
│   │       └── hooks/
│   │           ├── useCoinSearch.ts
│   │           └── useFetchSingleCoin.ts
│   ├── lib/
│   │   ├── analytics.ts            # Typed trackEvent wrapper around window.gtag
│   │   └── constants.ts
│   ├── shared/
│   │   └── components/
│   │       └── icons.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Analytics

Events are fired via the typed `trackEvent` utility in `src/lib/analytics.ts`, which wraps `window.gtag?.()` loaded by Google Tag Manager. Optional chaining ensures no throws if the GTM script hasn't initialized.

| Event | Fires when | Key params |
|---|---|---|
| `search_results_returned` | Debounced query returns ≥1 coins (network only — cache hits excluded) | `query`, `result_count` |
| `search_no_results` | Debounced query returns an empty result set | `query` |
| `search_coin_selected` | User selects a coin from the dropdown | `coin_id`, `query`, `selection_method` |
| `search_cleared` | User dismisses the search | `query`, `had_active_coin`, `clear_method` |
| `crypto_data_refresh` | User manually refreshes market data | `had_error`, `was_loading` |
| `theme_toggle` | User switches light/dark theme | `theme` |

Add new events by extending `AnalyticsEventMap` in `src/lib/analytics.ts`.

## API Reference

- [CoinGecko Markets API](https://www.coingecko.com/en/api/documentation)

## Customization

### Changing the Coin List
To change which coins are fetched by default, update the API URL in `src/features/coinList/hooks/useFetchMarketData.ts`.

### Styling
Component styles use CSS Modules colocated with each component (e.g. `SearchBar.module.css` next to `SearchBar.tsx`). Design tokens (colors, spacing) are defined as CSS custom properties in `src/index.css` and `src/components/styles/theme.module.css`.

## License

This project is MIT licensed.

---

*CryptoLens: Fast, simple, and open-source crypto market tracking.*
```
