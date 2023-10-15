import { db } from './db';

export { insertOne, findByBookPath, findAll, findById, updateBook, deleteBook };

const BookModel = db.book;

async function insertOne({ title, author, year, bookPath, coverPath }) {
  return await BookModel.insertAsync({
    title,
    author,
    year,
    bookPath,
    coverPath,
  });
}

async function findByBookPath({ bookPath }) {
  return await BookModel.findOneAsync({ bookPath });
}

async function findAll() {
  return await BookModel.findAsync();
}

async function findById({ bookId }) {
  return await BookModel.findOne({ _id: bookId });
}

async function updateBook({ bookId, title, collection, tome, author, year }) {
  return await BookModel.updateAsync({ _id: bookId }, { $set: { title, collection, tome, author, year } });
}

async function deleteBook({ bookId }) {
  return await BookModel.removeAsync({ _id: bookId });
}
