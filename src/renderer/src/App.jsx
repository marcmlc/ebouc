import { BookDetailsPanel } from './components/BookDetails/BookDetailsPanel';
import { Collections } from './components/Collections/Collections';
import { MenuBar } from './components/MenuBar';

function App() {
  return (
    <div className="relative h-full">
      <MenuBar />
      <div className="flex flex-col relative h-[calc(100vh-5rem)] overflow-y-auto w-[90%] mx-auto pb-8 pt-4 gap-5">
        <h1 className="text-lg font-medium">Mes livres par collection</h1>
        <Collections className="flex-auto" />
      </div>
      <BookDetailsPanel />
    </div>
  );
}

export default App;
