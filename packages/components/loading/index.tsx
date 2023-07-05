import {Siblings} from '../root-view';
import LoadingContainer from './components/LoadingContainer';
import {LoadingShowParams, LoadingProps} from './types';

const DEFAULT_OPTIONS: LoadingProps = {
  mask: true,
  duration: 0,
  theme: 'light',
  text: '',
  maskStyle: {},
};

class LoadingBase {
  private _loading: Siblings | undefined;

  show = (params?: LoadingShowParams) => {
    const options = Object.assign({}, DEFAULT_OPTIONS, params);
    this._loading = new Siblings(<LoadingContainer {...options} />);
  };

  hide = () => {
    this._loading?.destroy();
  };
}

export const Loading = new LoadingBase();
