import styled from '@emotion/native';
import {Pressable} from 'react-native';

const ContainerView = styled.View({
  flex: 1,
  backgroundColor: '#f5f5f5',
});

const EmptyImageView = styled.Image({
  alignSelf: 'center',
  marginTop: 156,
  height: 197,
  width: 202,
});

const EmptyTitleLabel = styled.Text({
  marginTop: 28,
  alignSelf: 'center',
  fontSize: 16,
  color: '#222222',
  fontWeight: '500',
  alignContent: 'center',
});

const EmptySubtitleLabel = styled.Text({
  marginTop: 8,
  alignSelf: 'center',
  fontSize: 14,
  fontWeight: '400',
  color: '#999999',
  alignContent: 'center',
});

const RefreshButtonContainterView = styled.View({
  width: 160,
  height: 36,
  marginTop: 32,
  alignSelf: 'center',
  alignContent: 'center',
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#ffe120',
  borderRadius: 18,
});

const RefreshButtonTitleLabel = styled.Text({
  fontSize: 15,
  fontWeight: '500',
  color: '#222222',
  width: '100%',
  height: 18,
  textAlign: 'center',
});

export const FindMyWaitCouponNoNetworkEmptyView = ({refreshTapped}: {refreshTapped?: () => void}) => {
  return (
    <ContainerView>
      <EmptyImageView source={require('@/resource/ic_pic_empty_failure.png')} />
      <EmptyTitleLabel>网络信号飞走啦</EmptyTitleLabel>
      <EmptySubtitleLabel>当前网络信号不佳，刷新试试看</EmptySubtitleLabel>
      <Pressable
        onPress={() => {
          refreshTapped?.();
        }}>
        <RefreshButtonContainterView>
          <RefreshButtonTitleLabel>刷新</RefreshButtonTitleLabel>
        </RefreshButtonContainterView>
      </Pressable>
    </ContainerView>
  );
};
