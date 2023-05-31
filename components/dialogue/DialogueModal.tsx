import { NextPage } from 'next';
import React, { useEffect, useState } from 'react'
import { DialogueModalProps } from '@/types/MovieTypes';
import { Box, Modal, Typography } from '@mui/material';
import Link from 'next/link';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useUser } from '@/lib/auth';
import { deleteDoc, doc, getFirestore, onSnapshot, setDoc } from 'firebase/firestore';

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
  const { documentId,title, dialogue, poster_path } = props;
  const [open, setOpen] = useState(false);
  const user = useUser();
  const db = getFirestore();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //いいねを保存
  const handleLikeSave = () => {
    if (!user) return;
    setDoc(doc(db, 'posts', documentId, 'likes', user.uid), {
      username: user.displayName,
    });
    setIsLiked(true);
  };

  const handleUnlikeSave = () => {
    if (!user) return;
    deleteDoc(doc(db, 'posts', documentId, 'likes', user.uid));
    setIsLiked(false);
  };

  // いいね済みかどうかを判定するためのuseState
  const [isLiked, setIsLiked] = useState(false);

  // いいね済みかどうかを判定するuseEffect
  useEffect(() => {
    if (user) {
      const unsubscribe = onSnapshot(
        doc(db, 'posts', documentId, 'likes', user.uid),
        (snapshot) => {
          if (snapshot.exists()) {
            setIsLiked(true);
          } else {
            setIsLiked(false);
          }
        }
      );
      return () => unsubscribe();
    }
  }, [documentId, user]);
  return (
    <div>
      <button onClick={handleOpen}>
        <div
          className="dialogue mt-7 transition duration-500 ease-in-out
          transform hover:-translate-y-1 hover:scale-110 hover:text-blue-900"
          >
          <div className="card transition duration-500 ease-in-out
          transform hover:-translate-y-1 hover:scale-110 hover:text-blue-900">
            <div className="card__content">
              <p className="description">
                {dialogue}
              </p>
              <p className="title text-gray-600 mt-3">
                <small>{title}より</small>
              </p>
            </div>
          </div>
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
            <Link href={`/movie/${documentId}/movieDetail`}>
              <button className='btn btn-primary'>
                詳しく見る
              </button>
            </Link>
            {isLiked ? <FavoriteIcon color="secondary" onClick={handleUnlikeSave}/> : <FavoriteBorderIcon onClick={handleLikeSave}/>}
          </div>
        </Box>
      </Modal>
    </div>
  )
}

export default DialogueModal;
