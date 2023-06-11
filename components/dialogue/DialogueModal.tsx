import React, { useEffect, useState } from 'react'
import { NextPage } from 'next';
import Link from 'next/link';
import { TwitterIcon, TwitterShareButton } from 'react-share';
import { deleteDoc, doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';
import { useUser } from '@/lib/auth';
import { DialogueModalProps } from '@/types/MovieTypes';
import { Box, Modal, Typography } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

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
    setDoc(doc(db, 'movies', documentId, 'likes', user.uid), {
      username: user.displayName,
    });
    setIsLiked(true);
  };

  const handleUnlikeSave = () => {
    if (!user) return;
    deleteDoc(doc(db, 'movies', documentId, 'likes', user.uid));
    setIsLiked(false);
  };

  // いいね済みかどうかを判定するためのuseState
  const [isLiked, setIsLiked] = useState(false);

  // いいね済みかどうかを判定するuseEffect
  useEffect(() => {
    const checkIfLiked = async () => {
      try {
        if (user) {
          const docRef = doc(db, 'movies', documentId, 'likes', user.uid);
          const docSnap = await getDoc(docRef);
          const isLiked = docSnap.exists();
          setIsLiked(isLiked);
        }
      } catch (error) {
        console.error('Error checking like status: ', error);
      }
    };

    checkIfLiked();
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
            <div>
              <TwitterShareButton
                url={`https://movie-dialoge.vercel.app/`}
                title={`${dialogue} by${title}`}
                hashtags={['ScriptSelectMovies']}
              >
                <TwitterIcon size={40} round />
              </TwitterShareButton>
            </div>
            {user !== null && (
              <div className='flex justify-center my-3'>
                <Link href={`/movie/${documentId}/movieDetail`}>
                  <button className='px-1 py-1 bg-gray-500 text-white rounded-md mr-2'>
                    詳細
                  </button>
                </Link>
                <div className="flex justify-center">
                  {isLiked ?
                    <FavoriteIcon color="secondary" onClick={handleUnlikeSave}/> : <FavoriteBorderIcon onClick={handleLikeSave}/>}
                </div>
              </div>
            )}
          </div>
        </Box>
      </Modal>
    </div>
  )
}

export default DialogueModal;
