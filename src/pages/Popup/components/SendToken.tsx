import React, { useState , useRef, useEffect} from 'react';
import { Token } from '../store/tokens/tokensSlice';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import namedLogo from '../namedLogo.png'
import TextField from '@mui/material/TextField';
import { createTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import Typography from "@mui/material/Typography";
import  Button  from '@mui/material/Button';

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
  },resize:{
        fontSize:12
  }
  }));


type pageProps = {
    token: Token;
    setTokenSelected:any
}

const SendToken = ({token, setTokenSelected}: pageProps) => {
    const classes = useStyles();
    const firstTextFieldRef = useRef<any>(null);
    const [address, setAddress] = useState('');
    const [addressErr, setAddressErr] = useState(false);
    const handleAddress = (event: any) => {
        setAddress(event.target.value);
      };
    const [amount, setAmount] = useState('');
    const [amountErr, setAmountErr] = useState(false);
    const handleAmount = (event: any) => {
        setAmount(event.target.value);
      };

  useEffect(() => {
    if (firstTextFieldRef.current) {
      firstTextFieldRef.current.focus();
    }
      }, [])

  return (
    <div className='container'>
        <div className='headerA' style={{width:'365px'}}>
            <img src={namedLogo} alt='logo' width="160px" height="36px" className='namedLogo' />
        </div>
        
        <div style={{display:'flex', justifyContent:'space-between', marginTop:'10px', fontSize:'22px', width:'365px' , fontWeight:'600', color:'#fefdf9', alignItems:'center'}}>
            <div >
                <ArrowBackIcon style={{marginLeft:'10px',fontSize: '20px', color: '#fefdf9', marginTop:'6px'}} />
            </div>
            <div style={{marginRight:'20px'}} >
                Send {token.contract_ticker_symbol}
            </div>
            <div></div>
        </div>

        <div style={{display:'flex', justifyContent:'center', marginTop:'30px'}}>
            <img style={{borderRadius:'50%', height:'60px'}} src={token.contract_ticker_symbol !=='MATIC'? token.logo_url : 'https://cdn.iconscout.com/icon/free/png-256/free-polygon-token-4086724-3379854.png'} alt='tokenlogo'/>
        </div>

        <div style={{display:'flex', justifyContent:'center' , marginTop:'50px'}}>
            <TextField
                  placeholder="Recipient's Address"
                  value={address}
                  onChange={handleAddress}
                  fullWidth
                  className={classes.input}
                  style={{ width: '300px', borderRadius: '20px', background:'#181818' }} size="small"
                  margin="normal"
                  error={addressErr}
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
                  autoFocus={true}
              />
        </div>
        {addressErr && (
            <Typography color={'red'} style={{display: 'flex', justifyContent:'center', marginTop:'3px', fontSize:'12px'}}>
                Invalid Address
            </Typography>
        )}

        <div style={{display:'flex', justifyContent:'center' }}>
            <TextField
                placeholder={`Amount ${token.contract_ticker_symbol}`}
                value={amount}
                onChange={handleAmount}
                fullWidth
                className={classes.input}
                style={{ width: '300px', borderRadius: '20px', background:'#181818' }} size="small"
                margin="normal"
                error={addressErr}
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
                autoFocus={true}
            />
        </div>
        {amountErr && (
            <Typography color={'red'} style={{display: 'flex', justifyContent:'center', marginTop:'3px', fontSize:'12px'}}>
                Invalid Amount
            </Typography>
        )}

        <div style={{display:'flex', justifyContent:'space-between', width:'335px', marginLeft:'15px', marginTop:'70px'}}>
            <Button variant='contained' sx={{
                backgroundColor: "#2b2b2b",
                color:'gray',
                fontSize:'15px',
                width:'160px',
                ':hover': {
                    bgcolor: '#2f2f2f',
                    color:'#fefdf9',
                },      
                }} 
                >
                Cancel
            </Button>
            <Button variant='contained' sx={{
                backgroundColor: "#2b2b2b",
                color:'gray',
                fontSize:'15px',
                width:'160px',
                ':hover': {
                    bgcolor: '#2f2f2f',
                    color:'#fefdf9',
                },      
                }} 
                >
                Next
            </Button>
        </div>

    </div>
  )
}

export default SendToken