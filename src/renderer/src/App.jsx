import { BookDetailsPanel } from './components/BookDetails/BookDetailsPanel';
import { Books } from './components/Books/Books';
import { MenuBar } from './components/MenuBar';
import { BookModeProvider } from './contexts/BookModeProvider';

function App() {
  return (
    <BookModeProvider>
      <MenuBar />
      <div className="p-2 relative h-[calc(100vh-5rem)]">
        <Books />
        <BookDetailsPanel />
      </div>
    </BookModeProvider>
  );
}

export default App;
