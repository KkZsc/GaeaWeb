import styled from '@emotion/native';
import {FindInfoButtonModel} from '@gaea-web/shared/src/types/findData/findInfoButton';
import {Pressable} from 'react-native';
import RTNGaeaNavigation, {CommonActionModel} from 'rtn-gaea-navigation/js/NativeGaeaNavigation';

const ContainView = styled.View<{
  backgroundColor: string;
}>(props => ({
  marginLeft: 3,
  marginRight: 8 + 3,
  borderRadius: 6,
  overflow: 'hidden',
  backgroundColor: props.backgroundColor,
  height: 88,
  width: 36,
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: 8,
}));

const ViewMoreLabel = styled.Text<{
  color?: string;
}>(props => ({
  fontSize: 12,
  textAlign: 'center',
  color: props.color,
  width: 12,
}));

const FindHorizonRankMoreCell = (props: {rootTag: number; buttonModel: FindInfoButtonModel; isComicPage: boolean; saParams: {}}) => {
  const {text, fontColor, backgroundColor} = props.buttonModel;
  return (
    <Pressable
      onPress={() => {
        const actionClientModel: CommonActionModel = {
          ...props.buttonModel.actionType,
        };
        RTNGaeaNavigation?.findNavigateWithCommonActionClientModel(
          JSON.stringify(actionClientModel),
          '',
          props.isComicPage,
          props.saParams,
          {},
          props.rootTag,
        );
      }}>
      <ContainView backgroundColor={backgroundColor}>
        <ViewMoreLabel color={fontColor}>{text}</ViewMoreLabel>
      </ContainView>
    </Pressable>
  );
};

export default FindHorizonRankMoreCell;
