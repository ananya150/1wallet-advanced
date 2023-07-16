import React, {useState, useEffect} from 'react'
import { makeStyles } from '@mui/styles';
import { CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import namedLogo from "../namedLogo.png"
import { logout } from '../utils/web3authUtils';
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import { createTheme } from '@mui/material/styles';
import FormHelperText from '@mui/material/FormHelperText';
import { getAccount } from '../utils/ethUtils';
import { SimpleAccountFactory } from '../utils/simpleAccount/simpleAccountUtils';
import LogoutIcon from '@mui/icons-material/Logout';
import IconButton from '@mui/material/IconButton';

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

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', // Adjust this value as per your requirement
  },
  input: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#676766', // Replace with your desired border color
      },
      '&:hover fieldset': {
        borderColor: '#676766', // Replace with your desired hover border color
      },
      '&.Mui-focused fieldset': {
        borderColor: '#676766', // Replace with your desired focused border color
      },
      '& input': {
        color: '#FFFFFF', // Replace with your desired text color
      },
    },
  },
}));

type AccountSetUpState = {
  err: any
  hasStarted: boolean,
  hasDeployingStart: boolean,
  hasCompleted: boolean
}

const initialState={
  err: null,
  hasStarted: false,
  hasDeployingStart: false,
  hasCompleted: false
}

