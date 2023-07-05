import {Image, Text} from 'react-native';
import styled from '@emotion/native';
import GaeaGradientViewNativeComponent from 'rtn-gaea-gradient-view/js/GaeaGradientViewNativeComponent';

export interface ComicLabelViewModel {
  text?: string;
  backgroundColor: string;
  fontColor: string;
  icon: string;
  width: number;
  height: number;
  isShowLabel: boolean;
  isShowImage: boolean;
}

const Container = styled.View<{
  layerOverflow: boolean;
}>(props => ({
  overflow: props.layerOverflow ? 'visible' : 'hidden',
  position: 'absolute',
  right: 6,
  top: 6,
  backgroundColor: 'transparent',
}));

const StyledImage = styled(Image)<{
  width?: number;
  height?: number;
  isShowImage?: boolean;
}>(props => ({
  backgroundColor: 'transparent',
  width: props.width || 20,
  height: props.height || 23,
}));

const StyledText = styled(Text)<{
  fontColor?: string;
}>(props => ({
  fontSize: 10,
  fontWeight: 'bold',
  backgroundColor: 'transparent',
  color: props.fontColor ? props.fontColor : '#222222',
  top: 2,
  bottom: 2,
  left: 4,
  right: 4,
}));

const GradientView = styled(GaeaGradientViewNativeComponent)({
  // Add gradient styles
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
});

export const ComicLabelView = (props: {viewModel: ComicLabelViewModel}) => {
  let colorStringArr = props.viewModel.backgroundColor.split('-');
  let gradientViewHidden = !props.viewModel.isShowLabel || colorStringArr.length <= 1;
  return (
    <Container layerOverflow={gradientViewHidden}>
      {props.viewModel.isShowImage && (
        <StyledImage
          source={{uri: props.viewModel.icon}}
          isShowImage={props.viewModel.isShowImage}
          width={props.viewModel.width}
          height={props.viewModel.height}
        />
      )}
      {props.viewModel.isShowLabel && <StyledText fontColor={props.viewModel.fontColor}>{props.viewModel.text}</StyledText>}
      {!gradientViewHidden && <GradientView colors={[`#00${colorStringArr[0]}`, `#FF${colorStringArr[1]}`]} />}
    </Container>
  );
};

export default ComicLabelView;
