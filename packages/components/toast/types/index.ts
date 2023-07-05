export type ToastPosition = 'top' | 'bottom';

export type ToastOptions = {
  text: string;
  position: ToastPosition;
  numberOfLines: number;
  duration: number;
  onPress?: () => void;
};

export type ToastShowParams = {
  text: string;
  position?: ToastPosition;
  numberOfLines?: number;
  duration?: number;
  onPress?: () => void;
};
