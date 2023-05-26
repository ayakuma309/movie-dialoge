import { NextPage } from 'next';
import React, { useState } from 'react'
import { DialogueModalProps } from '@/types/MovieTypes';
import { Box, Button, Modal, Typography } from '@mui/material';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  p: 4,
  margin: '0 auto',
  textAlign: 'center',
  display: 'flex',
  borderRadius: '10px',
  "@media screen and (max-width:900px)": {
    width: '80%',
    flexDirection: 'column',
  },
};
const DialogueModal: NextPage<DialogueModalProps> = (props) => {
  const { title, dialogue, poster_path } = props;
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Button onClick={handleOpen}>
        <p>{dialogue}</p>
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className='flex-1'>
            <img
              src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${poster_path}`}
              alt={title + ' poster'}
            />
          </div>
          <div className="flex flex-col flex-1 justify-center">
            <Typography id="modal-modal-description" sx={{ mt: 2 ,mb:2}}>
              {dialogue}
            </Typography>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <small className='text-gray-500'>{title}</small>
            </Typography>
          </div>
        </Box>
      </Modal>
    </div>
  )
}

export default DialogueModal;
