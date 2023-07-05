import {TNativeProps, EnvProvider} from '@gaea-web/shared';
import VoucherPage from './components/VoucherList';
import {RootView} from '@gaea-web/components/root-view';

const Voucher = (props: TNativeProps) => {
  return (
    <RootView>
      <EnvProvider value={props.nativeConfig}>
        <VoucherPage />
      </EnvProvider>
    </RootView>
  );
};

export default Voucher;
