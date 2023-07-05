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

// 空页面-数据为空
function EmptyDataView({params}: {params: string}) {
  return (
    <ContainerView>
      <EmptyImageView source={require('@/resource/kc_tiny_empty_content_common.png')} />
      <EmptyLabel>{params}</EmptyLabel>
    </ContainerView>
  );
}

export default EmptyDataView;
