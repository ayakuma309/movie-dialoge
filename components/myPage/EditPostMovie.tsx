import React, { useState, useEffect } from 'react'
import { NextPage } from 'next';
import { EditPostMovieProps } from '../../types/ProfileTypes';
import { Button, Typography } from '@mui/material';
import { doc, getFirestore, updateDoc } from 'firebase/firestore';

const EditPostMovie: NextPage<EditPostMovieProps> = (props) => {
  const { documentId, title,  poster_path } = props;
  const [editedDialogue, setEditedDialogue] = useState(props.dialogue);
  const [isEditing, setIsEditing] = useState(false);
  const db = getFirestore();

   //dialogueが変更された場合に編集中のダイアログを更新する
  useEffect(() => {
    setEditedDialogue(props.dialogue);
  }, [props.dialogue]);

  const editPost = () => {
    setIsEditing(true);
    // 元の投稿のタイトルと内容を表示する
    setEditedDialogue(props.dialogue);
  }
  const updatePost = (documentId: string) => {
    updateDoc(doc(db, 'movies', documentId), {
      dialogue: editedDialogue,
    })
      .then(() => {
        console.log('投稿が更新されました');
        setIsEditing(false);
      })
      .catch(() => {
        alert('Errorが発生しました');
      });
  };
  return (
    <div className='my-5 '>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        <small className='text-gray-500'>{title}</small>
      </Typography>
      <img
        src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${poster_path}`}
        alt={title + ' poster'}
        className="mx-auto"
      />
      {isEditing ? (
        <div>
          <input type="text" value={editedDialogue} onChange={(e) => setEditedDialogue(e.target.value)} />
          <Button size='small' onClick={() => updatePost(documentId)}>
            保存
          </Button>
          <Button size='small' onClick={() => setIsEditing(false)}>
            キャンセル
          </Button>
        </div>
      ) : (
        <>
          <Typography id="modal-modal-description" sx={{ mt: 2 ,mb:2}}>
            {editedDialogue}
          </Typography>
          <Button size="small" onClick={editPost}>
            編集
          </Button>
        </>
      )}
    </div>
  )
}

export default EditPostMovie
