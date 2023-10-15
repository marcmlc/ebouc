import { IconExternalLink, IconPencil, IconTrash } from '@tabler/icons-react';
import { useCallback } from 'react';

export function Book({ book }) {
  const openBookDetails = useCallback(async () => {
    await window.api.invoke('book:openBookDetails', book._id);
  }, [book]);

  const openBookOnSystem = useCallback(async () => {
    await window.api.invoke('book:openBook', book.bookPath);
  }, [book]);

  const deleteBook = useCallback(async () => {
    await window.api.invoke('book:deleteBook', book._id);
  }, [book]);

  const cover = `media:///${book.coverPath}`;

  return (
    <div className="flex flex-col gap-1">
      <div className="w-[200px] h-[265px] relative group shadow-md">
        <div className="w-full h-full absolute hidden group-hover:block cursor-pointer">
          <EditMode onClickEdit={openBookDetails} onClickDelete={deleteBook} />
          <div
            onClick={async () => await openBookOnSystem()}
            className="w-full h-full flex items-center justify-center gap-1 bg-black opacity-80 text-white">
            Ouvrir <IconExternalLink />
          </div>
        </div>
        <img src={cover} alt={book.title} className={`h-full w-full`} />
      </div>
      <p className="break-words">{book.title}</p>
      <p className="text-sm break-words font-bold">{book.author}</p>
    </div>
  );
}

function EditMode({ onClickEdit, onClickDelete }) {
  return (
    <>
      <button
        onClick={async () => await onClickEdit()}
        className="absolute z-10 -right-3 top-1 flex gap-1 items-center justify-center bg-gray-100 p-1 rounded-full shadow-lg text-main-500">
        <IconPencil />
      </button>
      <button
        onClick={async () => await onClickDelete()}
        className="absolute z-10 -right-3 top-12 flex gap-1 items-center justify-center bg-gray-100 p-1 rounded-full shadow-lg text-main-500">
        <IconTrash />
      </button>
    </>
  );
}
