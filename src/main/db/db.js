import { STORAGE_PATH } from '../constant';
import Datastore from '@seald-io/nedb';

const DATABASE_NAME = 'ebouc.json';

let book;

// DB is in app dir on dev mode
if (process.env['NODE_ENV'] === 'development') {
  book = new Datastore({ filename: DATABASE_NAME, autoload: true });
} else {
  book = new Datastore({ filename: `${STORAGE_PATH}/${DATABASE_NAME}`, autoload: true });
}

const db = {
  book,
};

export { db };
