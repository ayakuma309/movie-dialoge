//MovieDetail.tsx
export interface CommentTypeProps {
  id: string;
  text: string;
  timestamp: any;
  username: string;
}
//MovieComments.tsx
export interface CommentsTypeProps  {
  comments: CommentTypeProps[];
}
