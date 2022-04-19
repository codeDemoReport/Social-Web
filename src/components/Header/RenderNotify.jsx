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
import React, { useEffect, useState } from "react";
import axios from "axios";

function RenderNotify({ id, open, anchorEl, setAnchorEl, setTotal }) {
  const [notifies, setNotifies] = useState([]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = { authorization: `Bearer ${token}` };
      const res = await axios.get(
        `http://192.168.68.51:3000/api/notification`,
        {
          headers,
        }
      );
      setNotifies(res.data.data);
      setTotal(res.data.data.length);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Menu
      sx={{ marginTop: "50px", marginRight: "100px" }}
      id={id}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={open}
      onClose={() => setAnchorEl(null)}
      anchorEl={anchorEl}
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
              {notifies.map((element, index) => (
                <Box key={index}>
                  <ListItem>
                    <ListItemButton style={{ padding: "0px", margin: "0px" }}>
                      <ListItemAvatar>
                        <Avatar />
                      </ListItemAvatar>
                      <ListItemText
                        primary={element.fromUserId.fullName}
                        secondary={element.content}
                      />
                    </ListItemButton>
                    {!element.isRead && <Badge color="primary" variant="dot" />}

                    <IconButton>
                      <DeleteIcon />
                    </IconButton>
                  </ListItem>
                  <Divider />
                </Box>
              ))}
            </List>
          </nav>
        </Paper>
      </Box>
    </Menu>
  );
}

export default RenderNotify;
