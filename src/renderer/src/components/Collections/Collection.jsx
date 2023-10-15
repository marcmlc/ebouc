import { VIEW_MODES } from '../../constants';
import { useViewMode } from '../../contexts/ViewModeProvider';
import { BookCard } from '../Book/BookCard';
import { BookListItem } from '../Book/BookListItem';

export function Collection({ collection, books }) {
  const { viewMode } = useViewMode();

  return (
    <div key={collection} className="flex flex-col gap-5">
      <div className="text-lg border-b-2 p-2 font-medium">{collection}</div>
      {viewMode === VIEW_MODES.CARDS && <BookCards books={books} />}
      {viewMode === VIEW_MODES.LIST && <BookList books={books} />}
    </div>
  );
}

function BookList({ books }) {
  return (
    <div className="flex flex-col gap-5">
      {books.map(book => (
        <BookListItem key={book._id} book={book} />
      ))}
    </div>
  );
}

function BookCards({ books }) {
  return (
    <div className="grid grid-cols-fill-200px gap-6">
      {books.map(book => (
        <BookCard key={book._id} book={book} />
      ))}
    </div>
  );
}
