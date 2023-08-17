import React, { useContext, useEffect, useState } from "react";
import * as Yup from "yup";

import { useNavigate, useParams } from "react-router-dom";
import userService from "../../services/userService";
import { Formik } from "formik";
import ValidationErrorMessage from "../ValidationErrorMessage";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/authContext";
import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";

const UserEdit = () => {
    const authContext = useContext(AuthContext);
    const [roles, setRoles] = useState([]);
    const [user, setUser] = useState();
    const navigate = useNavigate();
    const initialValues = {
      id: 0,
      email: "",
      lastName: "",
      firstName: "",
      roleId: 3,
    };
    const [initialValueState, setInitialValueState] = useState(initialValues);
    const { id } = useParams();
    console.log("User",user);
    console.log("RoleUserer",roles);

    useEffect(() => {
      getRoles();
    }, []);
  
    useEffect(() => {
      if (id) {
        getUserById();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);
  
    useEffect(() => {
      console.log(user,roles);
      if (user && roles) {
        const roleId = 2;
        // console.log("UserUseEffect",user.data.result.id);
        console.log("roleiD",roleId);
        setInitialValueState({
          id: user.id,
          email: user.email,
          lastName: user.lastName,
          firstName: user.firstName,
          roleId,
          password: user.password,
        });
      }
    }, [user, roles]);
  
    const validationSchema = Yup.object().shape({
      email: Yup.string()
        .email("Invalid email address format")
        .required("Email is required"),
      firstName: Yup.string().required("First Name is required"),
      lastName: Yup.string().required("Last Name is required"),
      roleId: Yup.number().required("Role is required"),
    });
  
    const getRoles = () => {
      userService.getAllRoles().then((res) => {
        if (res) {
          setRoles(res.data.result);
        }
      });
    };
  
    const getUserById = () => {
      userService.getById(Number(id)).then((res) => {
        if (res) {
          setUser(res.data.result);
        }
      });
    };
  
    const onSubmit = (values) => {
      const updatedValue = {
        ...values,
        role: roles.find((r) => r.id === values.roleId).name,
      };
      userService
        .update(updatedValue)
        .then((res) => {
          if (res) {
            toast.success("UPDATED SUCCESS");
            navigate("/userdetails");
          }
        })
        .catch((e) => toast.error("UPDATED FAIL"));
    };
  return (
    <div>
      <div className="container">
        <Typography variant="h1">Edit User</Typography>
        <Formik
          initialValues={initialValueState}
          validationSchema={validationSchema}
          enableReinitialize={true}
          onSubmit={onSubmit}
          validator={() => ({})}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <div className="form-row-wrapper">
                <div className="form-col">
                  <TextField
                    id="first-name"
                    name="firstName"
                    label="First Name *"
                    variant="outlined"
                    inputProps={{ className: "small" }}
                    value={values.firstName}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  /><br></br>
                  <ValidationErrorMessage
                    message={errors.firstName}
                    touched={touched.firstName}
                  />
                </div><br></br>
                <div className="form-col">
                  <TextField
                    onBlur={handleBlur}
                    onChange={handleChange}
                    id="last-name"
                    name="lastName"
                    label="Last Name *"
                    value={values.lastName}
                    variant="outlined"
                    inputProps={{ className: "small" }}
                  />
                  <ValidationErrorMessage
                    message={errors.lastName}
                    touched={touched.lastName}
                  />
                </div><br></br>
                <div className="form-col">
                  <TextField
                    onBlur={handleBlur}
                    onChange={handleChange}
                    id="email"
                    name="email"
                    label="Email *"
                    value={values.email}
                    variant="outlined"
                    inputProps={{ className: "small" }}
                  />
                  <ValidationErrorMessage
                    message={errors.email}
                    touched={touched.email}
                  />
                </div><br></br>
                {values.id !== authContext.user.id && (
                  <div className="form-col">
                    <FormControl
                      className="dropdown-wrapper"
                      variant="outlined"
                      disabled={values.id === authContext.user.id}
                    >
                      <InputLabel htmlFor="select">Roles</InputLabel>
                      <Select
                        name="roleId"
                        id={"roleId"}
                        onChange={handleChange}
                        disabled={values.id === authContext.user.id}
                        MenuProps={{
                          classes: { },
                        }}
                        value={values.roleId}
                      >
                        {roles.length > 0 &&
                          roles.map((role) => (
                            <MenuItem value={role.id} key={"name" + role.id}>
                              {role.name}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  </div>
                )}
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
                    navigate("/userdetails");
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

export default UserEdit;
