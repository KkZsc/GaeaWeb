import styled from '@emotion/native';
import LoadingIcon from './LoadingIcon';
import {Dimensions, ViewStyle} from 'react-native';
import {LoadingProps, LoadingTheme} from '../types';

const LoadingContainer = styled.View({
  position: 'absolute',
  left: 0,
  right: 0,
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
  alignItems: 'center',
  justifyContent: 'center',
});

const LoadingMask = styled.View(({styles, theme, mask}: {styles: ViewStyle; theme: LoadingTheme; mask: boolean}) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: !mask || theme === 'dark' ? 'rgba(0 0 0 / 0)' : 'rgba(0 0 0 / 0.7)',
  ...styles,
}));

export default (props: LoadingProps) => {
  return (
    <LoadingContainer>
      {props.mask && <LoadingMask nativeID="gaea-web-loading-mask" mask={props.mask} theme={props.theme} styles={props.mask && props.maskStyle} />}
      <LoadingIcon theme={props.theme} text={props.text} shadow={props.theme === 'light' && !props.mask} />
    </LoadingContainer>
  );
};
