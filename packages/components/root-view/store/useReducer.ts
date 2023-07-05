import {TState, TView, TAction} from '../types';

const reducer: React.Reducer<TState, TView> = (state, payload) => {
  switch (payload.type) {
    case TAction.CREATE:
      state = [...state, payload];
      return state;
    case TAction.DELETE:
      const idx = state.findIndex(_v => _v.id === payload.id);

      state.splice(idx, 1);

      state = [...state];

      return state;

    default:
      return state;
  }
};

export default reducer;
