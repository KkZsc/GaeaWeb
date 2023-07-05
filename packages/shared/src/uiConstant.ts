import {Dimensions, Platform, StatusBar, PixelRatio} from 'react-native';

export const StatusBarHeight = StatusBar.currentHeight || (Platform.OS === 'ios' ? 20 : 24);

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;

export const OpacityVisible = 1;
export const OpacityInvisible = 0;

export const OnePixel = 1 / PixelRatio.get();
