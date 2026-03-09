import type { CommentGet } from "../../Models/Comment";
import StockCommentListItem from "../StockCommentListItem/StockCommentListItem";

type Props = {
  comments: CommentGet[];
};

const StockCommentList = ({ comments }: Props) => {
  return (
    <>
      {comments.map((comment) => (
        <StockCommentListItem key={comment.id} comment={comment} />
      ))}
    </>
  );
};

export default StockCommentList;