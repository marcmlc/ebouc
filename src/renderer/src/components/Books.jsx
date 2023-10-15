import { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { IconExternalLink } from '@tabler/icons-react';

export function Books() {
  const [isLoading, setIsLoading] = useState(false);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    window.api.on('book:getBooks', books => {
      setBooks(books);
    });

    const fetchBooks = async () => {
      setIsLoading(true);
      const books = await window.api.invoke('book:initBooks');
      setBooks(books);
      setIsLoading(false);
    };

    fetchBooks();

    return () => {
      window.api.removeListener('book:getBooks');
    };
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader />
      </div>
    );
  }

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
    <div className="flex flex-col cursor-pointer gap-1" onClick={() => onClick(book)}>
      <div className="w-[200px] h-[265px] relative group">
        <div className="w-full h-full absolute hidden group-hover:block">
          <div className="w-full h-full flex items-center justify-center gap-1 bg-black bg-black opacity-80 text-white">
            Ouvrir <IconExternalLink />
          </div>
        </div>
        <img src={cover} alt={book.title} className="h-full w-full" />
      </div>
      <p className="break-words">{book.title}</p>
      <p className="break-words text-sm italic">{book.collection}</p>
      <p className="text-sm break-words font-bold">{book.author}</p>
    </div>
  );
}
