import React, {useEffect, useRef, ReactNode, useMemo} from 'react';
import {Animated, ViewStyle, StyleProp, StyleSheet, View} from 'react-native';
import styled from '@emotion/native';

const ItemContainer = styled(Animated.View)({
  justifyContent: 'center',
});

interface MarqueeProps {
  children: ReactNode | ReactNode[];
  height: number;
  rollDuration?: number;
  stayDuration?: number;
  style?: StyleProp<ViewStyle>;
}

/**
 * 竖向跑马灯
 * @param rollDuration  滚动时长
 * @param stayDuration  停留时长
 */
export const MarqueeView: React.FC<MarqueeProps> = ({children, height, rollDuration = 500, stayDuration = 2000, style}) => {
  const scrollAnim = useRef(new Animated.Value(0)).current;

  const childrenArray = useMemo(() => React.Children.toArray(children), [children]);

  useEffect(() => {
    let rolling = childrenArray.length > 1;
    let index = 0;
    scrollAnim.setValue(0);
    const startAnimation = () => {
      if (!rolling) {
        return;
      }
      Animated.timing(scrollAnim, {
        toValue: -height * (index + 1),
        duration: rollDuration,
        useNativeDriver: true,
        delay: stayDuration,
      }).start(() => {
        index++;
        if (index === childrenArray.length) {
          scrollAnim.setValue(0);
          index = 0;
        }
        startAnimation();
      });
    };
    startAnimation();

    return () => {
      rolling = false;
    };
  }, [childrenArray, height, rollDuration, stayDuration, scrollAnim]);

  const transformStyle = {
    transform: [{translateY: scrollAnim}],
  };

  return (
    <View style={[StyleSheet.flatten(style), {overflow: 'hidden', height}]}>
      <Animated.View style={transformStyle}>
        {childrenArray.concat(childrenArray[0]).map((item, index) => (
          <ItemContainer
            key={index}
            style={{
              height,
              opacity: scrollAnim.interpolate({
                inputRange: [-height * (index + 1), -height * index, -height * (index - 1)],
                outputRange: [0, 1, 0.5],
                extrapolate: 'clamp',
              }),
            }}>
            {item}
          </ItemContainer>
        ))}
      </Animated.View>
    </View>
  );
};

export default MarqueeView;
