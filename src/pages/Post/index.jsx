import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DialogAddOrEdit from "../../components/DialogAddOrEdit";
import PostStatus from "../../components/PostStatus";
import DialogDelete from "./../../components/DialogDelete";
import PostItem from "./../../components/PostItem";
import { deletePost, getListPost } from "./../../redux/action";
import "./style.scss";

function Post(props) {
  const [openAddOrEdit, setOpenAddOrEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [temp, setTemp] = useState({});

  const dispatch = useDispatch();
  const { postList, dataCreate, dataDelete, dataEdit } = useSelector(
    (state) => state.reducer
  );

  useEffect(() => {
    dispatch(getListPost());
  }, [dataCreate, dataDelete, dataEdit, dispatch]);

  const handleDelete = () => {
    dispatch(
      deletePost({
        id: temp._id,
      })
    );
    setOpenDelete(false);
  };

  return (
    <section>
      <PostStatus setOpen={setOpenAddOrEdit} />
      {postList.map((item, index) => (
        <PostItem
          key={index}
          post={item}
          setTemp={setTemp}
          setOpenDelete={setOpenDelete}
          setOpenAddOrEdit={setOpenAddOrEdit}
        />
      ))}
      <DialogAddOrEdit
        open={openAddOrEdit}
        setOpen={setOpenAddOrEdit}
        temp={temp}
        setTemp={setTemp}
      />
      <DialogDelete
        open={openDelete}
        setOpen={setOpenDelete}
        temp={temp}
        setTemp={setTemp}
        handleClickBtnOK={handleDelete}
      />
    </section>
  );
}

export default Post;
