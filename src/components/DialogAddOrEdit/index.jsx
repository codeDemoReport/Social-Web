import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { Box } from "@mui/system";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { createPost } from "../../redux/action";
import CustomField from "../CustomField";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";

function DialogAddOrEdit({ open, setOpen }) {
  const [image, setImage] = useState();

  const dispatch = useDispatch();
  const { infoUser } = useSelector((state) => state.reducer);

  const handleClose = () => {
    setOpen(false);
    setImage("");
  };

  const initialValues = {
    content: "",
  };
  const validateSchema = Yup.object().shape({
    content: Yup.string().required("Required!"),
  });

  const handleSubmitForm = (values) => {
    dispatch(
      createPost({
        ...values,
        photo: URL.createObjectURL(image),
        userId: infoUser.userId,
      })
    );
  };

  return (
    <section className="dialog">
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Create Post</DialogTitle>
        <DialogContent sx={{ width: 500 }}>
          <Formik
            initialValues={initialValues}
            validationSchema={validateSchema}
            onSubmit={(values) => handleSubmitForm(values)}
          >
            <Form>
              <CustomField
                name="content"
                label="Content"
                placeholder="Enter your content..."
                type="text"
              />
              <Box className="dialog__wrapper">
                <input
                  type="file"
                  name=""
                  id="upload-image"
                  style={{ display: "none" }}
                  onChange={(e) => setImage(e.target.files[0])}
                />
                <label htmlFor="upload-image" className="dialog__upload">
                  Chọn ảnh
                </label>
                {image && (
                  <img
                    src={URL.createObjectURL(image)}
                    alt=""
                    className="dialog__image"
                  />
                )}
              </Box>
              <Box className="dialog__btn">
                <Button type="submit" variant="contained">
                  Submit
                </Button>
                <Button
                  variant="outlined"
                  onClick={handleClose}
                  autoFocus
                  sx={{ marginLeft: 2 }}
                >
                  Cancel
                </Button>
              </Box>
            </Form>
          </Formik>
        </DialogContent>
      </Dialog>
    </section>
  );
}

export default DialogAddOrEdit;
