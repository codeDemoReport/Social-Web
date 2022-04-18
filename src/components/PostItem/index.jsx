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
  Menu,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import React, { useState } from "react";
import "./style.scss";
import formatDateTime from "./../../utils/dateTime";

function PostItem({ post }) {
  const [valueComment, setValueComment] = useState("");
  const [like, setLike] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickEdit = () => {};

  const handleClickDelete = () => {
    setAnchorEl(null);
  };

  const handleClickBtnComment = () => {
    console.log({
      id: post.userId._id,
      valueComment,
    });
  };

  const renderDropdown = (
    <Menu
      sx={{ marginTop: "50px" }}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id="dropdown"
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={open}
      onClose={handleClose}
    >
      <MenuItem onClick={handleClose}>Sửa bài viết</MenuItem>
      <MenuItem onClick={handleClickDelete}>Xóa bài viết</MenuItem>
    </Menu>
  );

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
              onClick={handleClick}
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
      {renderDropdown}
    </section>
  );
}

export default PostItem;
