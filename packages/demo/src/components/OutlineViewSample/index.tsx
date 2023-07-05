import * as React from 'react';
import styled from '@emotion/native';
import {Animated, Dimensions, Pressable} from 'react-native';
import RTNOutlineView from 'rtn-gaea-outline-view/js/GaeaOutlineViewNativeComponent';
import {getOutlineViewCustomData} from 'rtn-gaea-outline-view/convenience/GaeaOutlineViewMethod';
import {SafeAreaProvider, useSafeAreaInsets} from 'react-native-safe-area-context';
import BackButton from '@gaea-web/components/back-button';
import CircleProgress from '@gaea-web/components/circle-progress';

const itemImpKeys = ['itemName', 'comicId', 'topicId', 'isAccountValid', 'pageName'];

const {width} = Dimensions.get('window');

const TopContainerView = styled.View({
  height: 54,
  width: '100%',
  flexDirection: 'row',
  alignItems: 'center',
});

const TopTitleText = styled.Text({
  left: 12,
  fontSize: 15,
});

const HorizontalListContainerView = styled.View({
  height: 94,
  width: '100%',
  top: 0,
});

const HorizontalList = styled.FlatList({
  paddingHorizontal: 12,
});

const HorizontalItemContainerView = styled.View({
  flexDirection: 'column',
  height: 78,
  width: 64,
});

const HorizontalItemImageView = styled.View({
  backgroundColor: 'green',
  width: 54,
  height: 54,
  borderRadius: 27,
});

const HorizontalItemText = styled.Text({fontSize: 13, top: 8});

const TopCornerContainerView = styled.View({
  height: 42,
  width: '100%',
  flexDirection: 'column',
});

const TopCornerTopView = styled.View({
  height: 24,
  borderRadius: 12,
  top: 0,
  width: '100%',
  backgroundColor: 'white',
});

const TopCornerBottomView = styled.View({
  height: 30,
  top: -12,
  width: '100%',
  backgroundColor: 'white',
});

const TopCornerBottomText = styled.Text({
  height: 18,
  left: 12,
  top: 6,
  fontSize: 15,
  alignContent: 'center',
});

const ItemContainerView = styled.View({
  flexDirection: 'row',
  height: 114,
  backgroundColor: 'white',
});

const CoverImageContainerView = styled.View({
  height: 90,
  width: 160,
  borderRadius: 6,
  left: 12,
  top: 12,
  bottom: 12,
  backgroundColor: '#ff0000',
  overflow: 'hidden',
});

const ItemRightContainerView = styled.View({
  left: 12 + 10,
  top: 12,
  height: 90,
  width: width - 160 - 12 - 10 - 12,
  backgroundColor: '#00ff00',
});

const ItemRightTitleText = styled.Text({
  fontSize: 16,
  top: 8,
});

const ItemClockContainerView = styled.View({
  flexDirection: 'row',
  backgroundColor: '#0000ff',
  height: 17,
  top: 6 + 8,
  width: '100%',
  alignItems: 'center',
});

const ItemClockImageView = styled.View({
  height: 14,
  width: 14,
  backgroundColor: 'yellow',
});

const ItemClockText = styled.Text({
  color: 'gray',
  left: 5,
  fontSize: 14,
});

const ItemRightBottomText = styled.Text({
  fontSize: 13,
  color: 'gray',
  top: 6 + 8 + 15,
});

const Container = styled.View({
  flex: 1,
  width: '100%',
});

const FlatListAnimatedContainer = styled(Animated.FlatList)({
  paddingVertical: 0,
  backgroundColor: '#f0f0f0',
  paddingTop: 0,
});

const NavigationContainerView = styled.View({
  position: 'absolute',
  top: 0,
  left: 0,
  width: width,
});

const NavigationAnimatedView = styled(Animated.View)({
  position: 'absolute',
  top: 0,
  left: 0,
  width: width,
  backgroundColor: 'white',
});

const NavigationToolBarView = styled.View({
  marginLeft: 12,
  flexDirection: 'row',
  alignItems: 'center',
});

const NavigationToolBarTitleText = styled.Text({
  fontSize: 17,
  width: width - 12 * 2 - 24 * 2,
  textAlign: 'center',
});

const NavigationToolBarNotificationView = styled.View({
  marginRight: 12,
  backgroundColor: 'yellow',
  width: 24,
  height: 24,
});

const TopTitleContainerView = () => {
  return (
    <TopContainerView>
      <TopTitleText numberOfLines={1}>免费读生成中</TopTitleText>
    </TopContainerView>
  );
};

