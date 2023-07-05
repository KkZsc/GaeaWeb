import {useEffect, useState} from 'react';
import styled from '@emotion/native';
import {Dialog} from '../../dialog/index';
import ModalTitle from './ModalTitle';
import ModalContent from './ModalContent';
import ModalFooter from './ModalFooter';
import {ModalOptions} from '../types';

const Container = styled.View({
  width: 287,
  paddingTop: 24,
  paddingBottom: 24,
  paddingLeft: 20,
  paddingRight: 20,
  backgroundColor: 'white',
  borderRadius: 12,
});

export default (options: ModalOptions) => {
  const {title, content, maskClosable, cancelText, confirmText, onCancel, onConfirm, onClose, onOpen} = options;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <Dialog
      visible={visible}
      options={{
        maskClosable,
        onMaskClick: () => {
          setVisible(false);
        },
        onClose,
        onOpen,
      }}>
      <Container>
        {title && <ModalTitle title={title} />}
        {content && <ModalContent content={content} />}
        <ModalFooter
          cancelText={cancelText}
          confirmText={confirmText}
          onCancel={async () => {
            if (typeof onCancel === 'function') {
              await onCancel();
              setVisible(false);
            } else {
              setVisible(false);
            }
          }}
          onConfirm={async () => {
            if (typeof onConfirm === 'function') {
              await onConfirm();
              setVisible(false);
            } else {
              setVisible(false);
            }
          }}
        />
      </Container>
    </Dialog>
  );
};
