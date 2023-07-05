import {ReactNode} from 'react';

export enum TAction {
  CREATE = 'CREATE',
  DELETE = 'DELETE',
}

export type TView = {
  id: string;
  type: TAction;
  node?: ReactNode;
};

export type TState = TView[];

export type TContext = {
  state: TState;
};

export type TDispath = (node: TView) => void;
