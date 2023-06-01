import { NextPage } from 'next'
import React from 'react'
import { CommentsTypeProps } from '@/types/CommentTypes'
const MovieComments:NextPage<CommentsTypeProps> = ({ comments }) => {
  return (
    <div className='text-center flex flex-col justify-center items-center'>
      {comments && (
        <div>
          <div>
            <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4 text-center">
                <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Comments</h5>
              </div>
              {comments.map((comment) => (
                <div className="flow-root" key={comment.id}>
                  <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                    <li className="py-3 sm:py-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                            {comment.text}
                          </p>
                          <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                            {comment.username}
                          </p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
  </div>
  )
}

export default MovieComments;
