import { NextPage } from 'next';
import React, { ChangeEvent, FormEvent, useState }  from 'react';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { MovieModalProps } from '../../types/MovieTypes';
import { collection, addDoc, getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import uuid from 'react-uuid';

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

const MovieModal: NextPage<MovieModalProps> = (props) => {
  const { id, title, poster_path } = props;
  const [open, setOpen] = useState(false);
  const [dialogue, setDialogue] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const inputDialogue = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDialogue(e.target.value);
  };

  const auth = getAuth();
  const db = getFirestore();
  const router = useRouter();

  const saveMovie = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const user = auth.currentUser;
      if (user) {
        const docRef = await addDoc(collection(db, 'movies'), {
          movie_id: uuid(),
          id,
          title,
          poster_path,
          user_id: user.uid,
          dialogue: dialogue,
        });
        router.push(`/movie/${docRef.id}/movieDetail`);
      } else {
        // ユーザーがログインしていない場合の処理
        console.log('User is not logged in');
      }
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };
  return (
    <div>
      <Button onClick={handleOpen}>
        <img
          src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${poster_path}`}
          alt={title + ' poster'}
        />
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
              className="mx-auto"
            />
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <small>{title}</small>
            </Typography>
          </div>
          <form
            className="space-y-6 flex flex-col flex-1 justify-center"
            onSubmit={saveMovie}
            >
            <label
              htmlFor="description"
              className="block text-sm font-medium text-neutral-600"
            >
            セリフを入力
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="セリフを入力してください"
              value={dialogue}
              onChange={inputDialogue}
              className="block w-full px-5 py-3 mt-2 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300 apearance-none autoexpand"
            />
            {dialogue?.trim() &&
              <button
                type="submit"
                className="flex items-center justify-center w-full px-10 py-4 text-base font-medium text-center text-neutral-600 transition duration-500 ease-in-out transform bg-gradient-to-r from-indigo-600 to-indigo-300 rounded-xl hover:from-indigo-300 hover:to-indigo-600 hover:text-white"
              >
                送信
              </button>
            }
          </form>
        </Box>
      </Modal>
    </div>
  );
}
export default MovieModal;
