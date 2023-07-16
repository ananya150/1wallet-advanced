import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Token } from '../store/tokens/tokensSlice';
import { useNavigate } from 'react-router-dom';
import SendToken from './SendToken';
import noImg from '../noImg.png';
import BlackButton from './ui/BlackButton';

const Send = ({setValue}: any) => {

    const tokens = useSelector((state: RootState) => state.tokens.tokens);
    const navigate = useNavigate();
    const [tokenSelected, setTokenSelected] = useState<null|Token>(null);
    const [imageLoadStatus, setImageLoadStatus] = useState<any>({});

    const handleImageError = (imageUrl: any) => {
      setImageLoadStatus((prevStatus: any) => ({
        ...prevStatus,
        [imageUrl]: false,
      }));
    };

    const handleBack = () => {
        setValue('tokens')
    }

  return (
    <div>
        {
            !tokenSelected
            ?
            <div style={{height:'450px', width:'365px', display:'flex', justifyContent:'space-between', flexDirection:'column', overflowX:'hidden' ,overflowY:'scroll'}}>
                <div>
                    <div className='headingHome' style={{display:'flex', justifyContent:'center', height:'30px', marginTop:'30px', marginLeft:'10px', fontSize:'24px', fontWeight:'600', color:'#D3D3D3'}}>
                        Select Token
                    </div>
                    <div style={{marginTop: '20px', overflowX:'hidden' ,overflowY:'scroll', height:'280px'}}>
                        <div className='tokenContainer' style={{color:'white'}}>
                                {
                                tokens.map((item: Token) => {
                                    return(
                                        <div className='row' style={{marginBottom:'15px', borderRadius:'8px', cursor:'pointer'}} key={item.contract_name} onClick={() => {setTokenSelected(item)}}>

                                            <div className='left'>
                                                <div className='logoContainer'>
                                                    <img className='tokenLogo' src={item.contract_ticker_symbol !=='MATIC'? ( imageLoadStatus[item.logo_url] ? item.logo_url : noImg)  : 'https://cdn.iconscout.com/icon/free/png-256/free-polygon-token-4086724-3379854.png'} alt='tokenlogo' onError={() => handleImageError(item.logo_url)} />
                                                </div>
                                                <div className='left-info-container1'>
                                                    <div className='tokenName'>{item.contract_name}</div>
                                                </div>
                                            </div>
                        
                                            <div className='right1'>
                                                <div style={{marginTop:'4px', fontSize:'14px', color:'#fefdf9'}}>{(parseFloat(item.balance)/(10**item.contract_decimals)).toFixed(2)} {item.contract_ticker_symbol}</div>
                                            </div>
                                        </div>
                                    )
                                })
                                }
                            </div>   
                    </div>
                </div>
                <div style={{marginBottom:'20px', marginTop:'20px',  background:'#222222', width:'365px'}}>
                    <div style={{marginLeft:'25px', marginRight:'25px', display:'flex', justifyContent:'center'}}>
                        <BlackButton onClick={handleBack} text='Back' width='310px' />
                    </div>
                </div>
            </div>
            :
            <div>
                <SendToken token={tokenSelected} setTokenSelected={setTokenSelected} />
            </div>
        }

    </div>
  )
}

export default Send