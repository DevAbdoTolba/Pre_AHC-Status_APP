import React, { useState } from 'react';
import { TextField, Button, CircularProgress, Alert, MenuItem, Select, FormControl, InputLabel, OutlinedInput, Chip, Box, Typography, Container, Paper } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { pink, teal } from '@mui/material/colors';

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

const levels = ['Easy', 'Normal', 'Hard'];

const UserFormDesign: React.FC = () => {
  const [name, setName] = useState('');
  const [dob, setDob] = useState<string>('');
  const [level, setLevel] = useState<string[]>([]);
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setSuccess(false);
    setValidationError(null);

    // Validate inputs
    if (!name || !dob || level.length === 0 || !msg) {
      setValidationError('All fields are required.');
      return;
    }

    setLoading(true);

    // network request
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setSuccess(true);

      // Clear the form fields
      setName('');
      setDob('');
      setLevel([]);
      setMsg('');
    } catch (err) {
      setError('Submission failed');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event: SelectChangeEvent<typeof level>) => {
    const { target: { value } } = event;
    setLevel(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container
        maxWidth="sm"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          backgroundColor: '#e0f7fa',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: '2rem',
            borderRadius: '10px',
            maxWidth: '400px',
            width: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            overflow: 'hidden',
          }}
        >
          <Typography
            variant="h4"
            align="center"
            color="primary"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              color: teal[800],
            }}
          >
            User Form
          </Typography>
          <form
            onSubmit={handleSubmit}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            {success && <Alert severity="success">Form submitted successfully!</Alert>}
            {error && <Alert severity="error">{error}</Alert>}
            {validationError && <Alert severity="error">{validationError}</Alert>}

            <TextField
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              variant="outlined"
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            />

            <TextField
              label="Date of Birth"
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              InputLabelProps={{ shrink: true }}
              required
              variant="outlined"
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            />

            <FormControl variant="outlined">
              <InputLabel id="demo-multiple-chip-label">Level</InputLabel>
              <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                value={level}
                onChange={handleChange}
                input={<OutlinedInput id="select-multiple-chip" label="Level" />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} sx={{ backgroundColor: teal[100], color: teal[900] }} />
                    ))}
                  </Box>
                )}
                sx={{ borderRadius: 2 }}
              >
                {levels.map((level) => (
                  <MenuItem key={level} value={level}>
                    {level}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Message"
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              multiline
              rows={4}
              variant="outlined"
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              sx={{ marginTop: '1rem', borderRadius: 2, textTransform: 'none' }}
            >
              {loading ? <CircularProgress size={24} /> : 'Submit'}
            </Button>
          </form>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default UserFormDesign;
