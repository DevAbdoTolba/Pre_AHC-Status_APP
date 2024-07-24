import React, { useState } from "react";
import {
       TextField,
       Button,
       CircularProgress,
       Alert,
       MenuItem,
       Select,
       FormControl,
       InputLabel,
       Container,
       Paper,
       Typography,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { pink, teal } from "@mui/material/colors";
import { useForm, Controller } from "react-hook-form";
import { json } from "stream/consumers";

// Custom theme
const theme = createTheme({
       palette: {
              primary: {
                     main: teal[500],
              },
              secondary: {
                     main: pink[500],
              },
       },
});

const levels = ["easy", "normal", "hard"];

type FormValues = {
       name: string;
       age: Date;
       level: "easy"|"normal"|"hard";
       msg: string;
};

const UserFormDesign: React.FC = () => {
       const {
              handleSubmit,
              register,
              control, reset,
              formState: { errors },
       } = useForm<FormValues>();
       const [loading, setLoading] = useState(false);
       const [success, setSuccess] = useState(false);
       const [error, setError] = useState<string | null>(null);

       
const onSubmit = async (data: FormValues) => {
       setLoading(true);
       setError(null);
       setSuccess(false);
   
       let resetFields: Partial<FormValues> = {}; // Define which fields to reset
   
       try {
           const result = await fetch("/api/post/create", {
               method: "POST",
               headers: { "Content-Type": "application/json" },
               body: JSON.stringify(data),
           });
   
           if (result.ok) {
               setSuccess(true);
               
           } else {
               throw new Error();
           }
       } catch (e) {
              reset();
           setSuccess(false);
          setError("Submission failed");
       } finally {
           setLoading(false);
           
           setError("Submission failed"); 
       }
   };
   
       // Validation functions
       const hasSpecialCharacters = (input: string) =>
              /^[A-Za-z\u0600-\u06FF\s]+$/.test(input) ||
              "Special characters and digits not allowed";
       const isUserNameVeryBig = (input: string) =>
              input.length < 50 || "Your Name is very Big";
       const isMessageBig = (input: string) =>
              input.length < 200 || "Message is very Big";

       return (
              <ThemeProvider theme={theme}>
                     <Container
                            maxWidth="sm"
                            sx={{
                                   display: "flex",
                                   flexDirection: "column",
                                   alignItems: "center",
                                   justifyContent: "center",
                                   height: "90vh",
                                   backgroundColor: "#e0f7fa",
                                   boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
                                   borderStyle: "hidden solid solid solid",
                                   borderColor: "white",
                                   borderRadius: "0 0 3rem 3rem",
                                   opacity: 0.8,
                                   background: `
                                     radial-gradient(circle, transparent 20%, #e5e5f7 20%, #e5e5f7 80%, transparent 80%, transparent),
                                     radial-gradient(circle, transparent 20%, #e5e5f7 20%, #e5e5f7 80%, transparent 80%, transparent) 25px 25px,
                                     linear-gradient(#009788 2px, transparent 2px) 0 -1px,
                                     linear-gradient(90deg, #009788 2px, #e5e5f7 2px) -1px 0
                                   `,
                                   backgroundSize: '50px 50px, 50px 50px, 25px 25px, 25px 25px',
                                   // padding: '20px'

                            }}
                     >
                            <Paper
                                   elevation={3}
                                   sx={{
                                          padding: "2rem",
                                          borderRadius: "10px",
                                          maxWidth: "400px",
                                          width: "100%",
                                          backgroundColor: "rgba(255, 255, 255, 0.8)",
                                          overflow: "hidden",
                                   }}
                            >
                                   <Typography
                                          variant="h4"
                                          align="center"
                                          color="primary"
                                          gutterBottom
                                          sx={{
                                                 fontWeight: "bold",
                                                 color: teal[800],
                                          }}
                                   >
                                          User Form
                                   </Typography>
                                   <form
                                          onSubmit={handleSubmit(onSubmit)}
                                          style={{
                                                 display: "flex",
                                                 flexDirection: "column",
                                                 gap: "1rem",
                                          }}
                                   >
                                          {success && (
                                                 <Alert severity="success">Form submitted successfully!</Alert>
                                          )}
                                          {error && <Alert severity="error">{error}</Alert>}

                                          <TextField
                                                 label="Name"
                                                 {...register("name", {
                                                        required: "name is Required",
                                                        validate: {
                                                               NoBigMsg: isUserNameVeryBig,
                                                               NoSpecialLetters: hasSpecialCharacters,
                                                        },
                                                 })}
                                                 error={!!errors.name}
                                                 helperText={errors.name?.message ? errors.name?.message : " "}
                                                 variant="outlined"
                                                 sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                                          />

                                          <TextField
                                                 label="Age"
                                                 type="date"
                                                 {...register("age", { required: "Age is Required" })}
                                                 InputLabelProps={{ shrink: true }}
                                                 error={!!errors.age}
                                                 helperText={errors.age?.message ? errors.age?.message : " "}
                                                 variant="outlined"
                                                 sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                                          />

                                          <FormControl
                                                 variant="outlined"
                                                 error={!!errors.level}
                                                 sx={{ borderRadius: 2 }}
                                          >
                                                 <InputLabel id="level-label">Level</InputLabel>
                                                 <Controller
                                                        name="level"
                                                        control={control}
                                                        defaultValue=""
                                                        rules={{ required: "Difficulty field is required" }}
                                                        render={({ field }) => (
                                                               <Select labelId="level-label" label="Level" {...field}>
                                                                      {levels.map((level) => (
                                                                             <MenuItem key={level} value={level}>
                                                                                    {level}
                                                                             </MenuItem>
                                                                      ))}
                                                               </Select>
                                                        )}
                                                 />
                                                 {errors.level ? (
                                                        <Typography variant="body2" color="error">
                                                               {errors.level.message}
                                                        </Typography>
                                                 ) : (
                                                        <Typography variant="body2" color="error">
                                                               {'\u00A0'}
                                                        </Typography>
                                                 )}
                                          </FormControl>

                                          <TextField
                                                 label="Message"
                                                 {...register("msg", {
                                                        required: "Message field is required",
                                                        validate: {
                                                               NoBigMsg: isMessageBig,
                                                               NoSpecialLetters: hasSpecialCharacters,
                                                        },
                                                 })}
                                                 multiline
                                                 rows={4}
                                                 error={!!errors.msg}
                                                 helperText={errors.msg?.message ? errors.msg?.message : " "}
                                                 variant="outlined"
                                                 sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                                          />

                                          <Button
                                                 type="submit"
                                                 variant="contained"
                                                 color="primary"
                                                 disabled={loading}
                                                 sx={{ marginTop: "1rem", borderRadius: 2, textTransform: "none" }}
                                          >
                                                 {loading ? <CircularProgress size={24} /> : "Submit"}
                                          </Button>
                                   </form>
                            </Paper>
                     </Container>
              </ThemeProvider>
       );
};

export default UserFormDesign;