import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from "@mui/material";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { defaultFilter, RecordsPerPage } from "../../constant/constant";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import bookService from "../../services/bookService";
import userService from "../../services/userService";
import WithAuth from "../../layout/WithAuth";
import Header from "../Header";
import ConfirmationDialog from "../ConfirmationDialog";
import { toast } from "react-toastify";

console.log("hello");
const User = () => {


  const [userResponse, setuserResponse] = useState({
    pageIndex: 0,
    pageSize: 10,
    totalPages: 1,
    items: [],
    totalItems: 0,
  });
  const [categories, setCategories] = useState([]);
  const [sortBy, setSortBy] = useState();
  const [filters, setFilter] = useState(defaultFilter);
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(0);

  useEffect(() => {
    getAllUsers();
  }, []);


  useEffect(() => {
    const timer = setTimeout(() => {
      if (filters.keyword === "") delete filters.keyword;
      getAllUsers({ ...filters });
    }, 500);
    return () => clearTimeout(timer);
  }, [filters]);

  const getAllUsers = async () => {
    await userService.getAllUsers(filters).then((res) => {
      if (res) {
        setuserResponse(res.data.result);
      }
    });
  };

  console.log(categories);

  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate("/")
  }

  // const userInfo = useContext(UserData);

  const userContext = useContext(AuthContext);

  const columns = [
    { id: "firstName", label: "First Name", minWidth: 100 },
    { id: "lastName", label: "Last Name", minWidth: 100 },
    {
      id: "email",
      label: "Email",
      minWidth: 170,
    },
    {
      id: "roleName",
      label: "Role",
      minWidth: 130,
    },
  ];

  const onConfirmDelete = async () => {
    await userService
      .deleteUser(selectedId)
      .then((res) => {
        if (res) {
          toast.success("DELETE SUCCESS");
          setOpen(false);
          setFilter({ ...filters });
        }
      })
      .catch((e) => toast.error("DELETE FAIL"));
  };

  return (

    <div>
      <Header />
      <div className="container">
        <Typography variant="h1">User Page</Typography>
        <div className="btn-wrapper">
          <TextField
            id="text"
            name="text"
            placeholder="Search..."
            variant="outlined"
            inputProps={{ className: "small" }}
            onChange={(e) => {
              setFilter({ ...filters, keyword: e.target.value, pageIndex: 1 });
            }}
          />
        </div>
        <TableContainer style={{border:"1px solid",margin:10,width:"210vh"}}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userResponse?.items?.map((row, index) => (
                <TableRow key={row.id}>
                  <TableCell>{row.firstName}</TableCell>
                  <TableCell>{row.lastName}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.role}</TableCell>
                  <TableCell>
                    <Button
                      style={{margin:20, background:"green", color:"white"}}
                      type="button"
                      className="green-btn btn"
                      variant="outlined"
                      color="primary"
                      disableElevation
                      onClick={() => {
                        navigate(`/useredit/${row.id}`);
                      }}
                    >
                      Edit
                    </Button>
                    {row.id !== userContext.user.id && (
                      <Button
                      style={{margin:20, background:"red", color:"white"}}
                        type="button"
                        className="btn pink-btn"
                        variant="outlined"
                        color="primary"
                        disableElevation
                        onClick={() => {
                          setOpen(true);
                          setSelectedId(row.id ?? 0);
                        }}
                      >
                        Delete
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
              {!userResponse?.items?.length && (
                <TableRow className="TableRow">
                  <TableCell colSpan={5} className="TableCell">
                    <Typography align="center" className="noDataText">
                      No Users
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={RecordsPerPage}
          component="div"
          count={userResponse.totalItems}
          rowsPerPage={filters.pageSize || 0}
          page={filters.pageIndex - 1}
          onPageChange={(e, newPage) => {
            setFilter({ ...filters, pageIndex: newPage + 1 });
          }}
          onRowsPerPageChange={(e) => {
            setFilter({
              ...filters,
              pageIndex: 1,
              pageSize: Number(e.target.value),
            });
          }}
        />
        <ConfirmationDialog
          open={open}
          onClose={() => setOpen(false)}
          onConfirm={() => onConfirmDelete()}
          title="Delete user"
          description="Are you sure you want to delete this User?"
        />
      </div>
    </div>

  );
};

export default WithAuth(User);