import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import namedLogo from '../namedLogo.png'
import { Token } from '../store/tokens/tokensSlice';
import { useNavigate } from 'react-router-dom';

const Send = () => {

    const tokens = useSelector((state: RootState) => state.tokens.tokens);
    const navigate = useNavigate();

  return (
    <div className='container'>
        <div className='headerA' style={{width:'365px'}}>
            <img src={namedLogo} alt='logo' width="160px" height="36px" className='namedLogo' />
        </div>
        <div style={{display:'flex', justifyContent:'center', marginTop:'30px', marginLeft:'10px', fontSize:'24px', fontWeight:'600', color:'#fefdf9'}}>
            Select Token
        </div>
        <div style={{marginTop: '20px', overflowX:'hidden' ,overflowY:'scroll', height:'280px'}}>
            <div className='tokenContainer' style={{color:'white'}}>
                    {
                    tokens.map((item: Token) => {
                        return(
                        <div className='row' key={item.contract_name}>

                        <div className='left'>
                            <div className='logoContainer'>
                            <img className='tokenLogo' src={item.contract_ticker_symbol !=='MATIC'? item.logo_url : 'https://cdn.iconscout.com/icon/free/png-256/free-polygon-token-4086724-3379854.png'} alt='tokenlogo'/>
                        </div>
                        <div className='left-info-container1'>
                            <div className='tokenName'>{item.contract_name}</div>
                            </div>
                        </div>
            
                        <div className='right1'>
                            <div className='tokenBalance'>{(parseFloat(item.balance)/(10**item.contract_decimals)).toFixed(2)} {item.contract_ticker_symbol}</div>
                        </div>
                        </div>
                        )
                    })
                    }
                </div>   
        </div>
        <div style={{bottom:'0px', position:'absolute', display:'flex', justifyContent:'center', height:'80px',background:'#222222' , width:'365px'}}>
            <div onClick={() => navigate('/home')} className='backButton' style={{ marginTop:'20px' , width:'320px', background:'#2b2b2b', fontSize:'18px', display:'flex', flexDirection:'column', textAlign:'center', justifyContent:'center'}}>
                Back
            </div>
        </div>
    </div>
  )
}

export default Send