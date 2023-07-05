import React, {ReactNode} from 'react';
import {ICustomProp} from './envConst';

const EnvContext = React.createContext<ICustomProp | undefined>(undefined);
EnvContext.displayName = 'EnvContext';

export const EnvProvider = ({children, value}: {children: ReactNode; value: ICustomProp}) => {
  return <EnvContext.Provider children={children} value={value} />;
};

export const useEnv = () => {
  const context = React.useContext(EnvContext);
  if (!context) {
    throw new Error('useEnv必须在EnvProvider中使用');
  }
  return context;
};
