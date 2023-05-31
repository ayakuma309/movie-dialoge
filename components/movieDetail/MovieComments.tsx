import { NextPage } from 'next'
import React from 'react'
import { CommentsTypeProps } from '@/types/CommentTypes'
import Image from 'next/image'
const MovieComments:NextPage<CommentsTypeProps> = ({ comments }) => {
  return (
    <div>
      {comments && (
        <div>
          {comments.map((comment) => (
              <div key={comment.id}>
                <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Comments</h5>
                  </div>
                  <div className="flow-root">
                    <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                      <li className="py-3 sm:py-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0">
                            <Image className="w-8 h-8 rounded-full" src={comment.avatar} alt="avatar"/>
                          </div>
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
              </div>
            </div>
          ))}
        </div>
      )}
  </div>
  )
}

export default MovieComments;
