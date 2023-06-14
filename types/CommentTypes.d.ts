//MovieDetail.tsx
export interface CommentTypeProps {
  id: string;
  text: string;
  username: string;
}
//MovieComments.tsx
export interface CommentsTypeProps  {
  comments: CommentTypeProps[];
}
