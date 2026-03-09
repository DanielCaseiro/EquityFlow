import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import StockCommentForm from "./StockCommentForm/StockCommentForm";
import StockCommentList from "../StockCommentList/StockCommentList";
import Spinner from "../Spinners/Spinner";

import { commentGetAPI, commentPostAPI } from "../../Services/CommentService";
import type { CommentGet } from "../../Models/Comment";

type Props = {
  stockSymbol: string;
};

type CommentFormInputs = {
  title: string;
  content: string;
};

const StockComment = ({ stockSymbol }: Props) => {
  const [comments, setComments] = useState<CommentGet[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    void getComments();
  }, [stockSymbol]);

  const handleComment = async (form: CommentFormInputs) => {
    try {
      const res = await commentPostAPI(form.title, form.content, stockSymbol);

      if (res) {
        toast.success("Comment created successfully!");
        await getComments();
      }
    } catch (error) {
      toast.warning("Could not create comment.");
    }
  };

  const getComments = async () => {
    setLoading(true);

    try {
      const res = await commentGetAPI(stockSymbol);
      setComments(res?.data ?? []);
    } catch (error) {
      setComments([]);
      toast.warning("Could not load comments.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col">
      {loading ? <Spinner /> : <StockCommentList comments={comments} />}
      <StockCommentForm symbol={stockSymbol} handleComment={handleComment} />
    </div>
  );
};

export default StockComment;