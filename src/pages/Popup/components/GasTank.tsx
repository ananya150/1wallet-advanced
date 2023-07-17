import React, { useState } from 'react'
import Button  from '@mui/material/Button'
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import DehazeIcon from '@mui/icons-material/Dehaze';
import BlackButton from './ui/BlackButton';
import PurpleButton from './ui/PurpleButton';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

// TODO Get gas balance, functionality to crypto , fiat and paymaster buttons

const GasTank = () => {

    const [gasBalance, setGasBalance] = useState('1.57')

  return (
    <div style={{height:'450px', width:'365px', display:'flex', justifyContent:'space-between', flexDirection:'column', overflowX:'hidden' ,overflowY:'scroll'}}>
      <div>
        <div className='headingHome' style={{display:'flex', justifyContent:'center', height:'30px', marginTop:'30px', marginLeft:'10px', fontSize:'24px', fontWeight:'600', color:'#D3D3D3'}}>
            Gas Tank
        </div>
        <div className='amount' style={{display: 'flex', justifyContent: 'center', marginTop: '30px', fontSize:'45px', fontWeight:'600',color:'#fefdf9',width:'365px', }}>
            $ {gasBalance}
        </div>
        <div style={{marginLeft:'35px', marginRight:'30px', marginTop:'60px', display:'flex', justifyContent:'space-between'}}>
          <PurpleButton disabled={false} width='140px'>
            <div style={{width:'130px', display: 'flex', justifyContent: 'space-between'}}>
              <CurrencyBitcoinIcon sx={{color:'#2f2f2f'}} />
              <div>Crypto</div>
              <div></div>
            </div>
          </PurpleButton>
          <PurpleButton disabled={true} width='140px'>
            <div style={{width:'130px', display: 'flex', justifyContent: 'space-between'}}>
              <AttachMoneyIcon sx={{color:'#2f2f2f'}} />
              <div>Fiat</div>
              <div></div>
            </div>
          </PurpleButton>
        </div>
        <div style={{display: 'flex', justifyContent: 'center', marginTop: '60px', fontSize:'14px', color:'#c0c0c0',width:'365px', }}>
            No Transactions Yet
        </div>
      </div>
      <div style={{marginBottom:'20px', marginTop:'30px', background:'#222222'}}>
        <div style={{marginLeft:'20px', marginRight:'15px', display:'flex', justifyContent:'center'}}>
          <BlackButton disabled={true} text='Add New Paymaster' width='300px' />
        </div>
      </div>
    </div>
  )
}

export default GasTank