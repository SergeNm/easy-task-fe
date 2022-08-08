import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import NewKidForm from './NewKidForm';
import { useDispatch, useSelector } from 'react-redux';
import { toggleKidModal } from '../redux/slices/parent.slice';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function NewKid() {
  const { openModal } = useSelector((state) => state.parent.kid);
  const dispatch = useDispatch();
  const handleOpen = () => dispatch(toggleKidModal(true));
  const handleClose = () => dispatch(toggleKidModal(false));

  return (
    <div>
      <Button onClick={handleOpen}>Add Child</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openModal}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModal}>
          <Box sx={style}>
           <NewKidForm />
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
