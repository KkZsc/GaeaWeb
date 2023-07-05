import styled from '@emotion/native';
import {windowHeight, windowWidth} from '@gaea-web/shared/src/uiConstant';
import React from 'react';
import {SafeAreaView, SafeAreaViewProps} from 'react-native-safe-area-context';
import NativeSafeAreaView from 'react-native-safe-area-context/lib/typescript/specs/NativeSafeAreaView';

export const SafeAreaContainer = styled(SafeAreaView)({
  flex: 1,
  width: windowWidth,
  height: windowHeight,
});

/**
 * 为解决react-native-pager-view的PagerView在ios无法正常显示的问题,Container需要是SafeAreaView
 */
type NativeSafeAreaViewInstance = InstanceType<typeof NativeSafeAreaView>;
export const FullScreenStyled = styled(SafeAreaView)({
  flex: 1,
  width: windowWidth,
  height: windowHeight,
});
export const FullScreenContainer: React.ForwardRefExoticComponent<SafeAreaViewProps & React.RefAttributes<NativeSafeAreaViewInstance>> =
  React.forwardRef<NativeSafeAreaViewInstance, SafeAreaViewProps>(({edges, ...props}, ref) => {
    return <FullScreenStyled {...props} edges={edges ?? ['bottom', 'left', 'right']} ref={ref} />;
  });

export const MatchParentStyle = {
  width: '100%',
  height: '100%',
  flex: 1,
};

export const MatchParentView = styled.View({
  ...MatchParentStyle,
});
