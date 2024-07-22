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
    { field: "firstName",headerName: "First name",width: 150,editable: true},
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
          <PriorityHighRoundedIcon sx={{ color: "yellow" }} />
        ) : (
          <></>
        ),
    },
    { field: "message", headerName: "Message", width: 150 },
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

export default function DataGridDemo() {
  const [rows , setRows] = React.useState([]);
  const [snackbar , setSnackbar] = React.useState({open: false, message:'' , severity:'success'});
  const fetchData = async () =>{
    try{
    const response = await axios.get('/api/get/all');
    setRows(response.data);
    setSnackbar({open:true , message:'Data fetched successfully!' , severity:'success'});
    }catch(error){
    setSnackbar({open:true , message:'Failed to fetch data.' , severity:'error'});
  }
  };
  React.useEffect(() =>{
    fetchData();
  }, []);

  const handleRefresh = ()=> {
    fetchData();
  };

  const handleCloseSnackBar = () => {
    setSnackbar({...snackbar , open: false});
  };

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <Button variant="contained" color='primary' onClick={handleRefresh} sx={{mb:2}}>Refresh</Button>
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
      />
      <Snackbar 
      open={snackbar.open}
      autoHideDuration={6000}
      onClose={handleCloseSnackBar}
      >
        <Alert onClose={handleCloseSnackBar} severity={snackbar.severity as AlertColor}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
   };
  
  
