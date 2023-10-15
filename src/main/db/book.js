import { db } from './db';

export { insertOne, findByBookPath };

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
