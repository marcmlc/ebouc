import { useEffect, useState } from 'react';
import { BookDetails } from './BookDetails';

export function BookDetailsPanel() {
  const [book, setBook] = useState(undefined);

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

  return (
    <div className="absolute right-0 inset-y-0 w-1/3 z-10 border-l-[0.5px] px-4 bg-white overflow-y-scroll">
      <div className="py-4">
        <BookDetails key={book._id} book={book} close={close} />
      </div>
    </div>
  );
}
