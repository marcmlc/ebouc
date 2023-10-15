import { app } from 'electron';
import path from 'path';

export const STORAGE_PATH = path
  .resolve(path.join(app.getPath('userData'), 'localStorage'))
  .split(path.sep)
  .join('/');
