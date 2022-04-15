import React, { useState } from "react";
import PostItem from "./../../components/PostItem";
import "./style.scss";
import DialogAddOrEdit from "../../components/DialogAddOrEdit";
import PostStatus from "../../components/PostStatus";

function Post(props) {
  const [open, setOpen] = useState(false);

  return (
    <section>
      <PostStatus setOpen={setOpen} />
      <PostItem />
      <DialogAddOrEdit open={open} setOpen={setOpen} />
    </section>
  );
}

export default Post;
