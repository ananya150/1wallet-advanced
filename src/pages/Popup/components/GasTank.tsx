import React, { useState } from 'react'
import Button  from '@mui/material/Button'
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import DehazeIcon from '@mui/icons-material/Dehaze';

const GasTank = () => {

    const [gasBalance, setGasBalance] = useState('1.57')

  return (
    <div>
        <div style={{display:'flex', justifyContent:'center', marginTop:'30px', marginLeft:'10px', fontSize:'24px', fontWeight:'600', color:'#fefdf9'}}>
            Gas Tank
        </div>
        <div style={{display: 'flex', justifyContent: 'center', marginTop: '40px', fontSize:'45px', fontWeight:'600',color:'#fefdf9',width:'365px', background:'#252525'}}>
            ${gasBalance}
        </div>
        <div style={{display: 'flex', justifyContent: 'center', marginTop: '10px', fontSize:'16px', color:'#B2BEB5', alignItems:'center',marginRight:'10px', width:'365px', background:'#242424'}}>
            <div>
                Gas Left
            </div>
        </div>
        <div style={{display:'flex', justifyContent:'space-evenly', marginTop:'60px', width:'365px', background:'#232323'}}>
          <Button variant='contained' size='small' startIcon={<LocalGasStationIcon />} sx={{
              backgroundColor: "#9666cb",
              fontSize:'13px',
              width:'100px',
              borderRadius: '6px',
              ':hover': {
                bgcolor: '#a873e5',
              },      
              }} 
              >
              Crypto
          </Button>
          <Button variant='contained' startIcon={<LocalGasStationIcon />} sx={{
            backgroundColor: "#9666cb",
            fontSize:'13px',
            width:'100px',
            borderRadius: '6px',
            ':hover': {
              bgcolor: '#a873e5',
            },      
            }} 
            >
            Fiat
          </Button>
        </div>
        <div style={{display:'flex', justifyContent:'center', marginTop:'50px', width:'365px', background:'#222222'}}>
            <Button variant='contained' startIcon={<DehazeIcon />} sx={{
                backgroundColor: "#9666cb",
                fontSize:'13px',
                width:'120px',
                cursor:'not-allowed',
                borderRadius: '6px',
                ':hover': {
                bgcolor: '#a873e5',
                },      
                }} 
                >
                Withdraw
            </Button>
        </div>
    </div>
  )
}

export default GasTank