import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { getWalletInfo } from '../../utils';
import { fetchTokens } from '../store/tokens/tokensSlice';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Tooltip from '@mui/material/Tooltip';
import CheckIcon from '@mui/icons-material/Check';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import { useNavigate } from 'react-router-dom';
import  Button  from '@mui/material/Button';

function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

const TokenBalances = () => {

    const dispatch = useDispatch<AppDispatch>();
    const tokens = useSelector((state: RootState) => state.tokens.tokens);
    // const totalBalance = useSelector((state: RootState) => state.tokens.totalBalance);
    const totalBalance = 7.35
    const gasBalance = 1.57
    const [walletAddress, setWalletAddress] = useState('');
    const [name,setName] = useState('')
    const [copied,setCopied] = useState(false);
    const navigate = useNavigate();

    const init = async () => {
        const {walletAddress, name} = await getWalletInfo();
        console.log(walletAddress);
        setName(name);
        setWalletAddress(walletAddress);
        // dispatch(fetchTokens(walletAddress));
      }
    
      const copyAddress = async () => {
        setCopied(true);
        navigator.clipboard.writeText(walletAddress)
        await (delay(2000));
        setCopied(false);
      }
    
      useEffect(() => {
        init();
      }, [dispatch]);
    

  return (
    <div>
        <div style={{display: 'flex', justifyContent: 'center', marginTop: '10px', marginLeft:'10px', alignItems:'center', width:'365px', background:'#262626'}} >
          <Tooltip title={walletAddress}>
            <div onClick={copyAddress} style={{display: 'flex', color: '#fefdf9', fontSize:'16px', cursor:'pointer' }}>
              <b>{name.toUpperCase()}</b>
              {copied? 
                <CheckIcon style={{marginLeft: '10px', fontSize: '13px', color: '#B2BEB5', marginTop:'2px'}} /> 
                :
                <ContentCopyIcon style={{marginLeft: '10px', fontSize: '13px', color: '#B2BEB5', marginTop:'2px'}} />
              } 
            </div>
          </Tooltip>
        </div>
        <div style={{display: 'flex', justifyContent: 'center', marginTop: '40px', fontSize:'45px', fontWeight:'600',color:'#fefdf9',width:'365px', background:'#252525'}}>
            ${totalBalance}
        </div>
        <div style={{display: 'flex', justifyContent: 'center', marginTop: '10px', fontSize:'16px', color:'#B2BEB5', alignItems:'center',marginRight:'10px', width:'365px', background:'#242424'}}>
            <div>
                <LocalGasStationIcon style={{marginLeft: '10px', fontSize: '18px', color: '#B2BEB5', marginTop:'3px', marginRight:'10px'}} />
            </div>
              <Tooltip style={{cursor:'pointer'}} title="Gas Left">
                <div onClick={() => navigate('/gas')}>
                    ${gasBalance}
                </div>
              </Tooltip>
        </div>
        <div style={{display:'flex', justifyContent:'space-evenly', marginTop:'30px', width:'365px', background:'#232323'}}>
          <Button variant='contained' size='small' sx={{
              backgroundColor: "#9666cb",
              fontSize:'13px',
              width:'80px',
              borderRadius: '6px',
              ':hover': {
                bgcolor: '#a873e5',
              },      
              }} 
              >
              Deposit
          </Button>
          <Button variant='contained' sx={{
            backgroundColor: "#9666cb",
            fontSize:'13px',
            width:'80px',
            borderRadius: '6px',
            ':hover': {
              bgcolor: '#a873e5',
            },      
            }} 
            >
            Send
          </Button>
        </div>
        <div style={{display:'flex', justifyContent:'space-evenly', marginTop:'30px', width:'365px', background:'#222222'}}>

        </div>
    </div>
  )
}

export default TokenBalances