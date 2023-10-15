import { Book } from '../Books/Book';

export function Collection({ collection, books }) {
  return (
    <div key={collection} className="flex flex-col gap-5">
      <div className="text-lg border-b-2 p-2 font-medium">{collection}</div>
      <div className="grid grid-cols-fill-200px gap-6">
        {books.map(book => (
          <Book key={book._id} book={book} />
        ))}
      </div>
    </div>
  );
}
