import { BookDetailsPanel } from './components/BookDetails/BookDetailsPanel';
import { Collections } from './components/Collections/Collections';
import { MenuBar } from './components/MenuBar';
import { BookModeProvider } from './contexts/BookModeProvider';

function App() {
  return (
    <BookModeProvider>
      <MenuBar />
      <div className="p-2 relative h-[calc(100vh-5rem)]">
        <Collections />
        <BookDetailsPanel />
      </div>
    </BookModeProvider>
  );
}

export default App;
