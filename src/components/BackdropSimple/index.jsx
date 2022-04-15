import React, { useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useSelector } from "react-redux";

function BackdropSimple(props) {
  const { reducer } = useSelector((state) => state);
  const [open, setOpen] = useState(reducer.loading);

  useEffect(() => {
    setOpen(reducer.loading);
  }, [reducer.loading]);

  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

export default BackdropSimple;
