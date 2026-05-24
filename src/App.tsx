import { CryptoTracker } from './components/CryptoTracker';
import { SearchProvider } from './features/search/context/search.context';

function App() {
  return (
    <SearchProvider>
      <CryptoTracker />
    </SearchProvider>
  );
}

export default App;
