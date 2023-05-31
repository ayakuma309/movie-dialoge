import { NextPage } from 'next'
import React from 'react'
import { CommentsTypeProps } from '@/types/CommentTypes'
const MovieComments:NextPage<CommentsTypeProps> = ({ comments }) => {
  return (
    <div>
      {comments.map((comment) => (
        <div key={comment.id}>
          <p>{comment.text}</p>
          <p>{comment.username}</p>
        </div>
      ))}
    </div>
  )
}

export default MovieComments;
