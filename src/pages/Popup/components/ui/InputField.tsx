import React from 'react'
import TextField from '@mui/material/TextField';
import { createTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const theme = createTheme({
    palette: {
      primary: {
        main: '#767675', 
      },
      text: {
        primary: '#767675',
      },
    }
  });
  
  const useStyles = makeStyles((theme) => ({
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
  }
  }));

const InputField = ({value, handleValue, isErr, errMsg, placeHolder, autofocus}: any) => {
    const classes = useStyles()
    return (
        <div>
            <TextField
                placeholder={placeHolder}
                value={value}
                onChange={handleValue}
                fullWidth
                className={classes.input}
                style={{ width: '320px', borderRadius: '20px', background:'#181818' }}
                margin="normal"
                InputLabelProps={{
                    style: {
                        color: theme.palette.text.primary,
                    },
                    }}
                    InputProps={{
                    style: {
                        color: theme.palette.text.primary,
                        fontSize:13
                    }
                    }}
                autoFocus={autofocus}
            />
            {
                isErr && <span style={{display: 'flex', justifyContent:'center', marginTop:'2px', fontSize:'10px'}}>{errMsg}</span>
            }
        </div>
    )
    }

export default InputField