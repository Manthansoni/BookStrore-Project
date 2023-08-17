import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from "@mui/material";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { defaultFilter, RecordsPerPage } from "../../constant/constant";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import bookService from "../../services/bookService";
import WithAuth from "../../layout/WithAuth";
import Header from "../Header";
import ConfirmationDialog from "../ConfirmationDialog";
import { toast } from "react-toastify";

console.log("hello");
const Books = () => {

  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(0);

  const [bookResponse, setbookResponse] = useState({
    pageIndex: 0,
    pageSize: 10,
    totalPages: 1,
    items: [],
    totalItems: 0,
  });
  const [categories, setCategories] = useState([]);
  const [sortBy, setSortBy] = useState();
  const [filters, setFilter] = useState(defaultFilter);

  useEffect(() => {
    getAllCategories();
  }, []);


  useEffect(() => {
    const timer = setTimeout(() => {
      if (filters.keyword === "") delete filters.keyword;
      searchAllBooks({ ...filters });
    }, 500);
    return () => clearTimeout(timer);
  }, [filters]);

  const searchAllBooks = (filters) => {
    bookService.getAll(filters).then((res) => {
      setbookResponse(res.data.result);
      // setCategories(res.data.result);
    });
  };

  const getAllCategories = async () => {
    await bookService.GetAllBooks().then((res) => {
      if (res) {
        setCategories(res.data.result);
      }
    });
  };

  console.log(categories);

  const navigate = useNavigate();
  // const userInfo = useContext(UserData);

  const onConfirmDelete = () => {
    bookService
      .deleteBook(selectedId)
      .then(() => {
        toast.success("Deleted Successfully");
        setOpen(false);
        setFilter({ ...filters, pageIndex: 1 });
      })
      .catch((e) => toast.error("Error"));
  };

  // const userContext = useContext(AuthContext);

  const columns = [
    { id: "name", label: "Book Name", minWidth: 100 },
    { id: "price", label: "Price", minWidth: 100 },
    { id: "category", label: "Category", minWidth: 100 },
  ];

  return (

    <div>
      <Header />
      <div className="container">
        <Typography variant="h3">Book Page</Typography>
        <div className="btn-wrapper">
          <TextField
            style={{margin:20}}
            id="text"
            name="text"
            placeholder="Search..."
            variant="outlined"
            inputProps={{}}
            onChange={(e) => {
              setFilter({ ...filters, keyword: e.target.value, pageIndex: 1 });
            }}
          />
          <Button
            style={{margin:20, float:"right"}}
            type="button"
            className="btn pink-btn"
            variant="contained"
            color="primary"
            disableElevation
            onClick={() => navigate("/bookedit")}
          >
            Add
          </Button>
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
              {bookResponse?.items?.map((row, index) => (
                <TableRow key={row.id}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.price}</TableCell>
                  <TableCell>
                    {categories.find((c) => c.id === row.categoryId)?.name}
                  </TableCell>
                  <TableCell>
                    <Button
                      style={{margin:20, background:"green", color:"white"}}
                      type="button"
                      className="green-btn btn"
                      variant="contained"
                      color="primary"
                      disableElevation
                      onClick={() => {
                        navigate(`/bookedit/${row.id}`);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      style={{margin:20, background:"red", color:"white"}}
                      type="button"
                      className="btn pink-btn"
                      variant="contained"
                      color="primary"
                      disableElevation
                      onClick={() => {
                        setOpen(true);
                        setSelectedId(row.id ?? 0);
                      }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {!bookResponse.items.length && (
                <TableRow className="TableRow">
                  <TableCell colSpan={5} className="TableCell">
                    <Typography align="center" className="noDataText">
                      No Books
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
          count={bookResponse.totalItems}
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
          title="Delete book"
          description="Are you sure you want to delete this book?"
        />
      </div>
    </div>

  );
};

export default WithAuth(Books);