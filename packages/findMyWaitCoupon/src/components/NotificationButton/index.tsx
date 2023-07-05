import styled from '@emotion/native';
import {useDate} from './hooks/useData';
import {NoticeType} from './types/WaitFreeNoticeResponse';
import {Image, Pressable} from 'react-native';
import RTNGaeaEventTrack from 'rtn-gaea-event-track';

const Container = styled.View({
  height: 24,
  width: 24,
});

export default () => {
  const {notify, changeNotify} = useDate();
  const enableNotify = notify === NoticeType.NoticeEnable;

  return (
    <Container>
      {notify === NoticeType.Loading ? null : (
        <Pressable
          onPress={() => {
            const nextNotify = !enableNotify;
            changeNotify(nextNotify);
            RTNGaeaEventTrack?.trackCommonElementClk({
              ElementName: '等免消息开关',
              ElementShowText: enableNotify ? '开启' : '关闭',
            });
          }}>
          <Image
            source={
              enableNotify ? require('@/resource/navbar_icon_notification_enable.png') : require('@/resource/navbar_icon_notification_disable.png')
            }
          />
        </Pressable>
      )}
    </Container>
  );
};
