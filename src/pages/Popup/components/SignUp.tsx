import React,{useState , useEffect} from 'react'
import Button from "@mui/material/Button";
import { login } from '../utils/web3authUtils';

const SignUp = ({web3Auth, setProvider , setIsLoggedIn}: any) => {

  const [isFullPage, setIsFullPage] = useState(false);

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
    <div>
       <Button variant='contained' onClick={loginWeb3Auth}>Login</Button>
    </div>
  )
}

export default SignUp