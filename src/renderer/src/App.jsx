import { BookDetailsPanel } from './components/BookDetailsPanel';
import { Books } from './components/Books';
import { MenuBar } from './components/MenuBar';

function App() {
  return (
    <>
      <MenuBar />
      <div className="p-2 relative h-[calc(100vh-5rem)]">
        <Books />
        <BookDetailsPanel />
      </div>
    </>
  );
}

export default App;
