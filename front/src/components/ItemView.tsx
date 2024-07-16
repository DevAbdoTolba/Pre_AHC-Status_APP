import * as React from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(
  id: string,
  name: string,
  age: string,
  level: string,
  message: string,
  important: boolean,
  status: string
) {
  return { id: id, name: name, age: age, level: level, message: message, important: important, status: status };
}

const initialRows = [
  createData('DEV', 'Amr', ((new Date(2023, 7, 20)).toISOString().split('T')[0]), 'Easy', 'Good Luck', true, 'open'),
];

interface BasicSelectProps {
  onChange: (value: string) => void;
  sx?: any;
}

function BasicSelect({ onChange, sx }: BasicSelectProps) {
  const [important, setImportant] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setImportant(value);
    onChange(value);

  };

  return (
    <Box sx={sx}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Important</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={important}
          label="Important"
          onChange={handleChange}
        >
          <MenuItem value={'true'}>True</MenuItem>
          <MenuItem value={'false'}>False</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export default function ItemView() {
  const [rows, setRows] = React.useState(initialRows);

  const handleImportantChange = (value: string) => {
    setRows((prevRows) =>
      prevRows.map((row) => ({
        ...row,
        important: value === 'true',
      }))
    );
  };

  const setStatus = (status: string) => {
    setRows((prevRows) =>
      prevRows.map((row) => ({
        ...row,
        status: status,
      }))
    );
  };

  const deleteItem = (id: string) => {
    setRows((prevRows) => prevRows.filter((row) => row.id !== id));
  };

  const changeStatus = (id: string) => {
    setRows((prevRows) =>
      prevRows.map((row) => {
        if (row.id === id) {
          return {
            ...row,
            status: row.status === 'open' ? 'close' : 'open',
          };
        }
        return row;
      })
    );
  };
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAgree = () => {
    deleteItem('DEV');
    handleClose();
  };

  return (
    <Box sx={
      {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        margin: 'auto',
        padding: '20px',
      }

    }>
      <Typography variant='h1' sx={
        {
          alignItems: 'center',
          justifyContent: 'center',
          color: 'black',
          fontSize: '4rem',
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: '2rem',
        }
      }>Item Details</Typography>
      <BasicSelect onChange={handleImportantChange}
        sx={{
          display: 'flex',
          marginBottom: '1rem',
          width: '15%',

        }}
      />
      <TableContainer component={Paper} sx={{
        borderRadius: '10px',
      }}>
        <Table sx={{ minWidth: 700, }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell align="center">Name</StyledTableCell>
              <StyledTableCell align="center">Age</StyledTableCell>
              <StyledTableCell align="center">Level</StyledTableCell>
              <StyledTableCell align="center">Message</StyledTableCell>
              <StyledTableCell align="center">Important</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row">
                  {row.id}
                </StyledTableCell>
                <StyledTableCell align="center">{row.name}</StyledTableCell>
                <StyledTableCell align="center">{row.age}</StyledTableCell>
                <StyledTableCell align="center">{row.level}</StyledTableCell>
                <StyledTableCell align="center">{row.message}</StyledTableCell>
                <StyledTableCell align="center">
                  {row.important ? 'True' : 'False'}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.status === 'open' ?  <>open</> :  <>close</>}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ margin: '2rem' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => changeStatus('DEV')}
          sx={{ marginRight: '1rem' }}
        >
          Change Status
        </Button>
        <React.Fragment>
          <Button variant="contained"
            color="error" onClick={handleClickOpen}>
            Delete Item
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Confirm Deletion"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete this item? This action is irreversible.
                
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleAgree}>
              Confirm
              </Button>
            </DialogActions>
          </Dialog>
        </React.Fragment>
      </Box>

    </Box>

  );
}
