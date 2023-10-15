import { useContext, useMemo, useState } from 'react';
import { BookModeContext } from './BookModeContext';
import { BookMode } from '../constants';

const DEFAULT_MODE = BookMode.READ;

export function BookModeProvider({ children }) {
  const [bookMode, setBookMode] = useState(DEFAULT_MODE);

  const isEditing = bookMode === BookMode.EDIT;
  const isReading = bookMode === BookMode.READ;

  const toggleBookModeEdit = () => {
    setBookMode(prevBookMode => {
      if (prevBookMode === BookMode.EDIT) {
        window.api.invoke('book:closeBookDetails');
        return DEFAULT_MODE;
      }

      return BookMode.EDIT;
    });
  };

  const value = useMemo(() => ({
    isEditing,
    isReading,
    toggleBookModeEdit,
  }));

  return <BookModeContext.Provider value={value}>{children}</BookModeContext.Provider>;
}

export const useBookMode = () => {
  const context = useContext(BookModeContext);
  if (context === null) throw new Error('useBookMode must be used within a BookModeProvider');

  return context;
};
