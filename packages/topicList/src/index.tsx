import {useEffect} from 'react';
import {Dimensions, Platform} from 'react-native';
import {ICustomProp, EnvProvider} from '@gaea-web/shared';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {RootView, SafeAreaContainer, Loading} from '@gaea-web/components';
import TopicList from './components/TopicList';

const mock = {
  targetIndex: 0,
  module_type: 3,
  TriggerPage: 'FindNewPage_爆更',
  hit_param: {
    gender: 0,
    module_type: 53,
    tab_id: 53,
  },
  module_id: 1464,
  title: '加更公告',
  ClkItemType: '发现_查看更多',
};

const Page = (props: ICustomProp) => {
  useEffect(() => {
    Loading.show({
      mask: false,
    });
  }, []);

  return (
    <RootView>
      <EnvProvider value={props}>
        <SafeAreaProvider
          initialMetrics={{
            insets: {top: 0, bottom: 0, left: 0, right: 0},
            frame: {
              x: 0,
              y: 0,
              width: Dimensions.get('window').width,
              height: Dimensions.get('window').height,
            },
          }}>
          <SafeAreaContainer edges={['left', 'right']}>
            {/* TODO 测试使用，后续删除 */}
            {Platform.OS === 'ios' ? <TopicList {...props.params} /> : <TopicList addParams={mock} saParams={{}} />}
          </SafeAreaContainer>
        </SafeAreaProvider>
      </EnvProvider>
    </RootView>
  );
};

export default Page;
