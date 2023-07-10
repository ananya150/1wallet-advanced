import React, { useEffect, useRef } from 'react';
import TextField from '@mui/material/TextField';
import { createTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const theme = createTheme({
    palette: {
      primary: {
        main: '#767675', // Replace with your desired primary color
      },
      text: {
        primary: '#767675', // Replace with your desired text color
      },
    },
  });

const useStyles = makeStyles((theme) => ({
  mismatch: {
    borderColor: 'red',
  },
  match: {
    '& .MuiInputBase-input': {
        background: '#121212',
      },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'rgba(140,140,140,0.5)', // Replace with your desired border color
      },
      '&:hover fieldset': {
        borderColor: 'rgba(140,140,140,0.5)', // Replace with your desired hover border color
      },
      '&.Mui-focused fieldset': {
        borderColor: 'green', // Replace with your desired focused border color
      },
      '& input': {
        color: '#FFFFFF', // Replace with your desired text color
      },
    },
  },
  input: {
    '& .MuiInputBase-input': {
        background: '#121212',
      },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'rgba(140,140,140,0.5)', // Replace with your desired border color
      },
      '&:hover fieldset': {
        borderColor: 'rgba(140,140,140,0.5)', // Replace with your desired hover border color
      },
      '&.Mui-focused fieldset': {
        borderColor: 'rgba(140,140,140,0.5)', // Replace with your desired focused border color
      },
      '& input': {
        color: '#FFFFFF', // Replace with your desired text color
      },
    },
  },
}));

const PasswordMatchComponent = ({password, setPassword, confirmPassword, setConfirmPassword}: any) => {
  const firstTextFieldRef = useRef<any>(null);
  const classes = useStyles();

  const handlePasswordChange = (event: any) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event: any) => {
    setConfirmPassword(event.target.value);
  };

  const passwordsMatch = password === confirmPassword;

  useEffect(() => {
    if (firstTextFieldRef.current) {
      firstTextFieldRef.current.focus();
    }
  }, []);

  return (
    <div style={{margin:'auto'}}>
        <div style={{display: 'flex', justifyContent: 'center'}}>
            <TextField
                label="Password"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                fullWidth
                className={classes.input}
                style={{ width: '250px', borderRadius: '120px', background:'#181818' }} size="small"
                margin="normal"
                InputLabelProps={{
                    style: {
                        color: theme.palette.text.primary,
                    },
                    }}
                    InputProps={{
                    style: {
                        color: theme.palette.text.primary,
                    },
                    }}
                inputRef={firstTextFieldRef}

            />
        </div>
        <div style={{display: 'flex', justifyContent: 'center'}}>
            <TextField
                label="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                fullWidth
                margin="normal"
                style={{ width: '250px', borderRadius: '120px' }} size="small"
                className={
                confirmPassword.length > 0
                    ? passwordsMatch
                    ? classes.match
                    : classes.mismatch
                    : classes.input
                }
                error={confirmPassword.length > 0 && !passwordsMatch}
                InputLabelProps={{
                    style: {
                        color: theme.palette.text.primary,
                    },
                    }}
                    InputProps={{
                    style: {
                        color: theme.palette.text.primary,
                    },
                    }}
            />
        </div>
      {/* {confirmPassword.length > 0 && (
        <Typography color={passwordsMatch ? 'green' : 'red'}>
          {passwordsMatch ? 'Passwords match' : 'Passwords do not match'}
        </Typography>
      )} */}
    </div>
  );
};

export default PasswordMatchComponent;
