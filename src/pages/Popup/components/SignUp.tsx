import React,{useState , useEffect} from 'react'
import { login } from '../utils/web3authUtils';
import { makeStyles } from '@mui/styles';
import namedLogo from '../namedLogo.png';
import iconLogo from '../iconLogo2.png';
import Button from "@mui/material/Button"

const useStyles = makeStyles(() => ({
  customButton: {
    backgroundColor: '#bb80fe',
    color: '#fefdf9',
  },
}));

const SignUp = ({web3Auth, setProvider , setIsLoggedIn}: any) => {

  const [isFullPage, setIsFullPage] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    if (window.innerWidth > 400) setIsFullPage(true);
  }, [])

  const loginWeb3Auth = async () => {
    if(!isFullPage){
      chrome.tabs.create({ url: "popup.html" });
      return;
    }
    const provider = await login(web3Auth);
    setProvider(provider);
    setIsLoggedIn(true);
  }

  return (
    <div className="container">
      <div className='headerA'>
        <img src={namedLogo} alt='logo' width="160px" height="36px" className='namedLogo' />
      </div>
      <div className='logo'>
        <img src={iconLogo} alt='logo' width="130px" height="135px" className='iconLogo' />
      </div>
      <div className='signUpBody0'>
        Welcome!
      </div>
      <div className='signUpBody1'>
        The ethereum account you always needed
      </div>
      <div className='signUpBody2'>
        <Button variant='contained' sx={{
          backgroundColor: "#9666cb",
          ':hover': {
            bgcolor: '#a873e5',
          },      
          }} onClick={loginWeb3Auth}>Login</Button>
      </div>
    </div>
  )
}

export default SignUp