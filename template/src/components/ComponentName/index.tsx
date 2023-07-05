import React from 'react';
import styled from '@emotion/native';

const Container = styled.View({
  flex: 1,
});

const ContainerView = (props: React.PropsWithChildren) => {
  return <Container>{props.children}</Container>;
};

export default ContainerView;
