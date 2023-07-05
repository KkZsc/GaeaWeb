import {createContext} from 'react';
import {TContext} from '../types';

export default createContext<TContext>({} as TContext);
