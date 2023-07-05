import styled from '@emotion/native';

const ContainerView = styled.View({
  width: 117,
  height: 121,
  alignSelf: 'center',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'red',
});

const ErrorImage = styled.Image({
  width: 28,
  height: 28,
});

const Title = styled.Text({
  width: '80%',
  fontSize: 15,
});

const Detail = styled.Text({
  width: '80%',
  fontSize: 13,
});

export const ToastContent = ({title, detail}: {title: string; detail: string}) => {
  return (
    <ContainerView>
      <ErrorImage source={require('@/resource/acktoast_error.png')} />
      <Title>{title}</Title>
      <Detail>{detail}</Detail>
    </ContainerView>
  );
};
