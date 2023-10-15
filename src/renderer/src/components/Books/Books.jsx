import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Book } from './Book';

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

  if (books.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-lg">Encore aucun livre... 📚</p>
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
