import {useEffect} from 'react';
import {Siblings} from '../root-view';
import AnimatedContainer from './components/AnimatedContainer';
import {ToastShowParams, ToastOptions} from './types';

const DEFAULT_OPTIONS: ToastOptions = {
  text: '',
  position: 'bottom',
  numberOfLines: 1,
  duration: 2000,
};

class ToastBase {
  private toast: Siblings | undefined;
  private isActive = false;

  show = (params: ToastShowParams) => {
    const options = Object.assign({}, DEFAULT_OPTIONS, params);

    if (this.isActive && this.toast) {
      this.hide(this.toast);
    }

    const ToastContainer = () => {
      useEffect(() => {
        this.isActive = true;

        return () => {
          this.isActive = false;
        };
      }, []);

      return (
        <AnimatedContainer
          options={options}
          onClose={() => {
            this.hide(this.toast);
          }}
        />
      );
    };

    this.toast = new Siblings(<ToastContainer />);

    return this.toast;
  };

  hide = (instance: Siblings | undefined) => {
    if (instance instanceof Siblings) {
      instance.destroy();
      this.toast = undefined;
    }
  };
}

export const Toast = new ToastBase();
