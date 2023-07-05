import {TDispath} from '../types';

export const dispatchStack: TDispath[] = [];

export const registerDispatch = (dispatch: TDispath) => {
  dispatchStack.push(dispatch);
};

export const removeDispatch = (dispatch: TDispath) => {
  const idx = dispatchStack.findIndex(fn => fn === dispatch);
  dispatchStack.splice(idx, 1);
};
