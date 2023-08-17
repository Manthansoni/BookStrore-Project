import { Button, FormControl, Input, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import bookService from "../../services/bookService";
import categoryService from "../../services/categoryService";
import * as Yup from 'yup';
import ValidationErrorMessage from "../ValidationErrorMessage";
import { toast } from "react-toastify";

const BookEdit = () => {


  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();
  const initialValues = {
    name: "",
    price: "",
    categoryId: 0,
    description: "",
    base64image: "",
  };
  const [initialValueState, setInitialValueState] = useState(initialValues);
  const { id } = useParams();

  useEffect(() => {
    if (id) getBookById();
    categoryService.getAll().then((res) => {
      setCategories(res.data.result);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Book Name is required"),
    description: Yup.string().required("Description is required"),
    categoryId: Yup.number()
      .min(1, "Category is required")
      .required("Category is required"),
    price: Yup.number().required("Price is required"),
    base64image: Yup.string().required("Image is required"),
  });

  const getBookById = () => {
    bookService.getById(Number(id)).then((res) => {
      setInitialValueState({
        id: res.data.result.id,
        name: res.data.result.name,
        price: res.data.result.price,
        categoryId: res.data.result.categoryId,
        description: res.data.result.description,
        base64image: res.data.result.base64image,
      });
    });
  };

  

  const onSelectFile = (e, setFieldValue, setFieldError) => {
    const files = e.target.files;
    if (files?.length) {
      const fileSelected = e.target.files[0];
      const fileNameArray = fileSelected.name.split(".");
      const extension = fileNameArray.pop();
      if (["png", "jpg", "jpeg"].includes(extension?.toLowerCase())) {
        if (fileSelected.size > 50000) {
          toast.error("File size must be less then 50KB");
          return;
        }
        const reader = new FileReader();
        reader.readAsDataURL(fileSelected);
        reader.onload = function () {
          setFieldValue("base64image", reader.result);
        };
        reader.onerror = function (error) {
          throw error;
        };
      } else {
        toast.error("only jpg,jpeg and png files are allowed");
      }
    } else {
      setFieldValue("base64image", "");
    }
  };

  console.log(categories)

  const onSubmit = (values) => {
    bookService
      .save(values)
      .then((res) => {
        toast.success(
          values.id
            ? "UPDATED SUCCESS"
            : "Record created successfully"
        );
        navigate("/bookdetails");
      })
      .catch((e) => toast.error("Fail"));
  };

    return (
        <div>
        <div className="container">
          <Typography variant="h3">{id ? "Edit" : "Add"} Book</Typography>
          <Formik
            initialValues={initialValueState}
            validationSchema={validationSchema}
            enableReinitialize={true}
            onSubmit={onSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
              setValues,
              setFieldError,
              setFieldValue,
            }) => (
              <form onSubmit={handleSubmit}>
                <div className="form-row-wrapper">
                  <div className="form-col">
                    <TextField
                      id="first-name"
                      name="name"
                      label="Book Name *"
                      variant="outlined"
                      inputProps={{ className: "small" }}
                      value={values.name}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    <ValidationErrorMessage
                      message={errors.name}
                      touched={touched.name}
                    />
                  </div><br></br>
  
                  <div className="form-col">
                    <TextField
                      type={"number"}
                      id="price"
                      name="price"
                      label="Book Price (RS)*"
                      variant="outlined"
                      inputProps={{ className: "small" }}
                      value={values.price}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    <ValidationErrorMessage
                      message={errors.price}
                      touched={touched.price}
                    />
                  </div><br></br>
  
                  <div className="form-col">
                    <FormControl className="dropdown-wrapper" variant="outlined" style={{width:230}}>
                      <InputLabel htmlFor="select">Category *</InputLabel>
                      <Select
                        name={"categoryId"}
                        id={"category"}
                        onChange={handleChange}
                        
                        MenuProps={{
                          classes: { },
                        }}
                        value={values.categoryId}
                      >
                        {categories?.map((rl) => (
                          <MenuItem value={rl.id} key={"category" + rl.id}>
                            {rl.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <ValidationErrorMessage
                      message={errors.categoryId}
                      touched={touched.categoryId}
                    />
                  </div><br></br>
                  {/* <img src={values.imageSrc} alt="asa" /> */}
                  <div className="form-col">
                    {!values.base64image && (
                      <>
                        {" "}
                        <label
                          htmlFor="contained-button-file"
                          className="file-upload-btn"
                        >
                          <Input
                            style={{border:"1px solid",padding:5}}
                            id="contained-button-file"
                            type="file"
                            inputProps={{ className: "small" }}
                            onBlur={handleBlur}
                            onChange={(e) => {
                              onSelectFile(e, setFieldValue, setFieldError);
                            }}
                          /><br></br><br></br>
                          <Button
                            variant="contained"
                            component="span"
                            className="btn pink-btn"
                          >
                            Upload
                          </Button>
                        </label>
                        <ValidationErrorMessage
                          message={errors.base64image}
                          touched={touched.base64image}
                        />
                      </>
                    )}
                    {values.base64image && (
                      <div className="uploaded-file-name">
                        <em>
                          <img src={values.base64image} alt="" />
                        </em>
                        image{" "}
                        <span
                          onClick={() => {
                            setFieldValue("base64image", "");
                          }}
                        >
                          x
                        </span>
                      </div>
                    )}
                  </div><br></br>
                  <div className="form-col full-width description">
                    <TextField
                      id="description"
                      name="description"
                      label="Description *"
                      variant="outlined"
                      value={values.description}
                      multiline
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    <ValidationErrorMessage
                      message={errors.description}
                      touched={touched.description}
                    />
                  </div><br></br>
                </div>
                <div className="btn-wrapper">
                  <Button
                    style={{margin:20, background:"green", color:"white"}}
                    className="green-btn btn"
                    variant="contained"
                    type="submit"
                    color="primary"
                    disableElevation
                  >
                    Save
                  </Button>
                  <Button
                    style={{margin:20, background:"red", color:"white"}}
                    className="pink-btn btn"
                    variant="contained"
                    type="button"
                    color="primary"
                    disableElevation
                    onClick={() => {
                      navigate("/bookdetails");
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    );
};

export default BookEdit;