import styled from '@emotion/native';
import {FindMyWaitCouponSecondaryWaitingTitleViewModel} from '../../hooks/useData';

const ContainerView = styled.View({
  height: 54,
  width: '100%',
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#f5f5f5',
});

const TitleText = styled.Text({
  marginLeft: 12,
  fontSize: 15,
  fontWeight: 'bold',
});

const SpeedUpTagBackgroundView = styled.View({
  height: 16,
  marginLeft: 8,
  borderRadius: 3,
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#2AEE6A',
});

const SpeedUpTagText = styled.Text({
  flex: 1,
  fontSize: 10,
  textAlign: 'center',
  fontWeight: '500',
  color: '#222222',
});

export const FindMyWaitCouponWaitingTitleCell = ({viewModel}: {viewModel: FindMyWaitCouponSecondaryWaitingTitleViewModel}) => {
  return (
    <ContainerView>
      <TitleText numberOfLines={1} allowFontScaling={false}>
        {viewModel.title}
      </TitleText>
      <SpeedUpTagBackgroundView
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          width: viewModel.canSpeedUp ? 38 : 0,
        }}>
        <SpeedUpTagText allowFontScaling={false}>可加速</SpeedUpTagText>
      </SpeedUpTagBackgroundView>
    </ContainerView>
  );
};
