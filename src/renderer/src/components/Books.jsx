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
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: 200, cursor: 'pointer' }}>
      <img src={`media:///${book.coverPath}`} alt={book.title} />
      <p style={{ fontSize: '1em', wordWrap: 'break-word' }}>{book.title}</p>
      <p style={{ fontSize: '0.8em', wordWrap: 'break-word', fontWeight: 700 }}>{book.author}</p>
    </div>
  );
}
