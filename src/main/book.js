import { dialog } from 'electron';
import * as bookService from './services/book';

export { openPickBookDialog, getBooks, openBookDetails, updateBook };

async function openPickBookDialog({ mainWindow }) {
  try {
    const result = await dialog.showOpenDialog({
      properties: ['openFile'],
      filters: [{ name: 'Livres', extensions: ['epub'] }],
    });

    if (!result.canceled) {
      await bookService.addBook({ bookPath: result.filePaths[0] });

      const books = await getBooks();
      mainWindow.webContents.send('book:getBooks', books);
    }
  } catch (error) {
    console.error(error);
  }
}

async function openBookDetails({ mainWindow, bookId }) {
  const book = await bookService.getBook({ bookId });
  mainWindow.webContents.send('book:getBook', book);
}

async function getBooks() {
  return bookService.getBooks();
}

async function updateBook({ mainWindow, book }) {
  await bookService.updateBook(book);

  const books = await getBooks();
  mainWindow.webContents.send('book:getBooks', books);
}
