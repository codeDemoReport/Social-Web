import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SendIcon from "@mui/icons-material/Send";
import ShareIcon from "@mui/icons-material/Share";
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
import React, { useState } from "react";
import CustomDropdown from "../CustomDropdown";
import formatDateTime from "./../../utils/dateTime";
import { useDispatch } from "react-redux";
import { createComment } from "../../redux/action";
import "./style.scss";

function PostItem({ post, setTemp, setOpenDelete, setOpenAddOrEdit }) {
  const [valueComment, setValueComment] = useState("");
  const [like, setLike] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();

  const handleShowDropdown = (event) => {
    setAnchorEl(event.currentTarget);
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

  const handleClickBtnComment = () => {
    const token = localStorage.getItem("token");
    dispatch(createComment({ content: valueComment, id: post._id }, token));
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
          <IconButton
            aria-label="add to favorites"
            onClick={() => setLike(!like)}
          >
            <FavoriteIcon className={like ? "postItem__icon--like" : ""} />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          <Divider />
          <Box className="postItem__container">
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
              <Box className="postItem__theme">
                <Typography variant="h6" sx={{ color: "#333", fontSize: 15 }}>
                  Shrimp and Chorizo Paella
                </Typography>
                <Typography variant="p" sx={{ color: "#333", fontSize: 15 }}>
                  Bình luận đầu tiên
                </Typography>
              </Box>
            </Box>
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
              <Button
                className="postItem__icon"
                disabled={!valueComment}
                onClick={handleClickBtnComment}
              >
                <SendIcon />
              </Button>
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
