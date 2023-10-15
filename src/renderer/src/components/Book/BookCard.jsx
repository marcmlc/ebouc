import { IconExternalLink } from '@tabler/icons-react';
import { useCallback } from 'react';

export function BookCard({ book }) {
  const openBookOnSystem = useCallback(async () => {
    await window.api.invoke('book:openBook', book.bookPath);
  }, [book]);

  const cover = `media:///${book.coverPath}`;

  return (
    <div className="flex flex-col gap-1">
      <div className="w-[200px] h-[265px] relative group shadow-md">
        <div className="w-full h-full absolute hidden group-hover:block cursor-pointer">
          <div
            onClick={async () => await openBookOnSystem()}
            className="w-full h-full flex items-center justify-center gap-1 bg-black opacity-80 text-white">
            Ouvrir <IconExternalLink />
          </div>
        </div>
        <img src={cover} alt={book.title} className={`h-full w-full`} />
      </div>
      <p className="break-words">{book.title}</p>
    </div>
  );
}
