import { IconPlus, IconX } from '@tabler/icons-react';

export function MenuBar() {
  const closeApp = async () => {
    await window.api.send('app:close');
  };

  const addBook = async () => {
    await window.api.send('book:openPickBookDialog');
  };

  return (
    <>
      <div className="flex p-6 justify-between items-center bg-white drag border-b-[0.5px] h-20 w-full fixed z-50">
        <div className="flex items-center gap-7 no-drag">
          <h2 className="text-xl font-bold">Ebouc</h2>
          <div className="w-[0.5px] opacity-20 h-8 bg-gray-300" />
          <button onClick={async () => await addBook()}>
            <IconPlus />
          </button>
        </div>
        <div className="no-drag">
          <button onClick={async () => await closeApp()}>
            <IconX />
          </button>
        </div>
      </div>
      <div className="h-20" />
    </>
  );
}
