import {MatchParentView} from '@gaea-web/components';
import {ICustomProp, TNativeProps} from '@gaea-web/shared';
import {useCallback, useEffect, useState} from 'react';
import {Button, NativeEventEmitter, NativeModules, Text} from 'react-native';
import RTNGaeaNativeData from 'rtn-gaea-native-data/js/NativeGaeaNativeData';

const colors: string[] = ['#30A2FF', '#00C4FF', '#FFE7A0', '#FFF5B8'];
const viewDidAppearEmitter = new NativeEventEmitter(NativeModules.GAViewEventEmitter);

export default (props: TNativeProps<ICustomProp>) => {
  const [curData, setCurData] = useState<{}>();
  const argExt = props.nativeConfig.params?.argExt;

  const getNativeData = useCallback(() => {
    RTNGaeaNativeData?.data(props.rootTag!).then(data => {
      console.log(argExt, '获取数据', JSON.stringify(data));
      setCurData(data);
    });
  }, [argExt, setCurData, props]);

  useEffect(() => {
    const emitterSubscription = viewDidAppearEmitter.addListener('GaeaViewReloadData', event => {
      // 处理事件数据
      if (event?.rootTag === props.rootTag) {
        console.log(argExt, '有新数据');
        getNativeData();
      }
    });
    getNativeData();
    return () => {
      emitterSubscription.remove();
    };
  }, [getNativeData, argExt, props]);
  return (
    <MatchParentView style={{backgroundColor: colors[Math.floor(Math.random() * 4)]}}>
      <Text>{'item:' + argExt}</Text>
      {curData && <Text>{'data:' + JSON.stringify(curData)}</Text>}
      <Button title="主动获取数据" onPress={getNativeData} />
    </MatchParentView>
  );
};
