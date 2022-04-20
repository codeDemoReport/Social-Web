import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SendIcon from "@mui/icons-material/Send";
import ShareIcon from "@mui/icons-material/Share";
import axios from "axios";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import React, { useState, useEffect } from "react";
import CustomDropdown from "../CustomDropdown";
import formatDateTime from "./../../utils/dateTime";
import { useDispatch } from "react-redux";
import { createComment, deleteComment, handleLike } from "../../redux/action";
import "./style.scss";

function PostItem({ post, setTemp, setOpenDelete, setOpenAddOrEdit }) {
  const [valueComment, setValueComment] = useState("");
  const [comments, setComments] = useState([]);
  const [like, setLike] = useState(() => post.likes.includes(post.userId._id));
  const [commentSelected, setCommentSelected] = useState("");

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [openEventComment, setEventComment] = useState(null);
  const openComment = Boolean(openEventComment);

  const dispatch = useDispatch();

  const handleShowDropdown = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleShowEventDelete = (event, id) => {
    setCommentSelected(id);
    setEventComment(event.currentTarget);
  };

  const handleClickEdit = () => {
    setTemp(post);
    setAnchorEl(null);
    setOpenAddOrEdit(true);
  };

  const handleClickDelete = () => {
    setTemp(post);
    setAnchorEl(null);
    setOpenDelete(true);
  };

  const handleClickLike = () => {
    dispatch(
      handleLike({
        postId: post._id,
        toUserId: post.userId._id,
      })
    );
    setLike(!like);
  };

  const handleClickBtnComment = async () => {
    await dispatch(
      createComment({
        content: valueComment,
        postId: post._id,
        toUserId: post.userId._id,
      })
    );
    setValueComment("");
    fetchData();
  };

  const dataDropdown = [
    {
      title: "Sửa bài viết",
      event: handleClickEdit,
    },
    {
      title: "Xóa bài viết",
      event: handleClickDelete,
    },
  ];

  const handleDeleteComment = async () => {
    await dispatch(deleteComment({ id: commentSelected }));
    fetchData();
    setEventComment(null);
  };

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = { authorization: `Bearer ${token}` };
      const res = await axios.get(
        `http://192.168.68.51:3000/api/comment/${post._id}`,
        {
          headers,
        }
      );
      setComments(res.data.data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchData();
  }, []);

  const commentDropdown = [
    { title: "Xóa comment", event: handleDeleteComment },
    { title: "Sửa comment", event: null },
  ];

  return (
    <section className="postItem">
      <Card className="postItem__card">
        <CardHeader
          sx={{ padding: "8px 16px" }}
          avatar={
            <Avatar
              sx={{ bgcolor: red[500], cursor: "pointer" }}
              aria-label="recipe"
            >
              R
            </Avatar>
          }
          action={
            <IconButton
              aria-label="settings"
              aria-controls={open ? "dropdown" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleShowDropdown}
            >
              <MoreVertIcon />
            </IconButton>
          }
          title={post.userId.fullName}
          subheader={formatDateTime(post.updatedAt)}
        />
        <CardContent sx={{ padding: "8px 16px" }}>
          <Typography
            variant="body2"
            color="text.primary"
            gutterBottom
            sx={{ fontSize: 15 }}
          >
            {post.content}
          </Typography>
          <CardMedia
            component="img"
            height="400"
            image={post.photo}
            alt="Paella dish"
            className="postItem__image"
          />
        </CardContent>
        <CardActions disableSpacing sx={{ display: "block" }}>
          <IconButton aria-label="add to favorites" onClick={handleClickLike}>
            <FavoriteIcon className={like ? "postItem__icon--like" : ""} />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          <Divider />
          <Box className="postItem__container">
            {comments.length > 0 &&
              comments.map((element, index) => (
                <Box className="postItem__wrapper" key={index}>
                  <Avatar
                    sx={{
                      height: 36,
                      width: 36,
                      marginRight: 2,
                      bgcolor: red[500],
                      cursor: "pointer",
                    }}
                    aria-label="recipe"
                  >
                    R
                  </Avatar>
                  <Box className="postItem__theme">
                    <Typography
                      variant="h6"
                      sx={{ color: "#333", fontSize: 15 }}
                    >
                      {element.userId.fullName}
                    </Typography>
                    <Typography
                      variant="p"
                      sx={{ color: "#333", fontSize: 15 }}
                    >
                      {element.content}
                    </Typography>
                  </Box>
                  <IconButton
                    aria-controls={openComment ? "event_comment" : undefined}
                    aria-haspopup="true"
                    aria-expanded={openComment ? "true" : undefined}
                    onClick={(e) => handleShowEventDelete(e, element._id)}
                  >
                    <MoreVertIcon />
                  </IconButton>

                  <CustomDropdown
                    id="event_comment"
                    open={openComment}
                    anchorEl={openEventComment}
                    setAnchorEl={setEventComment}
                    listItem={commentDropdown}
                  />
                </Box>
              ))}

            <Box className="postItem__wrapper">
              <Avatar
                sx={{
                  height: 36,
                  width: 36,
                  marginRight: 2,
                  bgcolor: red[500],
                  cursor: "pointer",
                }}
                aria-label="recipe"
              >
                R
              </Avatar>
              <TextField
                id="outlined-basic"
                label="Nhập bình luận..."
                variant="outlined"
                className="postItem__input"
                size="small"
                value={valueComment}
                onChange={(e) => setValueComment(e.target.value)}
              />
              <Box className="postItem__icon">
                <Button
                  disabled={!valueComment}
                  onClick={handleClickBtnComment}
                >
                  <SendIcon />
                </Button>
              </Box>
            </Box>
          </Box>
        </CardActions>
      </Card>
      <CustomDropdown
        id="dropdown"
        open={open}
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        listItem={dataDropdown}
      />
    </section>
  );
}

export default PostItem;
