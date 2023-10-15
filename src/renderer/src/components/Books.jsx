import { useEffect, useState } from 'react';

export function Books() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    window.api.on('book:getBooks', books => {
      setBooks(books);
    });

    return () => {
      window.api.removeListener('book:getBooks');
    };
  }, []);

  return (
    <div className="grid grid-cols-fill-200px gap-4">
      {books.map(book => (
        <Book key={book._id} book={book} />
      ))}
    </div>
  );
}

function Book({ book }) {
  const cover = `media:///${book.coverPath}`;

  const onClick = async book => {
    await window.api.invoke('book:openBookDetails', book._id);
  };

  return (
    <div className="flex flex-col w-[200px] h-[265px] cursor-pointer relative group" onClick={() => onClick(book)}>
      <div className="w-full h-full absolute hidden group-hover:flex hover:flex-col hover:p-4 hover:justify-center hover:gap-3 hover:bg-black hover:opacity-80 ">
        <p className="break-words text-white">{book.title}</p>
        <p className="text-sm break-words text-white font-bold">{book.author}</p>
      </div>
      <img src={cover} alt={book.title} className="h-full w-full" />
    </div>
  );
}
