import { Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import Header from "../../components/Header";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [patients, setPatients] = useState([]);
  const [change, setChange] = useState([false]);

  async function Team() {
    axios
    .get(`${process.env.REACT_APP_PORT}/allpatients`)
      // .get("http://localhost:8080/api/v1/user/allpatients")
      .then((response) => {
        setPatients(response?.data);
      });
  }

  useEffect(() => {
    Team();
  }, [change]);

  //REMOVE PATIENTS
  function removePatients(id) {
    axios
      .post(`${process.env.REACT_APP_PORT}/removePatients/${id}`)
      .then(change === true ? setChange(false) : setChange(true));
  }
  const columns = [
    { field: "_id", headerName: "ID", flex: 0.5 },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
      justifyContent: "center",
    },

    {
      field: "email",
      headerName: "Email ",
      flex: 1,
    },
    {
      field: "access",
      headerName: "Access Level",
      flex: 1,
      renderCell: (cellValues) => {
        return (
          <Button
            onClick={() => removePatients(cellValues.row._id)}
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
      <Header title="PATIENTS" subtitle="Managing The Patients" />
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
          "&.MuiDataGrid-toolbarContainer.MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={patients}
          columns={columns}
          getRowId={(row) => row._id}
        />
      </Box>
    </Box>
  );
};

export default Team;
