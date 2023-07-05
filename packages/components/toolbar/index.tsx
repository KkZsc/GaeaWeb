import React, {ProfilerProps, useState, useEffect} from 'react';
import styled from '@emotion/native';
import {StatusBar, Dimensions, Platform, ColorValue, Animated} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import BackButton from '../back-button';

const DEFAULT_TINT_COLOR = '#333333';

type Props = {
  title?: string;
  lrRatio?: number; // title为空时左右区域的宽度分配比例，1: 左右平分，0: 右边占满，2: 左边占满，title不为空时左右平分
  /** 给title、按钮(包括返回按钮)等元素上色,可以在颜色上做动画,缺省为 #333333 */
  tintColor?: ColorValue | Animated.AnimatedInterpolation<string>;
  enableBackButton?: boolean; // 不传使用默认button
  renderRight?: () => React.ReactNode;
} & Omit<ProfilerProps, 'onRender' | 'id'>;

type ToolbarWidthInfo = {
  center: number;
  right: number;
  left: number;
};

export interface INavButtonProps {
  title?: string;
  image?: number;
  onPress: () => void;
}

const Container = styled.View<{
  navigationHeight: number;
}>(props => ({
  flexDirection: 'row',
  marginTop: 0,
  height: props.navigationHeight,
  alignItems: 'center',
  justifyContent: 'space-between',
}));

const LeftContainer = styled.Pressable(({width}: {width: number}) => ({
  width,
  height: '100%',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-start',
  marginLeft: 16,
}));

const RightContainer = styled.View(({width}: {width: number}) => ({
  width,
  height: '100%',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-end',
  marginRight: 16,
}));

const CenterContainer = styled.View<{
  width: number;
}>(props => ({
  position: 'absolute',
  left: '50%',
  width: props.width,
  height: '100%',
  transform: [{translateX: (props.width / 2.0) * -1}],
  alignContent: 'stretch',
  alignItems: 'center',
  justifyContent: 'center',
}));

const TitleText = styled(Animated.Text)(({padding, color}: {padding: boolean; color?: ColorValue | Animated.AnimatedInterpolation<string>}) => ({
  position: 'absolute',
  fontSize: 17,
  fontWeight: 'bold',
  marginVertical: 0,
  marginHorizontal: 0,
  height: '100%',
  lineHeight: 48,
  textAlignVertical: 'center',
  color,
  ...(padding
    ? {
        paddingLeft: 16,
        paddingRight: 16,
      }
    : {}),
}));

export const SafeAreaViewContainer = styled(SafeAreaView)({
  flex: 1,
  marginTop: StatusBar.currentHeight || (Platform.OS === 'ios' ? 20 : 24),
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
});

const screenWidth = Dimensions.get('window').width;
// 屏幕宽 - 左右留白16
const containerWidth = screenWidth - 16 * 2;

const Title = ({
  title,
  color,
  lrRatio = 1,
  onLayout,
}: {
  title?: string;
  lrRatio?: number;
  color?: ColorValue | Animated.AnimatedInterpolation<string>;
  onLayout: (widthInfo: ToolbarWidthInfo) => void;
}) => {
  useEffect(() => {
    if (!title) {
      const left = (containerWidth / 2) * lrRatio;
      const right = containerWidth - left;

      onLayout({
        center: 0,
        right,
        left,
      });
    }
  }, [title, lrRatio, onLayout]);

  return title ? (
    <TitleText
      allowFontScaling={false}
      padding={!!title}
      color={color}
      onLayout={event => {
        const {width} = event.nativeEvent.layout;
        const _widthInfo = {
          center: width,
          left: 0,
          right: 0,
        };

        _widthInfo.left = _widthInfo.right = containerWidth - (screenWidth / 2 + width / 2);

        onLayout(_widthInfo);
      }}>
      {title}
    </TitleText>
  ) : null;
};

export default ({title, lrRatio = 1, enableBackButton = true, tintColor = DEFAULT_TINT_COLOR, renderRight}: Props) => {
  const [toolbarWidthInfo, setToolbarWidthInfo] = useState<ToolbarWidthInfo>({
    center: 0,
    left: 0,
    right: 0,
  });

  return (
    <Container navigationHeight={48}>
      <LeftContainer width={toolbarWidthInfo.left}>{enableBackButton === false ? null : <BackButton arrowColor={tintColor} />}</LeftContainer>
      <CenterContainer width={toolbarWidthInfo.center}>
        <Title color={tintColor} title={title} lrRatio={lrRatio} onLayout={setToolbarWidthInfo} />
      </CenterContainer>
      <RightContainer width={toolbarWidthInfo.right}>{renderRight && renderRight()}</RightContainer>
    </Container>
  );
};
