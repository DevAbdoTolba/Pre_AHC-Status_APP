// import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import * as React from 'react';



  
 const columns: GridColDef<(typeof rows)[number]>[] = [
  { field: "id", headerName: "ID", width: 150 },
  {
    field: "firstName",
    headerName: "First name",
    width: 150,
    editable: true,

  },
  {
    field: "status",
    headerName: "status",
    width: 150,
  },
  {
    field: "level",
    headerName: "Level",
    width: 150,
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
    headerName: "important",

    sortable: false,
    width: 150,
  },
  {
    field: "message",
    headerName: "message",
    width: 150,
  },
];

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
  return (
    <Box sx={{ height: 400, width: '100%' }}>
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
        
      />
      
    </Box>
  );
   };
  
  
