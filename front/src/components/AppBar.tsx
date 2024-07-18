import React from 'react';
import { Stack, Button, Typography, Box, Paper } from '@mui/material';
import { Block } from '@mui/icons-material';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import { after } from 'node:test';
import Link from 'next/link';



const MyAppBar: React.FC = () => {
  return <>
    <Paper elevation={10} sx={{
      position: "relative",
      width: "90%",
      mx: "auto",
      px: "10ch",
      py: "2vh",
      borderRadius: "0 0 15rem 15rem",
      border: "0 5px 5px 5px",
      borderStyle: "hidden solid solid solid",
      borderColor: "white",
      // , "&::after": {
      //   content: '""', position: "absolute", width: "100%", height: "100%", borderRadius: "15rem"
      //   , border: "1px solid black", p: "5px", top: "0"
      // },

      background: "linear-gradient(-133deg, #009788 5%, rgba(0,0,0,0.8940388655462185) 50%);",
      display: "flex",
      flexDirection: "row"
      , justifyContent: "center"
    }}>

      <Box display="flex" flexDirection="row" justifyContent={"space-between"} width={"100%"}  >
        <Stack direction={"row"}>
          <Typography variant='h3' sx={{
            fontFamily: "fantasy",
            color: "#009788",


          }}>S</Typography>
          <Typography variant='h3' sx={{
            fontFamily: "fantasy",
            color: "whitesmoke",


          }}>ick</Typography>
          <Typography variant='h3' sx={{
            fontFamily: "fantasy",
            color: "#009788",


          }}>M</Typography>
          <Typography variant='h3' sx={{
            fontFamily: "fantasy",
            color: "whitesmoke",


          }}>an</Typography>
          <VaccinesIcon sx={{
            fontSize: "50px",
            color: "whitesmoke"
          }}></VaccinesIcon>
        </Stack>
        <Stack sx={{

          "& .MuiButtonBase-root": {
            color: "white",
            fontWeight: "bold",
            fontSize: "17px",
            borderRadius: "2rem",
            padding: "1rem",
            maxWidth: "13ch",
            minWidth: "13ch",
            minHeight: "5ch",
            maxHeight: "5ch",
            textAlign: "center",
            "& .MuiTypography-root": { transition: "0.5s letter-spacing,0.1s color", letterSpacing: "5px", textAlign: "center", },




            "&:hover ": {
              background: "#eee",
              color: "black",
              "& .MuiTypography-root": {

                letterSpacing: "10px",
                // fontSize: "20px",              
              }
            },
            "&:active": {
              "& .MuiTypography-root": {
                letterSpacing: "0px",
                transition: "0.1s",
                // fontSize: "20px",              
              }
            }
          }



        }} direction={"row"} gap={10}>
          <Button href='/' LinkComponent={Link} disableRipple><Typography>
            HOME
          </Typography></Button>
          <Button href='/user' LinkComponent={Link} disableRipple><Typography>
            ADMIN
          </Typography></Button>
          <Button href='/admin' LinkComponent={Link} disableRipple><Typography>
            USER
          </Typography></Button>

        </Stack>

      </Box>
    </Paper >
  </>

};

export default MyAppBar;
