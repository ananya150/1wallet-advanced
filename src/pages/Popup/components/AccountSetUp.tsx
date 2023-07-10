import React, {useState, useEffect} from 'react'
import { makeStyles } from '@mui/styles';
import { CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import iconLogo from "../iconLogo2.png"
import namedLogo from "../namedLogo.png"
import { logout } from '../utils/web3authUtils';
import Button from "@mui/material/Button"

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', // Adjust this value as per your requirement
  },
}));

const AccountSetUp = ({web3Auth, setIsLoggedIn}: any) => {
  const classes = useStyles();
  const [walletFound, setWalletFound] = useState(true);
  const [isFullPage, setIsFullPage] = useState(false); 
  const [loading, setLoading] = useState(false);

  const [walletName, setWalletName] = useState<any>(null);
  const [walletAddress, setWalletAddress] = useState<any>(null);

  const initialize = async () => {

  }

  const logoutWeb3Auth = async () => {
    await logout(web3Auth);
    setIsLoggedIn(false);
  }

  const continueSetup = () => {

  }

  useEffect(() => {
    if (window.innerWidth > 400) setIsFullPage(true);
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
            }} onClick={continueSetup}>Create Account</Button>
      </div>
    </div>
  )

  const accountNotFoundLayout = (
    <div>
      <div className='accountSetupHeading0'>
        Accout not Found
      </div>
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
            }} onClick={continueSetup}>Create Account</Button>
      </div>
    </div>
  )

  const account = (
    <div className='container'>
      <div className='headerA'>
        <img src={namedLogo} alt='logo' width="160px" height="36px" className='namedLogo' />
      </div>
      {/* <div className='logo'>
        <img src={iconLogo} alt='logo' width="130px" height="135px" className='accountSetUpconLogo' />
      </div> */}
      {
        walletFound? accountFoundLayout : accountNotFoundLayout
      }
    </div>
  )

  return (
    // isFullPage? 
    //   <div className='fullPageWarn'>
    //     Plese close this tab and continue on the extension.
    //   </div>
    //   :
      <div>
        {
          loading? loader : account
        }
      </div>
  )
}

export default AccountSetUp