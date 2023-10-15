import { BookDetailsPanel } from './components/BookDetails/BookDetailsPanel';
import { Collections } from './components/Collections/Collections';
import { MenuBar } from './components/MenuBar';
import { BookModeProvider } from './contexts/BookModeProvider';

function App() {
  return (
    <BookModeProvider>
      <div className="relative h-full">
        <MenuBar />
        <div className="flex flex-col relative h-[calc(100vh-5rem)] overflow-y-auto w-[90%] mx-auto py-8">
          <Collections className="flex-auto" />
        </div>
        <BookDetailsPanel />
      </div>
    </BookModeProvider>
  );
}

export default App;
