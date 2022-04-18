import { Menu, MenuItem } from "@mui/material";
import React from "react";

function CustomDropdown({ isOpenMenu, setIsOpenMenu, listItem }) {
  return (
    <Menu
      sx={{ marginTop: "50px" }}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isOpenMenu}
      onClose={() => setIsOpenMenu(false)}
    >
      {listItem.map((element, index) => (
        <MenuItem key={index} onClick={element.event}>
          {element.title}
        </MenuItem>
      ))}
    </Menu>
  );
}

export default CustomDropdown;