const HorizontalListItem = ({index}: {index: number}) => {
  const viewRef = React.useRef<any | null>(null);
  return (
    <HorizontalItemContainerView>
      <RTNOutlineView
        ref={viewRef}
        isOpenExposure={true}
        onExposure={event => {
          console.log('收到横滑曝光事件:' + event.nativeEvent.eventDataJSON);
        }}
        validExposurePercent={0.5}
        eventDataJSON={JSON.stringify({itemName: 'item' + index})}
        templateArray={itemImpKeys}
        isNeedNativeTrackCommonItemImp={true}>
        <Pressable
          onPress={async () => {
            const customData = await getOutlineViewCustomData(viewRef, ['comicId']);
            console.log(JSON.stringify(customData));
          }}>
          <HorizontalItemImageView>
            <CircleProgress percent={Math.random()} strokeWidth={3} size={54} />
          </HorizontalItemImageView>
          <HorizontalItemText numberOfLines={1}>标题标题标题标题标题标题标题标题标题标题标题标</HorizontalItemText>
        </Pressable>
      </RTNOutlineView>
    </HorizontalItemContainerView>
  );
};

const TopCornerView = () => {
  return (
    <TopCornerContainerView>
      <TopCornerTopView />
      <TopCornerBottomView>
        <TopCornerBottomText>可免费阅读</TopCornerBottomText>
      </TopCornerBottomView>
    </TopCornerContainerView>
  );
};

const ListItem = ({index}: {index: number}) => {
  if (index === 0) {
    return <TopTitleContainerView />;
  } else if (index === 1) {
    return (
      <HorizontalListContainerView>
        <HorizontalList
          horizontal={true}
          data={Array.from({length: 10})}
          renderItem={item => {
            return <HorizontalListItem index={item.index} />;
          }}
          keyExtractor={(item, itemIndex) => itemIndex.toString()}
          showsHorizontalScrollIndicator={false}
        />
      </HorizontalListContainerView>
    );
  } else if (index === 2) {
    return <TopCornerView />;
  } else {
    return (
      <RTNOutlineView
        isOpenExposure={true}
        onExposure={event => {
          console.log('收到曝光事件:' + event.nativeEvent.eventDataJSON);
        }}
        validExposurePercent={0.5}
        eventDataJSON={JSON.stringify({itemName: 'item' + index})}
        templateArray={itemImpKeys}
        isNeedNativeTrackCommonItemImp={true}>
        <ItemContainerView>
          <CoverImageContainerView>{/* <CoverImage source={require('')}></CoverImage> */}</CoverImageContainerView>
          <ItemRightContainerView>
            <ItemRightTitleText numberOfLines={1}>{'ItemItemItemItemItemItemItemItem' + index}</ItemRightTitleText>
            <ItemClockContainerView>
              <ItemClockImageView />
              <ItemClockText numberOfLines={1}>标题标题标题标题标题标题标题标题标题标题标题标</ItemClockText>
            </ItemClockContainerView>
            <ItemRightBottomText numberOfLines={1}>剩余话数剩余话数剩余话数剩余话数</ItemRightBottomText>
          </ItemRightContainerView>
        </ItemContainerView>
      </RTNOutlineView>
    );
  }
};

const MainView = () => {
  //测试一段时间后更新属性FindPage为NewFindPage，新曝光的埋点会使用NewFindPage上报
  const [findPage, setFindPage] = React.useState('FindPage');
  const safeAreaInsets = useSafeAreaInsets();
  const opacity = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setFindPage('NewFindPage');
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, []);
  return (
    <Container>
      <RTNOutlineView
        eventDataJSON={JSON.stringify({
          pageName: findPage,
          isAccountValid: false,
          comicId: 1080,
        })}>
        <RTNOutlineView eventDataJSON={JSON.stringify({topicId: 750})}>
          <FlatListAnimatedContainer
            style={{paddingTop: safeAreaInsets.top + 44}}
            onScroll={Animated.event(
              [
                {
                  nativeEvent: {
                    contentOffset: {
                      y: opacity,
                    },
                  },
                },
              ],
              {
                useNativeDriver: true,
              },
            )}
            data={Array.from({length: 50})}
            keyExtractor={(item, index) => index.toString()}
            renderItem={ListItem}
            showsVerticalScrollIndicator={false}
          />
        </RTNOutlineView>
      </RTNOutlineView>
      <NavigationContainerView>
        <NavigationAnimatedView
          style={{
            height: safeAreaInsets.top + 44,
            opacity: opacity.interpolate({
              inputRange: [0, 100],
              outputRange: [0, 1],
              extrapolate: 'clamp',
            }),
          }}
        />
        <NavigationToolBarView style={{marginTop: safeAreaInsets.top + 10}}>
          <BackButton />
          <NavigationToolBarTitleText>我的等免</NavigationToolBarTitleText>
          <NavigationToolBarNotificationView />
        </NavigationToolBarView>
      </NavigationContainerView>
    </Container>
  );
};

const OultineExposureSample = () => {
  return (
    <SafeAreaProvider>
      <MainView />
    </SafeAreaProvider>
  );
};

export default OultineExposureSample;
