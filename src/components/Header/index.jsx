import React, { useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../redux/action";
import CustomDropdown from "../CustomDropdown";
import RenderNotify from "./RenderNotify";

import {
  IconButton,
  Badge,
  Typography,
  Toolbar,
  Box,
  AppBar,
  Button,
} from "@mui/material";

function Header(props) {
  const [isOpenMenuAuth, setOpenMenuAuth] = useState(false);
  const [isNotifyOpen, setNotifyOpen] = useState(false);
  const { reducer } = useSelector((state) => state);
  const [data, setData] = useState(reducer.infoUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (reducer.infoUser) setData(reducer.infoUser);
  }, [reducer.infoUser, dispatch]);

  const handleNotifyOpen = () => {
    setNotifyOpen(true);
  };

  const handleProfileMenuOpen = (event) => {
    setOpenMenuAuth(true);
  };

  const handleMenuClose = () => {
    setOpenMenuAuth(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleMenuClose();
  };

  const listMenu = [
    {
      title: "Profile",
      event: handleMenuClose,
    },
    {
      title: "Account",
      event: handleMenuClose,
    },
    {
      title: "Logout",
      event: handleLogout,
    },
  ];
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            <Link style={{ color: "white", textDecoration: "none" }} to={"/"}>
              PROJECT
            </Link>
          </Typography>
          <Button
            color="inherit"
            size="large"
            sx={{ marginLeft: 3, fontWeight: "bold" }}
          >
            <Link to={"/"} style={{ textDecoration: "none", color: "white" }}>
              Home
            </Link>
          </Button>
          <Button
            color="inherit"
            size="large"
            sx={{ marginLeft: 3, fontWeight: "bold" }}
          >
            <Link
              to={"/post"}
              style={{ textDecoration: "none", color: "white" }}
            >
              Post
            </Link>
          </Button>
          <Box sx={{ flexGrow: 1 }} />
          {data.fullName ? (
            <>
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <IconButton
                  size="large"
                  aria-label="show 4 new mails"
                  color="inherit"
                >
                  <Badge badgeContent={4} color="error">
                    <MailIcon fontSize="large" />
                  </Badge>
                </IconButton>
                <IconButton
                  size="large"
                  aria-label="show 17 new notifications"
                  color="inherit"
                  onClick={handleNotifyOpen}
                >
                  <Badge badgeContent={17} color="error">
                    <NotificationsIcon fontSize="large" />
                  </Badge>
                </IconButton>
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <AccountCircle fontSize="large" />
                  <Typography style={{ marginLeft: 5, fontSize: 20 }}>
                    {data.fullName}
                  </Typography>
                </IconButton>
              </Box>
            </>
          ) : (
            <>
              <Button color="inherit" sx={{ fontWeight: "bold" }}>
                <Link
                  style={{ textDecoration: "none", color: "white" }}
                  to={"/login"}
                >
                  LOGIN
                </Link>
              </Button>
              <Button color="inherit" sx={{ fontWeight: "bold" }}>
                <Link
                  style={{ textDecoration: "none", color: "white" }}
                  to={"/register"}
                >
                  REGISTER
                </Link>
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <CustomDropdown
        isOpenMenu={isOpenMenuAuth}
        setIsOpenMenu={setOpenMenuAuth}
        listItem={listMenu}
      />
      <RenderNotify
        isNotifyOpen={isNotifyOpen}
        setIsNotifyOpen={setNotifyOpen}
        listNotify={[]}
      />
    </Box>
  );
}

export default Header;
