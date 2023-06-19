import React, { useState, useEffect } from 'react'
import { NextPage } from 'next';
import { EditPostMovieProps } from '../../types/ProfileTypes';
import { Button, Typography } from '@mui/material';
import { deleteDoc, doc, getFirestore, updateDoc} from 'firebase/firestore';
import Link from 'next/link';
import { toast } from 'react-toastify';

const EditPostMovie: NextPage<EditPostMovieProps> = ({ dialogue, documentId, title,  poster_path,onDelete }) => {
  const [editedDialogue, setEditedDialogue] = useState(dialogue);
  const [isEditing, setIsEditing] = useState(false);
  const db = getFirestore();

   //dialogueが変更された場合に編集中のダイアログを更新する
  useEffect(() => {
    setEditedDialogue(dialogue);
  }, [dialogue]);

  const editPost = () => {
    setIsEditing(true);
    // 元の投稿のタイトルと内容を表示する
    setEditedDialogue(dialogue);
  }
  const updatePost = (documentId: string) => {
    updateDoc(doc(db, 'movies', documentId), {
      dialogue: editedDialogue,
    })
      .then(() => {
        toast.success('投稿が更新されました');
        setIsEditing(false);
      })
      .catch(() => {
        toast.error('投稿の更新に失敗しました');
        alert('Errorが発生しました');
      });
  };
  const deletePost = () => {
    if (window.confirm('削除してもよろしいですか')) {
      deleteDoc(doc(db, 'movies', documentId))
        .then(() => {
          toast.success('削除しました');
          onDelete(documentId);
        })
        .catch((error) => {
          toast.error('削除に失敗しました');
          alert(error.message);
        });
    }
  }

  return (
    <div className='my-5 card_movie'>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        <small>{title}</small>
      </Typography>
      <img
        src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${poster_path}`}
        alt={title + ' poster'}
        className="mx-auto"
      />
      {isEditing ? (
        <div>
          <textarea
            value={editedDialogue}
            onChange={(e) => setEditedDialogue(e.target.value)}
            className='h-32 w-full'
          />
          <Button size='small' onClick={() => updatePost(documentId)}>
            保存
          </Button>
          <Button size='small' onClick={() => setIsEditing(false)}>
            キャンセル
          </Button>
        </div>
      ) : (
        <>
          <Typography
          id="modal-modal-description" sx={{ mt: 2 ,mb:2}}>
            {editedDialogue}
          </Typography>
          <div className='flex'>
            <Link href={`/movie/${documentId}/movieDetail`}>
              <Button size="small">
                詳細
              </Button>
            </Link>
            <Button size="small" onClick={editPost}>
              編集
            </Button>
            <Button size="small" onClick={deletePost}>
              削除
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

export default EditPostMovie
