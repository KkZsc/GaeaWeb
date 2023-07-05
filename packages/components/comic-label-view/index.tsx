import styled from '@emotion/native';
import GaeaGradientView, {
  GradientOrientation,
} from 'rtn-gaea-gradient-view/js/GaeaGradientViewNativeComponent';
interface ComicLabelViewModel {
  isShowImage: boolean;
  isShowLabel: boolean;
  text: string;
  fontColor: string;
  backgroundColor: string;
  icon: string;
  width: number;
  height: number;
}

interface ComicLabelViewProps {
  viewModel: ComicLabelViewModel;
}

const Container = styled.View<{
  backgroundColor: string;
  isShowImage: boolean;
  overflow: boolean;
}>(props => ({
  borderRadius: 2,
  overflow: props.overflow ? 'hidden' : 'visible',
  backgroundColor: props.isShowImage ? 'transparent' : props.backgroundColor,
  width: '100%',
  height: '100%',
}));

const ImageView = styled.Image<{
  width: number;
  height: number;
}>(props => ({
  position: 'absolute',
  resizeMode: 'cover',
  backgroundColor: 'transparent',
  width: props.width ? props.width : 20,
  height: props.height ? props.height : 23,
}));
const StyledTextContainer = styled.View({
  position: 'absolute',
  margin: 'auto',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: 'transparent',
  justifyContent: 'center',
  alignItems: 'center',
});

const StyledText = styled.Text({
  position: 'absolute',
  fontSize: 10,
  fontWeight: '500',
  backgroundColor: 'transparent',
});

const GradientView = styled(GaeaGradientView)({
  position: 'absolute',
  width: '100%',
  height: '100%',
});

const ComicLabelView = ({props}: {props: ComicLabelViewProps}) => {
  const colorStringArr = props.viewModel.backgroundColor.split('-');
  const gradientColors =
    colorStringArr.length > 1
      ? colorStringArr.map(color => `#${color}`)
      : ['#00000000', '#ff000000'];
  return props.viewModel.isShowImage || props.viewModel.isShowLabel ? (
    <Container
      backgroundColor={props.viewModel.backgroundColor}
      isShowImage={props.viewModel.isShowImage}
      overflow={colorStringArr.length > 1}>
      {props.viewModel.isShowImage ? (
        <ImageView
          width={props.viewModel.width}
          height={props.viewModel.height}
          source={{uri: props.viewModel.icon}}
        />
      ) : props.viewModel.isShowLabel ? (
        <GradientView
          colors={gradientColors}
          gradientOrientation={GradientOrientation.TOP_BOTTOM}>
          <StyledTextContainer>
            <StyledText style={{color: `#${props.viewModel.fontColor}`}}>
              {props.viewModel.text}
            </StyledText>
          </StyledTextContainer>
        </GradientView>
      ) : null}
    </Container>
  ) : null;
};

export default ComicLabelView;
