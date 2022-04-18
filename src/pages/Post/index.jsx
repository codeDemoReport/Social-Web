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
  const { postList, dataCreate } = useSelector((state) => state.reducer);

  useEffect(() => {
    dispatch(getListPost());
  }, [dataCreate, dispatch]);

  return (
    <section>
      <PostStatus setOpen={setOpen} />
      {postList.map((item, index) => (
        <PostItem key={index} post={item} />
      ))}
      <DialogAddOrEdit open={open} setOpen={setOpen} />
    </section>
  );
}

export default Post;
