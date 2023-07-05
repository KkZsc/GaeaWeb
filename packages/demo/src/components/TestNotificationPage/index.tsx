import styled from '@emotion/native';
import {Button, View} from 'react-native';
import {useEffect} from 'react';
import {GANotification} from '@gaea-web/shared';

const Container = styled.View({
  flex: 1,
});

export default () => {
  useEffect(() => {
    const eventCallback = (params: string) => {
      console.log('params', params);
    };
    GANotification.addEventListener('test', eventCallback);
  }, []);
  return (
    <Container>
      <View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          marginTop: 100,
        }}>
        <Button title="发送通知" onPress={() => {}} />
      </View>
    </Container>
  );
};
