import React, {ReactNode, useCallback, useContext, useReducer, useEffect} from 'react';
import styled from '@emotion/native';
import {Dimensions} from 'react-native';
import {TView, TAction, TDispath} from './types';
import Store from './store';
import reducer from './store/useReducer';
import {dispatchStack, registerDispatch, removeDispatch} from './stack';

const SiblingsItem = styled.View({
  position: 'absolute',
  top: 0,
  left: 0,
  width: Dimensions.get('window').width,
  height: Dimensions.get('screen').height,
});

// 组件index
let sid = 0;

const RootSibling = () => {
  const {state} = useContext(Store);

  return (
    <>
      {state?.map?.(view => (
        <SiblingsItem key={view.id}>{view.node}</SiblingsItem>
      ))}
    </>
  );
};

export const RootView = (props: React.PropsWithChildren) => {
  const [state, _dispatch] = useReducer(reducer, []);

  const dispatch = useCallback((node: TView) => {
    _dispatch(node);
  }, []);

  useEffect(() => {
    registerDispatch(dispatch);

    return () => {
      removeDispatch(dispatch);
    };
  }, [dispatch]);

  return (
    <Store.Provider value={{state}}>
      {props.children}
      <RootSibling />
    </Store.Provider>
  );
};

const getDispatch = () => {
  const stacks = dispatchStack.reverse();

  return stacks[0] ?? null;
};

export class Siblings {
  private id: string;
  private dispatch: TDispath;

  constructor(node: ReactNode) {
    this.id = `siblings_id_${sid++}`;
    this.dispatch = getDispatch();

    this.dispatch?.({
      id: this.id,
      node,
      type: TAction.CREATE,
    });
  }

  destroy() {
    this.dispatch?.({
      id: this.id,
      type: TAction.DELETE,
    });
  }
}
