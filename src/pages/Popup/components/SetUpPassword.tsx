import React,{useState} from 'react'
import PasswordMatchComponent from './passwordMatchComponent'
import namedLogo from '../namedLogo.png';
import LogoutIcon from '@mui/icons-material/Logout';
import IconButton from '@mui/material/IconButton';
import { logout } from '../utils/web3authUtils';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography'
import { getKey } from '../utils/ethUtils';
import { deriveEncryptionKey, encryptPrivateKey, hashPassword } from '../utils/cryptoUtils';
import { useNavigate } from 'react-router-dom';
import { initWallet, login } from '../../utils';
import { CircularProgress } from '@mui/material';


const SetUpPassword = ({provider, name, web3Auth, setIsLoggedIn, walletAddress}: any) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [err, setErr] = useState<any>(null);
  const [loading,setLoading] = useState(false);

  const logoutWeb3Auth = async () => {
    await logout(web3Auth);
    setIsLoggedIn(false);
  }

  const navigate = useNavigate();

  const confirm = async () => {
    setErr(null);
    if(password !== confirmPassword){
      setErr('Passwords do not match');
      return;
    }
    setLoading(true);
    const key = await getKey(provider);
    const passwordHash = await hashPassword(password);
    const aesKey = await deriveEncryptionKey(password);
    const encryptedSigningKey = await encryptPrivateKey(aesKey, key);
    try{
      console.log(name)
      await initWallet(walletAddress, encryptedSigningKey, passwordHash, name);
      await login(aesKey);
      // fetch data
      setLoading(false);
      navigate('/home')
    }catch(e){
      setErr('Some Error Occured while setting up');
      setConfirmPassword('');
      setPassword('');
      setLoading(false);
      return;
    }
  }

  return (
    <div className='container'>
      <div className='headerA'>
        <img src={namedLogo} alt='logo' width="160px" height="36px" className='namedLogo' />
      </div>
      <div style={{display: 'flex', justifyContent: 'end', marginRight: '10px', marginTop:'20px' }}>
        <IconButton onClick={logoutWeb3Auth}>
          <LogoutIcon style={{color:'white'}} />
        </IconButton>
      </div>
      <div className='passwordSetupHeading0'>
        Set Up Password
      </div>
        <div style={{display: 'flex', justifyContent: 'center', marginTop:'20px', color:'white'}}>
            Choose a password you can remember!
        </div>
        {
          loading? 
            <div style={{display: 'flex', justifyContent: 'center', marginTop:'45px'}} >
              <CircularProgress sx={{color: 'white'}} />
            </div>
            :
            <div>
              <div style={{ marginTop:'45px'}}>
                <PasswordMatchComponent password={password} setPassword={setPassword} confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword} />
              </div>
              {
                err && 
                  <div style={{display: 'flex', justifyContent: 'center', marginTop:'10px'}}>
                    <Typography fontSize='11px' color={password === confirmPassword? 'green': 'red'}>
                      {password === confirmPassword? 'Passwords match': err}
                    </Typography>
                  </div>
              }

              <div style={{display: 'flex', justifyContent: 'center', marginTop:'45px'}}>
                <Button variant='contained' sx={{
                  backgroundColor: "#9666cb",
                  borderRadius: '10px',
                  ':hover': {
                    bgcolor: '#a873e5',
                  },      
                  }} onClick={confirm}>
                    Submit
                </Button>
              </div>
            </div>
        }
    </div>
  )
}

export default SetUpPassword