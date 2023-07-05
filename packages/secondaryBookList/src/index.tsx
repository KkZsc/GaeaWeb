import {ICustomProp, EnvProvider} from '@gaea-web/shared';
import SecondaryBookListPage, {checkSecondBookListParams} from './components/SecondaryBookListPage';

const SecondaryBookList = (props: ICustomProp) => {
  return (
    <EnvProvider value={props}>
      <SecondaryBookListPage initialParams={checkSecondBookListParams(props.params)} />
    </EnvProvider>
  );
};

export default SecondaryBookList;
