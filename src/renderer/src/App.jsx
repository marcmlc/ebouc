import { Books } from './components/Books';
import { MenuBar } from './components/MenuBar';

function App() {
  return (
    <>
      <MenuBar />
      <div className="p-2">
        <h1 className="text-2xl text-orange-500">Bienvenue sur Ebouc!</h1>
        <Books />
      </div>
    </>
  );
}

export default App;
