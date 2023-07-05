import styled from '@emotion/native';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Animated, StyleProp, ViewStyle} from 'react-native';
import {HeaderOverlayBehavior, createOpacity} from './headerOverlayBehavior';
import {OpacityInvisible} from '@gaea-web/shared';
export * from './headerOverlayBehavior';

export type StickyHeaderScaffoldProps = {
  /*用于设置Container的宽高、背景色等*/
  containerStyle?: StyleProp<ViewStyle>;
  /*在向上滚动过程中会被推上去直到完全隐藏的header*/
  renderExpandHeader?: (offsetPercent: Animated.AnimatedInterpolation<number>) => React.ReactElement | null;
  /**
   * 顶端覆盖header的部分(通常放置有返回键的导航条/ToolBar),可通过headerOverlayBehavior
   * 进行配置或者使用接受到的offsetPercent进行自定义配置
   */
  renderHeaderOverlay?: (offsetPercent: Animated.AnimatedInterpolation<number>) => React.ReactElement | null;
  /**
   * 内容部分
   * 注意:如果内容里面有ScrollView/VirtualizedList/FlatList/SectionList,
   * 需要在它们上面启用gaeaNestedScrollEnabled以支持嵌套滚动
   */
  renderContent: (offsetPercent: Animated.AnimatedInterpolation<number>) => React.ReactElement;
  /**
   * 配置HeaderOverlay部分何时可见,提供了2种效果,见headerOverlayBehavior的
   * HeaderOverlayBehaviorEmerge和HeaderOverlayBehaviorPin
   */
  headerOverlayBehavior?: HeaderOverlayBehavior;
};

const Container = styled.View({
  //默认占据剩余空间
  flex: 1,
});

const HeaderOverlayContainerStyled = styled.View({
  zIndex: 2,
  position: 'absolute',
  width: '100%',
});

const HeaderOverlayStyled = styled(Animated.View)({
  flex: 1,
  width: '100%',
});

const OuterScrollViewStyled = styled(Animated.ScrollView)({
  width: '100%',
  height: '100%',
});

const ExpandHeaderStyled = styled.View({});

const ContentStyled = styled.View({width: '100%'});

const NestedScrollScaffold = ({
  containerStyle,
  renderExpandHeader,
  renderHeaderOverlay,
  renderContent,
  headerOverlayBehavior,
}: StickyHeaderScaffoldProps) => {
  const [containerHeight, setContainerHeight] = useState(0);
  const [expandHeaderHeight, setExpandHeaderHeight] = useState(0);
  const [overlayHeight, setOverlayHeight] = useState(0);

  const [overlayTouchable, setOverlayTouchable] = useState(false);
  const maxOffset = expandHeaderHeight - overlayHeight;
  const contentHeight = containerHeight - overlayHeight;
  const offset = useRef(new Animated.Value(0)).current;
  const offsetPercent = useMemo(() => Animated.multiply(offset, maxOffset === 0 ? 0 : 1 / maxOffset), [offset, maxOffset]);

  /**
   * 使用ref保存这个Listener是因为需要在StickyHeaderScaffold的return
   * 之前设置好overlayOpacity的Listener
   */
  const opacityListener = useRef<(value: number) => void>();
  const overlayOpacity = useMemo(() => {
    const opacity = createOpacity(offsetPercent, headerOverlayBehavior);
    opacity?.addListener(({value}) => opacityListener.current?.(value));
    return opacity;
  }, [offsetPercent, headerOverlayBehavior]);

  useEffect(() => {
    opacityListener.current = value => {
      if (value === OpacityInvisible && overlayTouchable) {
        //HeaderOverlay隐藏的时候不能点击
        setOverlayTouchable(false);
      }
      if (value !== OpacityInvisible && !overlayTouchable) {
        setOverlayTouchable(true);
      }
    };
  }, [overlayTouchable]);

  return (
    <Container
      style={[containerStyle]}
      onLayout={e => {
        setContainerHeight(e.nativeEvent.layout.height);
      }}>
      <HeaderOverlayContainerStyled pointerEvents={overlayTouchable ? 'auto' : 'none'}>
        <HeaderOverlayStyled
          style={{opacity: overlayOpacity}}
          onLayout={e => {
            setOverlayHeight(e.nativeEvent.layout.height);
          }}>
          {renderHeaderOverlay ? renderHeaderOverlay(offsetPercent) : null}
        </HeaderOverlayStyled>
      </HeaderOverlayContainerStyled>

      <OuterScrollViewStyled
        gaeaNestedScrollParent
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: offset,
                },
              },
            },
          ],
          {useNativeDriver: true},
        )}>
        <ExpandHeaderStyled
          onLayout={e => {
            setExpandHeaderHeight(e.nativeEvent.layout.height);
          }}>
          {renderExpandHeader ? renderExpandHeader(offsetPercent) : null}
        </ExpandHeaderStyled>

        <ContentStyled style={[{height: contentHeight}]}>{renderContent(offsetPercent)}</ContentStyled>
      </OuterScrollViewStyled>
    </Container>
  );
};

export default NestedScrollScaffold;
