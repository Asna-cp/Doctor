import { Box, Button, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

const Doctors = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [doctors, setDoctors] = useState([]);
  const [change, setChange] = useState(false);
  async function getDoctors() {
    axios
    .get(`${process.env.REACT_APP_PORT}/alldoctors`)
    // .get("http://localhost:8080/api/v1/user/alldoctors")
    .then((response) => {
      debugger
      setDoctors(response?.data);
    });
  }
  useEffect(() => {
    getDoctors();
  }, [change]);

  //REMOVE DOCTORS

  function removeDoctor(id) {
    
    axios
  
    .post(`${process.env.REACT_APP_PORT}/removeDoctor/${id}`)
      // .post(`http://localhost:8080/admin/removeDoctor/${id}`)
      .then(change === true ? setChange(false) : setChange(true));
      debugger
  }

  const columns = [
    { field: "_id", headerName: "ID" },
    {
      field: "doctorName",
      headerName: "Doctor Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "specialist",
      headerName: "Specialist",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
    },

    {
      field: "access",
      headerName: "Access Level",
      flex: 1,
      renderCell: (cellValues) => {
        return (
          <Button
            onClick={() => removeDoctor(cellValues.row._id)}
            size="md"
            sx={{ backgroundColor: "grey" }}
          >
            Remove
          </Button>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Header title="DOCTORS" subtitle="Managing The Doctors" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "&.MuiDataGrid-root": {
            border: "none",
          },
          "&.MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "&.name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={doctors}
          columns={columns}
          getRowId={(row) => row._id}
        />
      </Box>
    </Box>
  );
};

export default Doctors;
