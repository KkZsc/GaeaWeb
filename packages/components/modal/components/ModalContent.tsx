import styled from '@emotion/native';
import {ReactElement} from 'react';

const ModalContentText = styled.Text({
  fontSize: 15,
  lineHeight: 18,
  color: '#666666',
  textAlign: 'center',
  marginTop: 8,
});

export default ({content}: {content: string | ReactElement}) => {
  return typeof content === 'string' ? <ModalContentText>{content}</ModalContentText> : content;
};
