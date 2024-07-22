import React from 'react';
import { styled } from '@mui/material/styles';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.common.white,
    fontFamily: 'f',
    background: 'linear-gradient(-133deg, #009788 5%, rgba(0,0,0,0.8940388655462185)70%);',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    transition: 'background-color 0.3s ease',
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

interface RowData {
  id: string;
  name: string;
  age: string;
  level: string;
  message: string;
  important: boolean;
  status: string;
}

interface ItemViewProps {
  data: RowData;
}

const ItemView: React.FC<ItemViewProps> = ({ data }) => {
  const [row, setRow] = React.useState(data);

  const handleImportantChange = (value: string) => {
    setRow((prevRow) => ({
      ...prevRow,
      important: value === 'true',
    }));
  };

  const changeStatus = (id: string) => {
    setRow((prevRow) => ({
      ...prevRow,
      status: prevRow.status === 'open' ? 'close' : 'open',
    }));
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAgree = () => {
    // Delete item logic here
    handleClose();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        margin: 'auto',
        padding: '20px',
      }}
    >
      <Box justifyContent="center" alignItems="center" mt={5}>
        <Box flex={0} textAlign="left" mr={100}>
          <Typography
            variant="h1"
            sx={{
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '3rem',
              textAlign: 'center',
              color: '#009788',
              fontFamily: 'fantasy',
              letterSpacing: '3px',
              borderRadius: '2rem',
            }}
          >
            Item Details
          </Typography>
        </Box>
        <Box flex={1}></Box>
      </Box>
      <TableContainer component={Paper} sx={{ borderRadius: '6px' }}>
        <Table sx={{ minWidth: 900 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell align="center">Name</StyledTableCell>
              <StyledTableCell align="center">Age</StyledTableCell>
              <StyledTableCell align="center">Level</StyledTableCell>
              <StyledTableCell align="center">Message</StyledTableCell>
              <StyledTableCell align="center">Important</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
                {row.id}
              </StyledTableCell>
              <StyledTableCell align="center">{row.name}</StyledTableCell>
              <StyledTableCell align="center">{row.age}</StyledTableCell>
              <StyledTableCell align="center">{row.level}</StyledTableCell>
              <StyledTableCell align="center">{row.message}</StyledTableCell>
              <StyledTableCell align="center">{row.important ? 'True' : 'False'}</StyledTableCell>
              <StyledTableCell align="center">
                {row.status === 'open' ? <CheckCircleIcon sx={{ color: 'success.main' }} /> : <CancelIcon sx={{ color: 'error.main' }} />}
              </StyledTableCell>
              <StyledTableCell align="center">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => changeStatus(row.id)}
                  sx={{ marginRight: '0.5rem', transition: 'transform 0.3s ease', background: 'black' }}
                  disableElevation
                  size="small"
                >
                  {row.status === 'open' ? 'Close' : 'Open'}
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleClickOpen}
                  sx={{ transition: 'transform 0.3s ease', background: ' #009788' }}
                  disableElevation
                  size="small"
                  startIcon={<DeleteIcon />}
                >
                  Delete
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ margin: '2rem' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => changeStatus(row.id)}
          sx={{ marginRight: '1rem', transition: 'transform 0.3s ease', background: ' #009788' }}
          disableElevation
        >
          Change Status
        </Button>
        <React.Fragment>
          <Button
            variant="contained"
            color="error"
            onClick={handleClickOpen}
            sx={{ transition: 'transform 0.3s ease', background: ' black' }}
            disableElevation
            startIcon={<DeleteIcon />}
          >
            Delete Item
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure you want to delete this item? This action is irreversible.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleAgree} color="error">
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
        </React.Fragment>
      </Box>
    </Box>
  );
};

export default ItemView;
