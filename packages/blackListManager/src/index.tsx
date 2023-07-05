import {EnvProvider, ICustomProp} from '@gaea-web/shared';
import BlackListManagerFragment from './components/BlackListManagerFragment';
import {RootView} from '@gaea-web/components/root-view';

const PageComponent = (props: ICustomProp) => {
  return (
    <RootView>
      <EnvProvider value={props}>
        <BlackListManagerFragment params="黑名单" />
      </EnvProvider>
    </RootView>
  );
};

export default PageComponent;
