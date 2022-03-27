import * as React from 'react';
import { Backdrop, Box, Modal, Fade } from '@mui/material';
import { FormModalType } from './FormModal.type';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const FormModal = ({
  handleFormModal,
  openFormModal,
  children,
}: FormModalType) => {
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openFormModal}
        onClose={() => handleFormModal(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openFormModal}>
          <Box sx={style}>{children}</Box>
        </Fade>
      </Modal>
    </div>
  );
};
