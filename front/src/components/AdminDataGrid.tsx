// import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import * as React from 'react';
import PriorityHighRoundedIcon from "@mui/icons-material/PriorityHighRounded";
import { green, yellow, red } from "@mui/material/colors";
import { useRouter } from "next/router";
import { Button } from '@mui/material';



const rows = [
  {
    id: 1,
    level: "easy",
    firstName: "Jon",
    age: new Date("2000-02-05"),
    important: "false",
    status: "open",
    message: "frontend",
  },
  {
    id: 2,
    level: "easy",
    firstName: "Cersei",
    age: new Date("2000-02-05"),
    important: "ture",
    status: "open",
    message: "hello",
  },
  {
    id: 3,
    level: "normal",
    firstName: "Jaime",
    age: new Date("2000-02-05"),
    important: "false",
    status: "close",
    message: "frontend",
  },
  {
    id: 4,
    level: "high",
    firstName: "Arya",
    age: new Date("2000-02-05"),
    important: "false",
    status: "open",
    message: "backend",
  },
  {
    id: 5,
    level: "difficult",
    firstName: "Daenerys",
    age: new Date("2000-02-05"),
    important: "true",
    status: "close",
    message: "backend",
  },
  {
    id: 6,
    level: "easy",
    firstName: "Aill",
    age: new Date("2000-02-05"),
    important: "true",
    status: "open",
    message: "hello",
  },
  {
    id: 7,
    level: null,
    firstName: "Ferrara",
    age: new Date("2000-02-05"),
    important: "ture",
    status: "open",
    message: "frontend",
  },
  {
    id: 8,
    level: "normal",
    firstName: "Rossini",
    age: new Date("2000-02-05"),
    important: "true",
    status: "open",
    message: "frontend",
  },
  {
    id: 9,
    level: "difficult",
    firstName: "Harvey",
    age: new Date("2000-02-05"),
    important: "false",
    status: "open",
    message: "frontend",
  },
];


export default function DataGridDemo() {
   const router = useRouter();

   // Define the click handler for the "View" button
   const handleViewClick = (id: number) => {
     router.push(`/item/${id}`);
   };
     
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 150 },
    {
      field: "firstName",
      headerName: "First name",
      width: 150,
      editable: true,
    },
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
          case "high":
          case "difficult":
            color = red[500]; // MUI red color
            break;
          default:
            color = "inherit"; // Default color
        }
        return <div style={{ color: color }}>{params.value}</div>;
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
          <div></div> 
        ),
    },
    { field: "message", headerName: "Message", width: 150 },
    {
      field: "view",
      headerName: "View",
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleViewClick(params.row.id)}
        >
          View
        </Button>
      ),
    },
  ];
  return (
    <Box sx={{ height: 400, width: "100%" }}>
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
    </Box>
  );
   };
  
  
