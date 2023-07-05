import styled from '@emotion/native';

const ContainerView = styled.View({
  flex: 1,
  backgroundColor: 'transparent',
});

const EmptyImageView = styled.Image({
  alignSelf: 'center',
  marginTop: 80,
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

export const FindMyWaitCouponNoFinishListEmptyView = () => {
  return (
    <ContainerView>
      <EmptyImageView source={require('@/resource/ic_pic_empty_data.png')} />
      <EmptyLabel>暂时没有生成中的作品，快去用等免解锁作品吧</EmptyLabel>
    </ContainerView>
  );
};
