import { IconEdit, IconPlus, IconX } from '@tabler/icons-react';
import { useBookMode } from '../contexts/BookModeProvider';

export function MenuBar() {
  const { isEditing, toggleBookModeEdit } = useBookMode();

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
          <h2 className="font-2xl font-bold">Ebouc</h2>
          <div className="w-[0.5px] opacity-20 h-5 bg-black" />
          <button onClick={async () => await addBook()}>
            <IconPlus />
          </button>
          <button onClick={toggleBookModeEdit} className={`${isEditing ? 'text-red-500' : 'text-black'}`}>
            <IconEdit />
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
