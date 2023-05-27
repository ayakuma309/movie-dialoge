import { NextPage } from 'next';
import React, { useState } from 'react'
import { DialogueModalProps } from '@/types/MovieTypes';
import { Box, Modal, Typography } from '@mui/material';

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

  const fontRandomStyle = () => {
    const fontSize = Math.floor(Math.random() * 25 + 15);
    const positionX = Math.floor(Math.random() * 20) + 10;

    const randomStyle = {
      left: `${positionX}%`,
      fontSize: `${fontSize}px`,
    };

    return randomStyle;
  };

  return (
    <div>
      <button onClick={handleOpen}>
        <div
          className="dialogue mt-7 transition duration-500 ease-in-out
          transform hover:-translate-y-1 hover:scale-110 hover:text-blue-900"
          style={fontRandomStyle()}
          >
          {dialogue}
        </div>
      </button>
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
              className="mx-auto"
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
