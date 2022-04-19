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
      onClose={() => setIsNotifyOpen(!isNotifyOpen)}
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
              {listNotify.map((element, index) => (
                <>
                  <ListItem>
                    <ListItemButton style={{ padding: "0px", margin: "0px" }}>
                      <ListItemAvatar>
                        <Avatar />
                      </ListItemAvatar>
                      <ListItemText
                        primary={element.fullName}
                        secondary={element.content}
                      />
                    </ListItemButton>
                    {!element.isRead && <Badge color="primary" variant="dot" />}

                    <IconButton>
                      <DeleteIcon />
                    </IconButton>
                  </ListItem>
                  <Divider />
                </>
              ))}
            </List>
          </nav>
        </Paper>
      </Box>
    </Menu>
  );
}

export default RenderNotify;
