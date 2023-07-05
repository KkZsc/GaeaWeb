import {EnvProvider, ICustomProp} from '@gaea-web/shared';
import {AutoPayManagerFragment} from './components/AutoPayManager';
import {RootView} from '@gaea-web/components/root-view';

const AutoPayManager = (props: ICustomProp) => {
  return (
    <RootView>
      <EnvProvider value={props}>
        <AutoPayManagerFragment params="自动购买管理" />
      </EnvProvider>
    </RootView>
  );
};

export default AutoPayManager;
