import { IconExternalLink, IconPencil, IconTrash } from '@tabler/icons-react';
import { useCallback } from 'react';
import { useBookMode } from '../../contexts/BookModeProvider';

export function Book({ book }) {
  const { isReading, isEditing } = useBookMode();

  const openBookDetails = useCallback(async () => {
    await window.api.invoke('book:openBookDetails', book._id);
  }, [book]);

  const openBookOnSystem = useCallback(async () => {
    await window.api.invoke('book:openBook', book.bookPath);
  }, [book]);

  const cover = `media:///${book.coverPath}`;

  return (
    <div className="flex flex-col gap-1">
      <div className="w-[200px] h-[265px] relative group">
        {isEditing && <EditMode onClickEdit={openBookDetails} />}
        {isReading && (
          <div className="w-full h-full absolute hidden group-hover:block cursor-pointer">
            <div
              onClick={async () => await openBookOnSystem()}
              className="w-full h-full flex items-center justify-center gap-1 bg-black bg-black opacity-80 text-white">
              Ouvrir <IconExternalLink />
            </div>
          </div>
        )}
        <img src={cover} alt={book.title} className={`h-full w-full ${isEditing ? 'blur-sm' : ''}`} />
      </div>
      <p className="break-words">{book.title}</p>
      <p className="break-words text-sm italic">{book.collection}</p>
      <p className="text-sm break-words font-bold">{book.author}</p>
    </div>
  );
}

function EditMode({ onClickEdit }) {
  return (
    <>
      <button
        onClick={async () => await onClickEdit()}
        className="absolute z-10 -right-3 top-1 flex gap-1 items-center justify-center bg-white p-1 rounded-full shadow-lg">
        <IconPencil />
      </button>
      <button className="absolute z-10 -right-3 top-12 flex gap-1 items-center justify-center bg-white p-1 rounded-full shadow-lg">
        <IconTrash />
      </button>
    </>
  );
}
