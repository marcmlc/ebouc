import { BookDetailsPanel } from './components/BookDetails/BookDetailsPanel';
import { Collections } from './components/Collections/Collections';
import { MenuBar } from './components/MenuBar';
import { ViewModeActions } from './components/ViewModeActions';
import { ViewModeProvider } from './contexts/ViewModeProvider';

function App() {
  return (
    <ViewModeProvider>
      <div className="relative h-full">
        <MenuBar />
        <div className="flex flex-col relative h-[calc(100vh-5rem)] overflow-y-auto w-[90%] mx-auto pb-8 pt-4 gap-5">
          <div className="flex justify-between items-center">
            <h1 className="text-lg/4 font-medium">Mes livres par collection</h1>
            <ViewModeActions />
          </div>
          <Collections className="flex-auto" />
        </div>
        <BookDetailsPanel />
      </div>
    </ViewModeProvider>
  );
}

export default App;
