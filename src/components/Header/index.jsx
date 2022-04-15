import React, { useEffect, useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../redux/action";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

function Header(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isNotifyOpen, setNotifyOpen] = useState(false);
  const isMenuOpen = Boolean(anchorEl);
  const { reducer } = useSelector((state) => state);
  const [data, setData] = useState(reducer.infoUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (reducer.infoUser) setData(reducer.infoUser);
  }, [reducer.infoUser, dispatch]);

  const hanleNotifyClose = () => {
    setNotifyOpen(false);
  };

  const handleNotifyOpen = () => {
    setNotifyOpen(true);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleMenuClose();
  };

  const menuId = "primary-search-account-menu";
  const renderNotifies = (
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
      onClose={hanleNotifyClose}
    >
      <Box style={{ width: 300, height: 400 }}>
        <Paper variant="outlined">
          <nav>
            <List>
              <ListItem>
                <ListItemButton>
                  <ListItemAvatar>
                    <Avatar />
                  </ListItemAvatar>
                  <ListItemText
                    primary={data.fullName}
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
                    primary={data.fullName}
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
                    primary={data.fullName}
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

  const renderMenu = (
    <Menu
      sx={{ marginTop: "50px" }}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );

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
            Home
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
                  aria-controls={menuId}
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
      {renderMenu}
      {renderNotifies}
    </Box>
  );
}

export default Header;
