import {ViewStyle} from 'react-native';

export type LoadingTheme = 'dark' | 'light';

export type LoadingOptions = {
  mask?: boolean;
  duration?: number;
  text?: string;
  theme?: LoadingTheme;
  maskStyle?: ViewStyle;
};

export type LoadingProps = Required<LoadingOptions>;

export type LoadingShowParams = LoadingOptions;
