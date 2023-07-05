import styled from '@emotion/native';
import {ReactElement} from 'react';

const ModalTitleContainer = styled.View({
  justifyContent: 'center',
  alignItems: 'center',
});

const ModalTitleText = styled.Text({
  maxWidth: 247,
  fontSize: 17,
  lineHeight: 21,
  fontWeight: '500',
});

export default ({title}: {title: string | ReactElement}) => {
  return <ModalTitleContainer>{typeof title === 'string' ? <ModalTitleText numberOfLines={2}>{title}</ModalTitleText> : title}</ModalTitleContainer>;
};
