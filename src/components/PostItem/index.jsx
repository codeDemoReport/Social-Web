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
import "./style.scss";

function PostItem(props) {
  const [valueComment, setValueComment] = useState("");
  const [like, setLike] = useState(false);

  return (
    <section className="postItem">
      <Card className="postItem__card">
        <CardHeader
          avatar={
            <Avatar
              sx={{ bgcolor: red[500], cursor: "pointer" }}
              aria-label="recipe"
            >
              R
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title="Shrimp and Chorizo Paella"
          subheader="September 14, 2016"
        />
        <CardContent>
          <Typography variant="body2" color="text.primary" gutterBottom>
            This impressive paella is a perfect party dish and a fun meal to
            cook together with your guests. Add 1 cup of frozen peas along with
            the mussels, if you like.
          </Typography>
          <CardMedia
            component="img"
            height="400"
            image="https://c4.wallpaperflare.com/wallpaper/799/418/374/chelsea-fc-champions-league-trophy-football-soccer-hd-wallpaper-preview.jpg"
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
                <Typography variant="h6" className="postItem__wrapper--name">
                  Shrimp and Chorizo Paella
                </Typography>
                <Typography variant="p" className="postItem__wrapper--comment">
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
              <Button className="postItem__icon" disabled={!valueComment}>
                <SendIcon />
              </Button>
            </Box>
          </Box>
        </CardActions>
      </Card>
    </section>
  );
}

export default PostItem;
