import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { getWalletInfo } from '../../utils';
import { fetchTokens, Token } from '../store/tokens/tokensSlice';
import Tooltip from '@mui/material/Tooltip';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import { useNavigate } from 'react-router-dom';
import  Button  from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';


const TokenBalances = () => {

    const dispatch = useDispatch<AppDispatch>();
    const tokens = useSelector((state: RootState) => state.tokens.tokens);
    // const totalBalance = useSelector((state: RootState) => state.tokens.totalBalance);
    const totalBalance = 7.35
    const gasBalance = 1.57
    const [walletAddress, setWalletAddress] = useState('');
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();

    const init = async () => {
        setLoading(true)
        const {walletAddress, name} = await getWalletInfo();
        setWalletAddress(walletAddress);
        await dispatch(fetchTokens(walletAddress));
        setLoading(false);
      }
    

      useEffect(() => {
        init();
      }, [dispatch]);
    

  return (
    <div>
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
        {
          loading ? 
            <div style={{display:'flex', justifyContent:'center', marginTop:'45px', width:'365px', background:'#232323'}}>
              <Skeleton variant="rounded" width='300px' height={60} sx={{ bgcolor: 'grey.800' }}/>
            </div>
            :
            <div className='tokenContainer'>
                {
                  tokens.map((item: Token) => {
                    return(
                      <div className='row' key={item.contract_name}>

                      <div className='left'>
                        <div className='logoContainer'>
                          <img className='tokenLogo' src={item.contract_ticker_symbol !=='MATIC'? item.logo_url : 'https://cdn.iconscout.com/icon/free/png-256/free-polygon-token-4086724-3379854.png'} alt='tokenlogo'/>
                        </div>
                        <div className='left-info-container'>
                          <div className='tokenName'>{item.contract_name}</div>
                          <div className='tokenBalance'>{(parseFloat(item.balance)/(10**item.contract_decimals)).toFixed(2)} {item.contract_ticker_symbol}</div>
                        </div>
                      </div>
          
                      <div className='right'>
                        <div className='tokenValue'>{item.quote === null ? '$0.00': `$${item.quote}`}</div>
                        <div className='tokenBalance'>{item.quote === null ? '$0.00': `$${(item.quote*(parseFloat(item.balance)/(10**item.contract_decimals)))}`}</div>
                      </div>
                    </div>
                    )
                  })
                }
            </div>
        }
        <div style={{display:'flex', justifyContent:'center', marginTop:'20px', color:'#B2BEB5', fontSize:'14px'}}>
          Your tokens list
        </div>
    </div>
  )
}

export default TokenBalances