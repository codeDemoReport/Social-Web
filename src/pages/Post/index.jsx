import React, { useState, useEffect } from "react";
import PostItem from "./../../components/PostItem";
import "./style.scss";
import DialogAddOrEdit from "../../components/DialogAddOrEdit";
import PostStatus from "../../components/PostStatus";
import { useDispatch, useSelector } from "react-redux";
import { getListPost } from "./../../redux/action";

function Post(props) {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const { postList } = useSelector((state) => state.reducer);

  useEffect(() => {
    dispatch(getListPost());
  }, []);

  return (
    <section>
      <PostStatus setOpen={setOpen} />
      <PostItem postList={postList} />
      <DialogAddOrEdit open={open} setOpen={setOpen} />
    </section>
  );
}

export default Post;
