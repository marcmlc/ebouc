import { IconTrash } from '@tabler/icons-react';
import { IconExternalLink } from '@tabler/icons-react';
import { IconPencil } from '@tabler/icons-react';
import { useCallback } from 'react';

export function BookListItem({ book }) {
  const openBookDetails = useCallback(async () => {
    await window.api.invoke('book:openBookDetails', book._id);
  }, [book]);

  const openBookOnSystem = useCallback(async () => {
    await window.api.invoke('book:openBook', book.bookPath);
  }, [book]);

  const deleteBook = useCallback(async () => {
    await window.api.invoke('book:deleteBook', book._id);
  }, [book]);

  const buttonClass = 'flex justify-center items-center bg-gray-100 rounded-lg w-8 h-8 text-white';
  const cover = `media:///${book.coverPath}`;

  return (
    <div className="flex items-center border border-gray-300 shadow-sm rounded-md p-3">
      <div className="w-[75px] relative group shadow-md">
        <img src={cover} alt={book.title} className={`h-full w-full`} />
      </div>
      <div className="flex flex-col flex-1 items-center justify-between h-full">
        <h2 className="text-lg font-medium">{book.title}</h2>
        <div className="flex justify-evenly items-center w-full">
          <div className="flex flex-col">
            <p className="text-sm">
              Auteur : {book.author ? <span className="text-base">{book.author}</span> : <EmptyInfo />}
            </p>
            <p className="text-sm">
              Année : {book.year ? <span className="text-base">{book.year}</span> : <EmptyInfo />}
            </p>
          </div>
          <div className="flex flex-col">
            <p className="text-sm">
              Collection : {book.collection ? <span className="text-base">{book.collection}</span> : <EmptyInfo />}
            </p>
            <p className="text-sm">
              Tome : {book.tome ? <span className="text-base">{book.tome}</span> : <EmptyInfo />}
            </p>
          </div>
        </div>
        <div></div>
      </div>
      <div className="flex gap-3">
        <button
          onClick={async () => await openBookOnSystem()}
          className={`${buttonClass} bg-main-400 hover:bg-main-500`}>
          <IconExternalLink width={20} height={20} />
        </button>
        <button
          onClick={async () => await openBookDetails()}
          className={`${buttonClass} bg-main-400 hover:bg-main-500`}>
          <IconPencil width={20} height={20} />
        </button>
        <button onClick={async () => await deleteBook()} className={`${buttonClass} bg-gray-300 hover:bg-gray-400`}>
          <IconTrash width={20} height={20} />
        </button>
      </div>
    </div>
  );
}

function EmptyInfo() {
  return <span className="text-sm italic">Aucun donnée</span>;
}
