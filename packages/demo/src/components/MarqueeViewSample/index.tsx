import {Text} from 'react-native';
import {MarqueeView, SafeAreaContainer} from '@gaea-web/components';
import Toolbar from '@gaea-web/components/toolbar';

export default () => {
  return (
    <SafeAreaContainer>
      <Toolbar title={'MarqueeView Demo'} />
      <MarqueeView height={50} stayDuration={4000} style={{backgroundColor: '#EEE3CB', margin: 16}}>
        <Text>Hello 1</Text>
        <Text>Hello 2</Text>
        <Text>Hello 3</Text>
      </MarqueeView>
    </SafeAreaContainer>
  );
};
