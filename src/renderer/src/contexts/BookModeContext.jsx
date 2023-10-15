import { createContext } from 'react';
import { BookMode } from '../constants';

export const BookModeContext = createContext(BookMode.READ);
