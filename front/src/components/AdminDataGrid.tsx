// import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import * as React from 'react';
import PriorityHighRoundedIcon from "@mui/icons-material/PriorityHighRounded";
import { green, yellow, red ,blue } from "@mui/material/colors";
import { Button, Typography,Snackbar,Alert, AlertColor } from '@mui/material';
import Link from 'next/link';
import axios from 'axios';

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 150 },
    { field: "name",headerName: "First name",width: 150,editable: true},
    { field: "status", headerName: "Status", width: 150 },
    {
      field: "level",
      headerName: "Level",
      width: 150,
      renderCell: (params) => {
        let color;
        switch (params.value) {
          case "easy":
            color = green[500]; // MUI green color
            break;
          case "normal":
            color = yellow[500]; // MUI yellow color
            break;
          case "hard":
            color = red[500]; // MUI red color
            break;
        }
        return (
          <Typography
            sx={{ color: color }}
            variant="body1"
          >
            {params.value}
          </Typography>
        );
      },
    },
    {
      field: "age",
      headerName: "Age",
      type: "date",
      width: 150,
      editable: false,
    },
    {
      field: "important",
      headerName: "Important",
      width: 150,
      renderCell: (params) =>
        params.value === "true" ? (
          <>
          <PriorityHighRoundedIcon sx={{ color: "yellow" }} />
          true
          </>
        ) : (
          <>false</>
        ),
    },
    { field: "msg", headerName: "Message", width: 150 },
    {
      field: "view",
      headerName: "View",
      width: 150,
      renderCell: (params) => (
        <Button
          component={Link}
          href={`/item/${params.row.id}`}
          variant="contained"
          color="primary"
        >
          View
        </Button>
      ),
    },
  ];
  // Default rows data

export default function DataGridDemo() {
  const [rows, setRows] = React.useState([]);
  const [snackbar , setSnackbar] = React.useState({open: false, message:'' , severity:'success'});
  const fetchData = async (endpoint: string, params = {}) => {
    try {
      const response = await axios.get(endpoint, { params });
      response.data.forEach((row: any) => {
        row.age = new Date(row.age);
      });
      setRows(response.data);
      setSnackbar({
        open: true,
        message: "Data fetched successfully!",
        severity: "success",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Failed to fetch data.",
        severity: "error",
      });
    }
  };
  React.useEffect(() =>{
    fetchData("/api/get/all");
  }, []);

  
  const handleCloseSnackBar = () => {
    setSnackbar({...snackbar , open: false});
  };

  return (
    <Box
      sx={{
        height: "88vh",
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          justifyItems: "space-around",
          m: 1,
          flexWrap: "wrap",
        }}
      >
        <Button
          variant="contained"
          color="inherit"
          onClick={() => fetchData("/api/get/all")}
          sx={{
            width: "20vw",
            height: "7vh",
            mt: 2,
            m: 1,
            fontFamily: "fantasy",
            color: "#009889",
            backgroundColor: "#333",
            borderRadius: "12px",
            fontSize: "1.5rem",
          }}
        >
          View All
        </Button>
        <Button
          variant="contained"
          color="inherit"
          onClick={() => fetchData("/api/get/status", { status: "open" })}
          sx={{
            width: "20vw",
            height: "7vh",
            fontFamily: "fantasy",
            color: "#009889",
            backgroundColor: "#333",
            borderRadius: "12px",
            fontSize: "1.5rem",
            m: 1,
          }}
        >
          Open Only
        </Button>
        <Button
          variant="contained"
          color="inherit"
          onClick={() => fetchData("/api/get/status", { status: "close" })}
          sx={{
            width: "20vw",
            height: "7vh",
            fontFamily: "fantasy",
            color: "#009889",
            backgroundColor: "#333",
            borderRadius: "12px",
            fontSize: "1.5rem",
            m: 1,
          }}
        >
          Closed Only
        </Button>
        <Button
          variant="contained"
          color="inherit"
          onClick={() => fetchData("/api/get/important")}
          sx={{
            width: "20vw",
            height: "7vh",
            fontFamily: "fantasy",
            color: "#009889",
            backgroundColor: "#333",
            borderRadius: "12px",
            fontSize: "1.5rem",
            m: 1,
          }}
        >
          Important Only
        </Button>
        <Button
          variant="contained"
          color="inherit"
          onClick={() => fetchData("/api/get/level", { level: "easy" })}
          sx={{
            width: "20vw",
            height: "7vh",
            fontFamily: "fantasy",
            color: "#009889",
            backgroundColor: "#333",
            borderRadius: "12px",
            fontSize: "1.5rem",
            m: 1,
          }}
        >
          Easy
        </Button>
        <Button
          variant="contained"
          color="inherit"
          onClick={() => fetchData("/api/get/level", { level: "normal" })}
          sx={{
            width: "20vw",
            height: "7vh",
            fontFamily: "fantasy",
            color: "#009889",
            backgroundColor: "#333",
            borderRadius: "12px",
            fontSize: "1.5rem",
            m: 1,
          }}
        >
          Normal
        </Button>
        <Button
          variant="contained"
          color="inherit"
          onClick={() => fetchData("/api/get/level", { level: "hard" })}
          sx={{
            width: "20vw",
            height: "7vh",
            fontFamily: "fantasy",
            color: "#009889",
            backgroundColor: "#333",
            borderRadius: "12px",
            fontSize: "1.5rem",
            m: 1,
          }}
        >
          Hard
        </Button>
      </Box>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
        sx={{
          "& .MuiDataGrid-columnHeader, & .MuiDataGrid-cell, & .MuiDataGrid-footerCell": {
            fontSize: "1rem",
          },
        }}
      />
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackBar}
      
      >
        <Alert
          onClose={handleCloseSnackBar}
          severity={snackbar.severity as AlertColor}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
   };
  
  
