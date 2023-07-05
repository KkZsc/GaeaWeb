import React from 'react';
import styled from '@emotion/native';
import {Dimensions} from 'react-native';

const Container = styled.View({
  width: Dimensions.get('window').width - 24,
  height: 36,
  flexDirection: 'row',
  alignItems: 'center',
  alignSelf: 'center',
  justifyContent: 'space-between',
});

const ContainerView = (props: React.PropsWithChildren) => {
  return <Container>{props.children}</Container>;
};

export default ContainerView;
