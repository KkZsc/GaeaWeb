import styled from '@emotion/native';
import {FindMyWaitCouponSecondaryFinishTitleViewModel} from '../../hooks/useData';

const CornerContainerView = styled.View({
  height: 42,
  width: '100%',
  backgroundColor: '#f5f5f5',
});

const CornerTopView = styled.View({
  height: 24,
  borderRadius: 12,
  marginTop: 0,
  width: '100%',
  backgroundColor: 'white',
});

const CornerBottomView = styled.View({
  height: 30,
  marginTop: -12,
  width: '100%',
  backgroundColor: 'white',
});

const CornerBottomText = styled.Text({
  height: 18,
  marginLeft: 12,
  marginTop: 6,
  fontSize: 15,
  fontWeight: 'bold',
  alignContent: 'center',
});

export const FindMyWaitCouponFinishTitleCell = ({viewModel}: {viewModel: FindMyWaitCouponSecondaryFinishTitleViewModel}) => {
  return (
    <CornerContainerView>
      <CornerTopView />
      <CornerBottomView>
        <CornerBottomText allowFontScaling={false}>{viewModel.title}</CornerBottomText>
      </CornerBottomView>
    </CornerContainerView>
  );
};
