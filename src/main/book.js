import { dialog } from 'electron';
import * as bookService from './services/book';

export { openPickBookDialog, getBooks };

async function openPickBookDialog() {
  try {
    const result = await dialog.showOpenDialog({
      properties: ['openFile'],
      filters: [{ name: 'Livres', extensions: ['epub'] }],
    });

    if (!result.canceled) {
      await bookService.addBook({ bookPath: result.filePaths[0] });
    }
  } catch (error) {
    console.error(error);
  }
}

async function getBooks() {
  return bookService.getBooks();
}
