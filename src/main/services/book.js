import { EPub } from 'epub2';
import fse from 'fs-extra';
import path from 'path';
import { STORAGE_PATH } from '../constant';
import * as bookRepository from '../db/book';

export { addBook, getBooks, getBook, updateBook, deleteBook };

async function addBook({ bookPath }) {
  try {
    const parsedBook = await EPub.createAsync(bookPath);

    const bookAlreadyExists = Boolean(await bookRepository.findByBookPath({ bookPath }));

    if (!bookAlreadyExists) {
      const { title, cover } = parsedBook.metadata;
      const coverPath = cover ? getCoverPath({ title }) : undefined;
      const book = parserBookToModel({ parsedBook, bookPath, coverPath });

      await bookRepository.insertOne(book);

      if (coverPath) {
        const [coverImageData] = await parsedBook.getImageAsync(cover);
        await fse.outputFile(coverPath, coverImageData, 'binary');
      } else {
        console.log('Cannot find cover image');
      }

      console.log('Book added');
    } else {
      console.log('Book already exists');
    }
  } catch (error) {
    console.error(error);
  }
}

async function getBooks() {
  return bookRepository.findAll();
}

async function getBook({ bookId }) {
  return bookRepository.findById({ bookId });
}

async function updateBook(book) {
  try {
    return await bookRepository.updateBook(book);
  } catch (error) {
    console.error(error);
  }
}

async function deleteBook({ bookId }) {
  return await bookRepository.deleteBook({ bookId });
}

function getCoverPath({ title }) {
  const coverFileName =
    title
      .replace(/[^\w\s]|_/g, '')
      .replace(/\s+/g, '-')
      .toLowerCase() + '.png';

  return path.join(STORAGE_PATH, 'books', coverFileName);
}

function parserBookToModel({ parsedBook, bookPath, coverPath }) {
  const { title, cover, creator: author, date } = parsedBook.metadata;
  const year = date ? new Date(date).getFullYear() : undefined;

  return {
    title,
    cover,
    author,
    year,
    bookPath,
    coverPath,
  };
}
