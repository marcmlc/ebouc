import { useEffect, useState } from 'react';

export function BookDetails() {
  const [book, setBook] = useState();

  useEffect(() => {
    window.api.on('book:getBook', book => {
      setBook(book);
    });

    return () => {
      window.api.removeListener('book:getBook');
    };
  }, []);

  if (!book) {
    return null;
  }

  const close = () => {
    setBook(undefined);
  };

  const onSubmit = e => {
    e.preventDefault();
  };

  const onChange = event => {
    const target = event.target;
    setBook(prevBook => ({
      ...prevBook,
      [target.name]: target.value,
    }));
  };

  const cover = `media:///${book.coverPath}`;

  return (
    <Panel>
      <div className="flex flex-col h-full gap-4 items-center">
        <h1 className="text-xl text-center">{book.title}</h1>
        <div className="flex flex-col">
          <img src={cover} alt={book.title} className="w-[300px]" />
        </div>
        <div className="h-[1px] mt-2 mb-5 bg-gray-200 w-full" />
        <form className="flex flex-col w-full gap-3" onSubmit={onSubmit}>
          <div>
            <label htmlFor="author" className="block mb-1 font-medium text-gray-900">
              Auteur
            </label>
            <input
              type="text"
              id="author"
              name="author"
              value={book.author}
              onChange={onChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              placeholder="Edgar Allan Poe"
            />
          </div>
          <div>
            <label htmlFor="year" className="block mb-1 font-medium text-gray-900">
              Année
            </label>
            <input
              type="text"
              id="year"
              name="year"
              value={book.year}
              onChange={onChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              placeholder="2012"
            />
          </div>
          <div className="flex justify-between mt-5">
            <button
              type="submit"
              className="text-white bg-main-500 hover:bg-main-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
              Sauvegarder
            </button>
            <button
              type="action"
              onClick={() => close()}
              className="text-white bg-gray-400 hover:bg-gray-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
              Fermer
            </button>
          </div>
        </form>
      </div>
    </Panel>
  );
}

function Panel({ children }) {
  return (
    <div className="absolute right-0 inset-y-0 w-1/3 z-10 border-l-[0.5px] px-4 bg-white overflow-y-scroll">
      <div className="py-4">{children}</div>
    </div>
  );
}
