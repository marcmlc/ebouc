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
    <div className="absolute right-0 w-1/3 z-10 border-l-[0.5px] bg-white top-20 bottom-0 overflow-y-auto">
      <div className="py-8 px-4">
        <BookDetails key={book._id} book={book} close={close} />
      </div>
    </div>
  );
}
