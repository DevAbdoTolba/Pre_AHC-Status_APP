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
import { useRouter } from "next/router"; 


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    
    color: theme.palette.common.white,
    fontFamily: "f",
   
    background: "linear-gradient(-133deg, #009788 5%, rgba(0,0,0,0.8940388655462185)70%);",
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
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

interface RowData {
  id: string;
  name: string;
  age: string;
  level: string;
  msg: string;
  important: boolean;
  status: string;
}

 
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
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '5vh',
        minWidth: '30vh',
        bgcolor: '',
        color: 'common.white',
        margin:'20px',
        marginLeft:100,
      marginBottom:10,
      "&:hover ": {
             backgroundColor:"#009788",
              color: "black"}, 
      }}
    >
      <FormControl
        fullWidth
        sx={{
          maxWidth: 400,
         
          '& .MuiInputLabel-root': {
            color: '#000000',
            
            
          },
          '& .MuiSelect-root': {
            color: '#000000',
            borderRadius: 9,
            '&:focus': {
              borderColor: '#000000',
              
            },
          },
          '& .MuiMenuItem-root': {
            color: '#000000',
          },
        }}
      >
        
        <InputLabel id="demo-simple-select-label">Important</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={important}
          label="Important"
          onChange={handleChange}
          variant="outlined"
        >
          <MenuItem value={'true'}>True</MenuItem>
          <MenuItem value={'false'}>False</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

interface ItemViewProps {
  data: RowData;
}

const ItemView: React.FC<ItemViewProps> = ({ data }) => {
  const [row, setRow] = React.useState<RowData | null>(data);
  const [open, setOpen] = React.useState(false);
 
  const router = useRouter();
  const handleImportantChange = async (value: string) => {
  
     if (row) {
       try {
         await fetch(`/api/patch/update_important/${row.id}`, {
           method: "PATCH",
           headers: { "Content-Type": "application/json" },
           body: JSON.stringify({ important: value === "true" }),
         });
         setRow({
           ...row,
           important: value === "true",
         });
       } catch (error) {
         console.error("Error updating important status:", error);
       }
     }
  };

  const setStatus = async(status: string) => {
     if (row) {
       try {
         await fetch(`/api/patch/update_status/${row.id}`, {
           method: "PATCH",
           headers: { "Content-Type": "application/json" },
           body: JSON.stringify({ status }),
         });
         setRow({
           ...row,
           status: status,
         });
       } catch (error) {
         console.error("Error updating status:", error);
       }
     }
  };

  const deleteItem = async() => {
     if (row) {
       try {
         await fetch(`/api/delete/${row.id}`, {
           method: "DELETE",
         });
         setRow(null);
        router.push("/"); 
       } catch (error) {
         console.error("Error deleting item:", error);
       }
     }
  };

  const changeStatus = () => {
   if (row) {  
     const newStatus = row.status === "open" ? "close" : "open";
     setStatus(newStatus);
    }
  };
  

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAgree = () => {
    deleteItem();
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
      
    
       <Box  justifyContent="center" alignItems="center" mt={5}>
      <Box flex={0} textAlign="left" mr={100}>
        
        <Typography variant="h1" sx={{ alignItems: 'center', justifyContent: 'center', fontSize: '3rem' , textAlign: 'center',  
        color: "#009788" ,fontFamily: "fantasy",letterSpacing: "3px",borderRadius: "2rem",
      }}>
                     Item Details
      </Typography>
      
      </Box>
      <Box flex={1}>
      
      </Box>
    </Box>
      <BasicSelect
        onChange={handleImportantChange}
        sx={{
          display: 'flex',
          marginBottom: '1rem',
          width: '15%',
          '& .MuiInputLabel-root': {
            color: 'primary.main',
          },
          '& .MuiSelect-select': {
            color: 'primary.main',
          },
        }}
      />
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
            {row ? (  
              <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row">
                  {row.id}
                </StyledTableCell>
                <StyledTableCell align="center">{row.name}</StyledTableCell>
                <StyledTableCell align="center">{row.age}</StyledTableCell>
                <StyledTableCell align="center">{row.level}</StyledTableCell>
                <StyledTableCell align="center">{row.msg}</StyledTableCell>
                <StyledTableCell align="center">{row.important ? 'True' : 'False'}</StyledTableCell>
                <StyledTableCell align="center">
                  {row.status === 'open' ? <CheckCircleIcon sx={{ color: 'success.main' }} /> : <CancelIcon sx={{ color: 'error.main' }} />}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={changeStatus}
                    sx={{ marginRight: '0.5rem', transition: 'transform 0.3s ease', background: "black" }}
                    disableElevation
                    size="small"
                  >
                    {row.status === 'open' ? 'Close' : 'Open'}
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={handleClickOpen}
                    sx={{ transition: 'transform 0.3s ease', background: "#009788" }}
                    disableElevation
                    size="small"
                    startIcon={<DeleteIcon />}
                  >
                    Delete
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ) : (
              <StyledTableRow>
                <StyledTableCell colSpan={8} align="center">
                  No data available.
                </StyledTableCell>
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ margin: '2rem' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => changeStatus()}
          sx={{ marginRight: '1rem', transition: 'transform 0.3s ease' , background: " #009788"}}
          disableElevation
        >
          Change Status
        </Button>
        <React.Fragment>
          <Button
            variant="contained"
            color="error"
            onClick={handleClickOpen}
            sx={{ transition: 'transform 0.3s ease', background: " black",  }}
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
}
export default ItemView;
