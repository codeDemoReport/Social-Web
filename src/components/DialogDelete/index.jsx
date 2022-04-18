import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

function DialogDelete({ open, setOpen, temp, handleClickBtnOK, setTemp }) {
  const handleClose = () => {
    setOpen(false);
    setTemp({});
  };

  return (
    <section>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirm</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want to delete the post #{temp.content}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickBtnOK}>OK</Button>
          <Button onClick={handleClose} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </section>
  );
}

export default DialogDelete;
