import {Siblings} from '../root-view';
import ModalContainer from './components/ModalContainer';
import {ModalOptions} from './types';

class ModalBase {
  show = (props: ModalOptions): Siblings => {
    const _modal = new Siblings(
      (
        <ModalContainer
          {...props}
          onClose={() => {
            this.hide(_modal);
            props?.onClose?.();
          }}
        />
      ),
    );

    return _modal;
  };

  hide = (instance: Siblings) => {
    if (instance instanceof Siblings) {
      instance.destroy();
    }
  };
}

export const Modal = new ModalBase();
