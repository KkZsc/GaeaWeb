import styled from '@emotion/native';
import {Pressable} from 'react-native';

const ModalFooterContainer = styled.View({
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  height: 44,
  marginTop: 24,
});

const ConfirmButtonText = styled.Text(({full}: {full: boolean}) => ({
  width: full ? 247 : 118,
  height: 44,
  lineHeight: 44,
  borderRadius: 22,
  color: '#222222',
  fontWeight: '500',
  textAlign: 'center',
  verticalAlign: 'middle',
  backgroundColor: '#FFE120',
}));

const CancelButtonText = styled.Text({
  width: 118,
  height: 44,
  lineHeight: 44,
  borderRadius: 22,
  marginRight: 11,
  verticalAlign: 'middle',
  backgroundColor: '#F5F5F5',
  color: '#222222',
  textAlign: 'center',
});

export default ({
  cancelText,
  confirmText,
  onCancel,
  onConfirm,
}: {
  cancelText?: string;
  confirmText?: string;
  onCancel?: () => void;
  onConfirm?: () => void;
}) => {
  return cancelText || confirmText ? (
    <ModalFooterContainer>
      {cancelText ? (
        <Pressable style={({pressed}) => (pressed ? {opacity: 0.2} : null)} onPress={() => onCancel?.()}>
          <CancelButtonText>{cancelText}</CancelButtonText>
        </Pressable>
      ) : null}
      {confirmText ? (
        <Pressable style={({pressed}) => (pressed ? {opacity: 0.2} : null)} onPress={() => onConfirm?.()}>
          <ConfirmButtonText full={!cancelText}>{confirmText}</ConfirmButtonText>
        </Pressable>
      ) : null}
    </ModalFooterContainer>
  ) : null;
};
