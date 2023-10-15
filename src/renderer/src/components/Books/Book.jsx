import { IconExternalLink } from '@tabler/icons-react';

export function Book({ book }) {
  const cover = `media:///${book.coverPath}`;

  const onClick = async book => {
    await window.api.invoke('book:openBookDetails', book._id);
  };

  return (
    <div className="flex flex-col cursor-pointer gap-1" onClick={() => onClick(book)}>
      <div className="w-[200px] h-[265px] relative group">
        <div className="w-full h-full absolute hidden group-hover:block">
          <div className="w-full h-full flex items-center justify-center gap-1 bg-black bg-black opacity-80 text-white">
            Ouvrir <IconExternalLink />
          </div>
        </div>
        <img src={cover} alt={book.title} className="h-full w-full" />
      </div>
      <p className="break-words">{book.title}</p>
      <p className="break-words text-sm italic">{book.collection}</p>
      <p className="text-sm break-words font-bold">{book.author}</p>
    </div>
  );
}
