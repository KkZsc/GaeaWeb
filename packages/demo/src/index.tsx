import styled from '@emotion/native';
import {FlatList, Pressable, Button} from 'react-native';
import Toolbar from '@gaea-web/components/toolbar';
import {SafeAreaContainer} from '@gaea-web/components/container';
import RTNNavigation from 'rtn-gaea-navigation/js/NativeGaeaNavigation';
import {testPageNames} from './components';
import RTNGaeaGradientView, {GradientOrientation} from 'rtn-gaea-gradient-view/js/GaeaGradientViewNativeComponent';

const componentList = [
  'AboutUs',
  'AutoPayManager',
  'Voucher',
  'SecondaryBookList',
  'FindMyWaitCoupon',
  'https://www.baidu.com',
  'TopicList',
  'BlacklistManager',
  'VipGiftReceipt',
  'LimitedFree',
  ...testPageNames,
];

const Container = styled.View({
  flex: 1,
  width: '100%',
});

const Item = styled.View({
  paddingHorizontal: 16,
  flexDirection: 'row',
  alignItems: 'center',
  width: '100%',
  height: 56,
});

const ItemText = styled.Text({
  color: '#303030',
  fontSize: 16,
  flex: 1,
});

const GaeaGradientView = styled(RTNGaeaGradientView)({
  width: '100%',
  height: 100,
});

const ListItem = ({item}: {item: string}) => {
  return (
    <Pressable
      onPress={() => {
        console.log('item', item);
        if (item.toLowerCase().includes('http')) {
          RTNNavigation?.navigateToH5(item, item, true);
        } else {
          RTNNavigation?.navigateToGaea(item, {});
        }
      }}>
      <Item>
        <ItemText>{item}</ItemText>
      </Item>
    </Pressable>
  );
};

const Demo = () => {
  return (
    <SafeAreaContainer>
      <Toolbar title={'demo'} enableBackButton={false} />
      <Container>
        <Button
          title="click ReferenceError"
          onPress={() => {
            setTimeout(() => {
              throw Error('throw 11111iosiosios Error');
            }, 1000);
          }}
        />
        <GaeaGradientView colors={['#73A9AD', '#F5F0BB']} gradientOrientation={GradientOrientation.LEFT_RIGHT} />
        <FlatList data={componentList} renderItem={({item, index}) => <ListItem item={item} key={index} />} keyExtractor={item => item} />
      </Container>
    </SafeAreaContainer>
  );
};

export default Demo;
