import {useState} from 'react';

export default () => {
  const [someState, setSomeState] = useState('something');

  return {
    someState,
    setSomeState,
  };
};
