import {
  Avatar,
  Badge,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Menu,
  Paper,
} from "@mui/material";
import { Box } from "@mui/system";

import DeleteIcon from "@mui/icons-material/Delete";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import React from "react";

function RenderNotify({ isNotifyOpen, setIsNotifyOpen, listNotify }) {
  return (
    <Menu
      sx={{ marginTop: "50px", marginRight: "100px" }}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isNotifyOpen}
      onClick={() => setIsNotifyOpen(!isNotifyOpen)}
    >
      <Box style={{ width: 300, height: 400 }}>
        <Paper variant="outlined">
          <IconButton style={{ fontSize: 13 }}>
            <ClearAllIcon style={{ marginRight: "5px" }} />
            Delete All
          </IconButton>
          <Divider />
          <nav>
            <List>
              <ListItem>
                <ListItemButton style={{ padding: "0px", margin: "0px" }}>
                  <ListItemAvatar>
                    <Avatar />
                  </ListItemAvatar>
                  <ListItemText
                    primary={"Tran Van Luc"}
                    secondary={"has created a post"}
                  />
                </ListItemButton>
                <Badge color="primary" variant="dot"></Badge>
                <IconButton>
                  <DeleteIcon />
                </IconButton>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemButton>
                  <ListItemAvatar>
                    <Avatar />
                  </ListItemAvatar>
                  <ListItemText
                    primary={"Tran Van Luc"}
                    secondary={"has created a post"}
                  />
                </ListItemButton>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemButton>
                  <ListItemAvatar>
                    <Avatar />
                  </ListItemAvatar>
                  <ListItemText
                    primary={"Tran Van Luc"}
                    secondary={"has created a post"}
                  />
                </ListItemButton>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemButton>
                  <ListItemAvatar>
                    <Avatar />
                  </ListItemAvatar>
                  <ListItemText
                    primary={"Tran Van Luc"}
                    secondary={"has created a post"}
                  />
                </ListItemButton>
              </ListItem>
            </List>
          </nav>
        </Paper>
      </Box>
    </Menu>
  );
}

export default RenderNotify;
