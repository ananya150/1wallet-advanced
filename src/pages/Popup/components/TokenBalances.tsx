import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { getWalletInfo } from '../../utils';
import { fetchTokens, Token } from '../store/tokens/tokensSlice';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import Skeleton from '@mui/material/Skeleton';
import PurpleButton from './ui/PurpleButton';
import noImg from '../noImg.png';

// TODO handle deposit, buy and send functions


const TokenBalances = () => {

    const dispatch = useDispatch<AppDispatch>();
    const tokens = useSelector((state: RootState) => state.tokens.tokens);
    // const totalBalance = useSelector((state: RootState) => state.tokens.totalBalance);
    const totalBalance = 7.35
    const gasBalance = 1.57
    const [walletAddress, setWalletAddress] = useState('');
    const [loading,setLoading] = useState(false);
    const [imageLoadStatus, setImageLoadStatus] = useState<any>({});

    const handleImageError = (imageUrl: any) => {
      setImageLoadStatus((prevStatus: any) => ({
        ...prevStatus,
        [imageUrl]: false,
      }));
    };
  

    const init = async () => {
        setLoading(true)
        const {walletAddress} = await getWalletInfo();
        setWalletAddress(walletAddress);
        await dispatch(fetchTokens(walletAddress));
        console.log(tokens);
        setLoading(false);
      }
    

    
      useEffect(() => {
        init();
      }, [dispatch]);
    

  return (
    <div>
        <div className='headingHome' style={{display:'flex', justifyContent:'center', height:'30px', marginTop:'30px', marginLeft:'10px', fontSize:'24px', fontWeight:'600', color:'#D3D3D3'}}>
            Balances
        </div>
        <div className='amount' style={{display: 'flex', justifyContent: 'center', marginTop: '30px', fontSize:'45px', fontWeight:'600',color:'#fefdf9',width:'365px', }}>
            $ {totalBalance}
        </div>
        <div style={{display: 'flex', justifyContent: 'center', marginTop: '10px', fontSize:'16px', color:'#B2BEB5', alignItems:'center',marginRight:'10px', width:'365px', background:'#242424'}}>
            <div>
                <LocalGasStationIcon style={{marginLeft: '10px', fontSize: '18px', color: '#B2BEB5', marginTop:'3px', marginRight:'10px'}} />
            </div>
                <div>
                    ${gasBalance}
                </div>
        </div>
        <div style={{marginLeft:'25px', marginRight:'20px', marginTop:'40px', display:'flex', justifyContent:'space-between'}}>
          <PurpleButton width='96px'>
              <div>Deposit</div>
          </PurpleButton>
          <PurpleButton width='96px'>
              <div>Buy</div>
          </PurpleButton>
          <PurpleButton width='96px'>
              <div>Send</div>
          </PurpleButton>
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
                      <div className='row' key={item.contract_name} style={{marginBottom:'15px', borderRadius:'8px'}}>
                        <div className='left'>
                          <div className='logoContainer'>
                            <img className='tokenLogo' src={item.contract_ticker_symbol !=='MATIC'? ( imageLoadStatus[item.logo_url] ? item.logo_url : noImg)  : 'https://cdn.iconscout.com/icon/free/png-256/free-polygon-token-4086724-3379854.png'} alt='tokenlogo' onError={() => handleImageError(item.logo_url)} />
                          </div>
                          <div className='left-info-container'>
                            <div className='tokenName'>{item.contract_name}</div>
                            <div className='tokenBalance'>{(parseFloat(item.balance)/(10**item.contract_decimals)).toFixed(4)} {item.contract_ticker_symbol}</div>
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
        <div style={{display:'flex', justifyContent:'center', marginTop:'10px', marginBottom:'20px', color:'#B2BEB5', fontSize:'14px'}}>
          Your tokens list
        </div>
    </div>
  )
}

export default TokenBalances