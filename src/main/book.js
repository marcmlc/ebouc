import { dialog, shell } from 'electron';
import * as bookService from './services/book';

export {
  openPickBookDialog,
  getBooks,
  openBookDetails,
  updateBook,
  closeBookDetails,
  openBookOnSystem,
  deleteBook,
  getBooksByCollection,
};

async function openPickBookDialog({ mainWindow }) {
  try {
    const result = await dialog.showOpenDialog({
      properties: ['openFile'],
      filters: [{ name: 'Livres', extensions: ['epub'] }],
    });

    if (!result.canceled) {
      await bookService.addBook({ bookPath: result.filePaths[0] });

      await sendBooksByCollection({ mainWindow });
    }
  } catch (error) {
    console.error(error);
  }
}

async function openBookDetails({ mainWindow, bookId }) {
  const book = await bookService.getBook({ bookId });
  mainWindow.webContents.send('book:getBook', book);
}

async function closeBookDetails({ mainWindow }) {
  mainWindow.webContents.send('book:getBook', undefined);
}

async function openBookOnSystem({ bookPath }) {
  await shell.openPath(bookPath);
}

async function getBooks() {
  return bookService.getBooks();
}

async function getBooksByCollection() {
  return bookService.getBooksByCollection();
}

async function sendBooksByCollection({ mainWindow }) {
  const collections = await bookService.getBooksByCollection();
  mainWindow.webContents.send('book:getBooksByCollection', collections);
}

async function updateBook({ mainWindow, book }) {
  await bookService.updateBook(book);

  await sendBooksByCollection({ mainWindow });
}

async function deleteBook({ mainWindow, bookId }) {
  await bookService.deleteBook({ bookId });

  await sendBooksByCollection({ mainWindow });
  mainWindow.webContents.send('book:getBook', undefined);
}
