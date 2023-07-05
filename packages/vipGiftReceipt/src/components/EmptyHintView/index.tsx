import styled from '@emotion/native';

const ContainerView = styled.View({
  flex: 1,
  backgroundColor: '#f5f5f5',
});

const HintImageView = styled.Image({
  alignSelf: 'center',
  marginTop: 156,
  width: 300,
});

export const NoNetworkEmptyView = () => {
  return (
    <ContainerView>
      <HintImageView source={require('@/resource/empty_no_network.png')} />
    </ContainerView>
  );
};

export const NoGiftEmptyView = () => {
  return (
    <ContainerView>
      <HintImageView source={require('@/resource/pic_empty_gift_receipt.png')} />
    </ContainerView>
  );
};
