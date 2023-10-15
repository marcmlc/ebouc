import { EPub } from 'epub2';
import fse from 'fs-extra';
import { chain, isEmpty, partition, sortBy } from 'lodash';
import path from 'path';
import { STORAGE_PATH } from '../constant';
import * as bookRepository from '../db/book';
import { pdfToPng } from 'pdf-to-png-converter';

export { addBook, deleteBook, getBook, getBooks, getBooksByCollection, updateBook, addBooks };

async function addBooks({ booksPath }) {
  for (const bookPath of booksPath) {
    await addBook({ bookPath });
  }
}

async function addBook({ bookPath }) {
  try {
    const bookAlreadyExists = Boolean(await bookRepository.findByBookPath({ bookPath }));

    if (bookAlreadyExists) {
      console.log('Book already exists');
      return;
    }

    const { book, coverImageData } = await parseBook({ bookPath });

    await bookRepository.insertOne(book);

    // save thumbnail
    if (coverImageData) {
      await fse.outputFile(book.coverPath, coverImageData, 'binary');
    } else {
      console.log('Cannot find cover image');
    }

    console.log('Book added');
  } catch (error) {
    console.error(error);
  }
}

async function parseBook({ bookPath }) {
  if (bookPath.endsWith('.epub')) {
    return parseEpubBook({ bookPath });
  }
  if (bookPath.endsWith('.pdf')) {
    return parsePdfBook({ bookPath });
  }
  throw new Error('Unsupported book.');
}

async function parseEpubBook({ bookPath }) {
  const parsedBook = await EPub.createAsync(bookPath);
  const { title, cover } = parsedBook.metadata;

  if (!cover) {
    return { book: parseEpubBookToModel({ parsedBook, bookPath }) };
  }

  const coverPath = getCoverPath({ title });
  const [coverImageData] = await parsedBook.getImageAsync(cover);

  return { book: parseEpubBookToModel({ parsedBook, bookPath, coverPath }), coverImageData };
}

async function parsePdfBook({ bookPath }) {
  // First page as thumbnail
  const [coverImage] = await pdfToPng(bookPath, {
    pagesToProcess: [1],
  });
  const coverImageData = coverImage.content;
  const title = bookPath.split('/').at(-1).split('.').at(0);
  const coverPath = getCoverPath({ title });

  const book = {
    title,
    bookPath,
    coverPath,
  };

  return { book, coverImageData };
}

async function getBooks() {
  return bookRepository.findAll();
}

async function getBooksByCollection() {
  const books = await bookRepository.findAll();
  const [booksWithCollection, booksWithoutCollection] = partition(books, book => !isEmpty(book.collection));

  // group books by collection and sort by tome
  const booksByCollections = chain(booksWithCollection)
    .groupBy('collection')
    .mapValues(books => sortBy(books, 'tome'))
    .value();

  return {
    ...booksByCollections,
    ...(!isEmpty(booksWithoutCollection) ? { 'Sans Collection': [...booksWithoutCollection] } : {}),
  };
}

async function getBook({ bookId }) {
  return bookRepository.findById({ bookId });
}

async function updateBook(book) {
  try {
    return await bookRepository.updateBook(formatBookToUpdate({ book }));
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

function parseEpubBookToModel({ parsedBook, bookPath, coverPath }) {
  const { title, creator: author, date } = parsedBook.metadata;
  const year = date ? new Date(date).getFullYear() : undefined;

  return {
    title,
    author,
    year,
    bookPath,
    coverPath,
  };
}

function formatBookToUpdate({ book }) {
  const compactBook = chain(book)
    .mapValues(value => (!value ? undefined : value))
    .value();

  const updatedBook = {
    ...compactBook,
    ...(compactBook.year ? { year: Number(compactBook.year) } : {}),
    ...(compactBook.tome ? { tome: Number(compactBook.tome) } : {}),
  };

  return updatedBook;
}
