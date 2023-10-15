function App() {
  const addBook = async () => {
    await window.api.send('book:openPickBookDialog');
  };

  return (
    <div>
      <h1 className="text-2xl text-orange-500">Bienvenue sur Ebouc!</h1>
      <button onClick={async () => await addBook()}>Open</button>
    </div>
  );
}

export default App;
