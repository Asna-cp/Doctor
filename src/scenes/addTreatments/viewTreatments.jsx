import { Box, Button, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

const ViewTreatments = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [treatments, setTreatments] = useState([]);
  const [change, setChange] = useState(false);

  async function ViewTreatments() {
    axios
   
      .get(`${process.env.REACT_APP_PORT}/alltreatments`)
      .then((response) => {
        setTreatments(response?.data);
      });
  }
  useEffect(() => {
    ViewTreatments();
  }, [change]);

  //REMOVE TREATMENTS
  function removeTreatments(id) {
    axios
      .post(`${process.env.REACT_APP_PORT}/removeTreatments/${id}`)
      .then(change === true ? setChange(false) : setChange(true));
  }

  const columns = [
    { field: "_id", headerName: "ID" },
    {
      field: "treatmentname",
      headerName: "Treatment Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "description",
      headerName: "Description",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "about",
      headerName: "About",
      flex: 1,
    },

    {
      field: "access",
      headerName: "Access Level",
      flex: 1,
      renderCell: (cellValues) => {
        return (
          <Button
            onClick={() => removeTreatments(cellValues.row._id)}
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
      <Header title="TREATMENTS" subtitle="Managing The Treatments" />
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
          rows={treatments}
          columns={columns}
          getRowId={(row) => row._id}
        />
      </Box>
    </Box>
  );
};

export default ViewTreatments;
