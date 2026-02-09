
# CryptoLens
🔗 **Live Demo:** https://crypto-lens.onrender.com/

CryptoLens is a minimal, real-time cryptocurrency market tracker built with Vite, React, and TypeScript. It fetches live market data from CoinGecko and displays key metrics for top coins in a clean, theme-switchable interface.

## Features

- **Live Market Data:** Fetches up-to-date prices and 24h changes for major cryptocurrencies using the CoinGecko API.
- **Minimal UI:** No icons, images, or extra styling—just the essentials for fast, distraction-free tracking.
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

```
crypto-lens/
├── public/
├── src/
│   ├── components/
│   │   ├── CoinListItem.tsx
│   │   ├── CryptoTracker.tsx
│   │   ├── fetchCoinGeckoMarkets.ts
│   │   ├── LoadingSkeleton.tsx
│   │   ├── ThemeContext.tsx
│   │   ├── types.ts
│   │   └── styles/
│   │       ├── CoinCard.module.css
│   │       ├── CryptoTracker.module.css
│   │       ├── LoadingSkeleton.module.css
│   │       └── theme.module.css
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## API Reference

- [CoinGecko Markets API](https://www.coingecko.com/en/api/documentation)

## Customization

### Adding More Coins
To add more coins or change the data source, update the API URL in `src/components/fetchCoinGeckoMarkets.ts`.

### Styling
Component styles are organized using CSS Modules in `src/components/styles/`:
- `theme.module.css` - Shared theme variables and color palette
- Component-specific `.module.css` files are colocated with their components
- Global styles (resets, fonts, base elements) are in `src/index.css`

To customize colors or theme, edit the CSS variables in `src/components/styles/theme.module.css`.

## License

This project is MIT licensed.

---

*CryptoLens: Fast, simple, and open-source crypto market tracking.*
```
