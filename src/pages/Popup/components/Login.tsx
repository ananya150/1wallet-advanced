import React,{useState, useEffect, useRef} from 'react'
import {useNavigate} from 'react-router-dom';
import { deriveEncryptionKey } from '../utils/cryptoUtils';
import namedLogo from "../namedLogo.png";
import iconLogo from "../iconLogo2.png";
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import { createTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import Typography from "@mui/material/Typography";
import { loginFound, login, checkPassword } from '../../utils';

const theme = createTheme({
  palette: {
    primary: {
      main: '#767675', // Replace with your desired primary color
    },
    text: {
      primary: '#767675', // Replace with your desired text color
    },
  }
});

const useStyles = makeStyles((theme) => ({
  shakeAnimation: {
    animation: '$shake 0.4s ease-in-out',
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
      }
    }
  },
  '@keyframes shake': {
    '0%, 50%, 100%': {
      transform: 'translateX(0)',
    },
    '25%': {
      transform: 'translateX(-10px)',
    },
    '75%': {
      transform: 'translateX(10px)',
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
}
}));

const Login = () => {

  const classes = useStyles();
  const firstTextFieldRef = useRef<any>(null);

  const [password , setPassword] = useState<string>('')
  const [passwordErr, setPasswordErr] = useState(false);
  const navigate = useNavigate();

  const handlePasswordChange = (event: any) => {
    setPassword(event.target.value);
  };

  const init = async () => {
    const isLoggedIn = await loginFound();
    //fetch data
    if(isLoggedIn) navigate('/home');
  }

  useEffect(() => {
    if (firstTextFieldRef.current) {
      firstTextFieldRef.current.focus();
    }
    init();
  }, [])

  const loginWallet = async () => {
    setPasswordErr(false);
    // check password
    const isPasswordCorrect = await checkPassword(password);
    if(!isPasswordCorrect){
      setPasswordErr(true);
      return;
    }
    const aesKey = await deriveEncryptionKey(password);
    await login(aesKey);
    // fetch data
    navigate('/home');
  }

  return (
    <div className='container'>
      <div className='headerA'>
        <img src={namedLogo} alt='logo' width="160px" height="36px" className='namedLogo' />
      </div>
      <div className='logo'>
        <img src={iconLogo} alt='logo' width="130px" height="135px" style={{marginTop: '20px'}} />
      </div>
      <div className='loginbody'>
        Welcome Back!
      </div>
      <div style={{display: 'flex', justifyContent:'center', marginTop:'40px'}}>
        <TextField
                  label="Password"
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  fullWidth
                  className={passwordErr ? classes.shakeAnimation : classes.input}
                  style={{ width: '250px', borderRadius: '120px', background:'#181818' }} size="small"
                  margin="normal"
                  error={passwordErr}
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
      {passwordErr && (
        <Typography color={'red'} style={{display: 'flex', justifyContent:'center', marginTop:'3px', fontSize:'12px'}}>
          Incorrect Password
        </Typography>
      )}
      <div style={{display: 'flex', justifyContent:'center', marginTop:'20px'}}>
        <Button variant='contained' sx={{
          backgroundColor: "#9666cb",
          ':hover': {
            bgcolor: '#a873e5',
          },      
          }} onClick={loginWallet}>Login</Button>
      </div>
    </div>
  )
}

export default Login