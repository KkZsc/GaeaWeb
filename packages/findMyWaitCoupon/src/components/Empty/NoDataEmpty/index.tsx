import styled from '@emotion/native';

const ContainerView = styled.View({
  flex: 1,
  backgroundColor: '#f5f5f5',
});

const EmptyImageView = styled.Image({
  alignSelf: 'center',
  marginTop: 156,
  height: 182,
  width: 179,
});

const EmptyLabel = styled.Text({
  marginTop: 30,
  alignSelf: 'center',
  fontSize: 14,
  color: '#999999',
  alignContent: 'center',
});

export const FindMyWaitCouponNoDataEmptyView = () => {
  return (
    <ContainerView>
      <EmptyImageView source={require('@/resource/ic_pic_empty_data.png')} />
      <EmptyLabel>暂无等免作品</EmptyLabel>
    </ContainerView>
  );
};
