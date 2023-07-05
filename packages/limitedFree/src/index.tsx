import {RootView} from '@gaea-web/components';
import {EnvProvider, ICustomProp} from '@gaea-web/shared';
import {LimitFreeList} from './components/LimitFreeList';

const PageComponent = (props: ICustomProp) => {
  return (
    <RootView>
      <EnvProvider value={props}>
        <LimitFreeList {...props} />
      </EnvProvider>
    </RootView>
  );
};

export default PageComponent;