const AccountSetUp = ({web3Auth, setIsLoggedIn, provider, setName, walletAddress, setWalletAddress}: any) => {
  const classes = useStyles();
  const [walletFound, setWalletFound] = useState(false);
  const [isFullPage, setIsFullPage] = useState(false); 
  const [loading, setLoading] = useState(true);

  const [accountSetUpState, setAccountSetUpState] = useState<AccountSetUpState>(initialState)
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const [accoundFoundNameStart, setAccountFoundNameStart] = useState(false);

  const initialize = async () => {
    try{
      const address = await getAccount(provider);
      const factory = new SimpleAccountFactory(address);
      const isFound = await factory.found();
      const walletAddress = await factory.getWalletAddress();
      setWalletAddress(walletAddress);
      if(isFound){
        setWalletFound(true);
        setLoading(false);
        return;
      }
      setLoading(false);
    }catch(e){
      console.log(e)
    }
  }

  const handleChange = (event: any) => {
    setInputValue(event.target.value);
    setError(false);
  };

  const logoutWeb3Auth = async () => {
    await logout(web3Auth);
    setIsLoggedIn(false);
  }

  const startSetup = () => {
    setAccountSetUpState(prevState => ({
      ...prevState , hasStarted: true
    }))
  }

  const acouuntFoundSetupComplete = (event: any) => {
    setError(false);
    if(inputValue === ''){
      setError(true);
      return;
    }
    setName(inputValue);
    navigate('/setUpPassword');
  }


  const deployAccount = async (event: any) => {
    event.preventDefault();
    setAccountSetUpState({
      err: null,
      hasStarted: true,
      hasDeployingStart: false,
      hasCompleted: false
    })
    if (inputValue.trim() === '') {
      setError(true);
      return;
    } else {
      // Handle form submission
      setName(inputValue);
      setInputValue('')

      setAccountSetUpState(prevState => ({
        ...prevState , hasDeployingStart: true
      }));

      // deploy
      const address = await getAccount(provider);
      const factory = new SimpleAccountFactory(address);
      const walletDeployed = await factory.deployWallet();
      if(!walletDeployed){
        setAccountSetUpState({
          err: 'Some error occured while deploying wallet',
          hasStarted: true,
          hasDeployingStart: true,
          hasCompleted: false
        })  
        return;
      }
      // await delay(10000);
      setAccountSetUpState(prevState => ({
        ...prevState , hasCompleted: true
      }));
    }

  }

  const openNewTab = (url: string) => {
    window.open(url, '_blank');
  }


  const setUpPassword = () => {
    navigate('/setUpPassword');
  }

  useEffect(() => {
    if (window.innerWidth > 400) setIsFullPage(true);
    initialize();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loader = (
    <div className='container'>
      <div className={classes.container}>
        <CircularProgress sx={{color: 'white'}} />
      </div>
    </div>
  )

  const accountFoundLayout = (
    <div>
      <div className='accountSetupHeading0'>
        Accout Found!
      </div>
      {
        accoundFoundNameStart?
          <div>
            <div className='accountSetUpHeading1'>
              Choose a <b>Name</b> for your account
            </div>
            <form onSubmit={acouuntFoundSetupComplete}>
              <div style={{display:'flex', justifyContent:'center', marginTop: '110px'}}>
                <TextField value={inputValue} onChange={handleChange} fullWidth label="name" id="name" size="small" style={{ width: '250px', borderRadius: '120px' }} className={classes.input} InputLabelProps={{
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
                {error && (
                  <FormHelperText className='nameError' error>
                    Name cannot be empty
                  </FormHelperText>
                )}
                {accountSetUpState.err && 
                  <div className='accoutSetUpError'>
                    {accountSetUpState.err}
                  </div>
                }
              <div className='accountSetUpButton1'>
                <Button variant='contained' sx={{
                    backgroundColor: "#9666cb",
                    borderRadius: '10px',
                    ':hover': {
                      bgcolor: '#a873e5',
                    },      
                    }} onClick={acouuntFoundSetupComplete}>Setup Password</Button>
              </div>
            </form>

          </div>
          :
          <div>
            <div className='accountSetUpHeading1'>
              <p>We found an account at address </p>
              <div style={{cursor:'pointer'}} onClick={() => openNewTab(`https://mumbai.polygonscan.com/address/${walletAddress}`)} ><p style={{fontSize: '13px'}}><u>{walletAddress}</u></p></div>
              <p>linked to your current e-mail</p>
            </div>
            <div style={{display: 'flex', justifyContent: 'center', marginTop:'90px'}}>
              <Button variant='contained' sx={{
                  backgroundColor: "#9666cb",
                  borderRadius: '10px',
                  ':hover': {
                    bgcolor: '#a873e5',
                  },      
                  }} onClick={() => setAccountFoundNameStart(true)}>Setup Account</Button>
            </div>
          </div>
        }
      </div>
  )

  const accountNotFoundLayout = (
    <div>
      <div className='accountSetupHeading0'>
        Accout not Found
      </div>
      <div>
        {
          !accountSetUpState.hasStarted && 
          <div>
            <div className='accountSetUpHeading1'>
              We could not find any account linked to your email Address.
            </div>
            <div className='accountSetUpButton'>
              <Button variant='contained' sx={{
                  backgroundColor: "#9666cb",
                  borderRadius: '10px',
                  ':hover': {
                    bgcolor: '#a873e5',
                  },      
                  }} onClick={startSetup}>Create Account</Button>
            </div>
          </div>
        }
        {
          accountSetUpState.hasStarted && !accountSetUpState.hasDeployingStart && 
          <div>
            <div className='accountSetUpHeading1'>
              Choose a <b>Name</b> for your account
            </div>
            <form onSubmit={deployAccount}>
              <div className='accountSetUpInputField'>
                <TextField value={inputValue} onChange={handleChange} fullWidth label="name" id="name" size="small" style={{ width: '250px', borderRadius: '120px' }} className={classes.input} InputLabelProps={{
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
                {error && (
                  <FormHelperText className='nameError' error>
                    Name cannot be empty
                  </FormHelperText>
                )}
                {accountSetUpState.err && 
                  <div className='accoutSetUpError'>
                    {accountSetUpState.err}
                  </div>
                }
            </form>

            <div className='accountSetUpButton1'>
              <Button variant='contained' sx={{
                  backgroundColor: "#9666cb",
                  borderRadius: '10px',
                  ':hover': {
                    bgcolor: '#a873e5',
                  },      
                  }} onClick={deployAccount}>Create Account</Button>
            </div>
          </div>
        }
        {accountSetUpState.hasStarted && accountSetUpState.hasDeployingStart && !accountSetUpState.hasCompleted && 
          <div>
            <div className='accountSetUpLoading0'>
              This might take 20-30s. Please don't close your extension window.
            </div>
            <div className='accountSetUpLoading1'>
              Deploying...
            </div>
                  <div style={{display: 'flex', justifyContent: 'center',}}>
                  <CircularProgress sx={{color: 'white', width:'18px', marginTop:'24px'}} />
                </div>
          </div>
        }
        {
           accountSetUpState.hasCompleted && 
            <div>
              <div className='accountSetUpHeading1'>
                Account Deployed Successfully!
              </div>
              <div className='accountSetUpButton'>
                <Button variant='contained' sx={{
                    backgroundColor: "#9666cb",
                    borderRadius: '10px',
                    ':hover': {
                      bgcolor: '#a873e5',
                    },      
                    }} onClick={setUpPassword}>Setup Password</Button>
              </div>
            </div>
        }
      </div>
    </div>
  )

  const account = (
    <div className='container'>
      <div className='headerA'>
        <img src={namedLogo} alt='logo' width="160px" height="36px" className='namedLogo' />
      </div>
      <div style={{display: 'flex', justifyContent: 'end', marginRight: '10px', marginTop:'20px' }}>
        <IconButton onClick={logoutWeb3Auth}>
          <LogoutIcon style={{color:'white'}} />
        </IconButton>
      </div>
      {
        walletFound? accountFoundLayout : accountNotFoundLayout
      }
    </div>
  )

  return (
    isFullPage? 
      <div className='fullPageWarn'>
        Plese close this tab and continue the setup in the extension.
      </div>
      :
      <div>
        {
          loading? loader : account
        }
      </div>
  )
}

export default AccountSetUp