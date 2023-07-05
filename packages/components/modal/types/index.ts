import {ReactElement} from 'react';
import {DialogOptions} from '../../dialog';

export type ModalOptions = {
  title?: string | ReactElement;
  content?: string | ReactElement;
  cancelText?: string;
  confirmText?: string;
  onCancel?: () => void | Promise<void>;
  onConfirm?: () => void | Promise<void>;
} & DialogOptions;
