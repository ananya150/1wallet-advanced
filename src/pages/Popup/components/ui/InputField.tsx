import React from 'react'
import TextField from '@mui/material/TextField';
import { createTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import Typography  from '@mui/material/Typography';

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
        background: '#222222',
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

export const InputField = ({value, handleValue, isErr, errMsg, placeHolder, autofocus}: any) => {
    const classes = useStyles()
    return (
        <div>
            <TextField
                placeholder={placeHolder}
                value={value}
                onChange={handleValue}
                fullWidth
                className={classes.input}
                style={{ width: '320px', borderRadius: '20px', background:'#222222' }}
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
                error={isErr}
                autoFocus={autofocus}
            />
            {
                isErr && <span style={{display: 'flex', justifyContent:'center', marginTop:'2px', fontSize:'10px', color:'red'}}>{errMsg}</span>
            }
        </div>
    )
  }

export const InputFieldWithButton = ({value,setValue, handleValue, isErr, errMsg, placeHolder, autofocus, maxValue}: any) => {
    const classes = useStyles();
    const handleMaximizeClick = () => {
      setValue(maxValue)
    }
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
                    },
                    endAdornment: (
                      <InputAdornment position="end">
                        <Button onClick={handleMaximizeClick} variant="text" sx={{color: '#ab9ff2', background:'#121212'}}>
                          <Typography>
                            <span>Max</span><br/> 
                            <span style={{fontSize:'10px'}}>{maxValue}</span>
                          </Typography>
                        </Button>
                      </InputAdornment>
                    ),
                  }}
                error={isErr}
                autoFocus={autofocus}
            />
            {
                isErr && <span style={{display: 'flex', justifyContent:'center', marginTop:'2px', fontSize:'10px', color:'red'}}>{errMsg}</span>
            }
        </div>
    )
  }

