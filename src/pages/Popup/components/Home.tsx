import React, { useState, useEffect } from 'react'
import namedLogo from '../namedLogo.png';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import TokenBalances from './TokenBalances';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import RestoreIcon from '@mui/icons-material/Restore';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip';
import RecentTransactions from './RecentTransactions';
import GasTank from './GasTank';

import { makeStyles } from '@mui/styles';
import BatchTransaction from './BatchTransaction';

const Home = () => {
  const [value, setValue] = useState('tokens');


  return (
    <div className='container' style={{color: 'white'}}> 
      {/* {tokens.map((token: any) => (
        <div key={token.contract_address}>
          <h2>{token.contract_name}</h2>
        </div>
      ))} */}
      <div className='headerA' style={{width:'365px'}}>
        <img src={namedLogo} alt='logo' width="160px" height="36px" className='namedLogo' />
      </div>
      <div className='accountHome' style={{height:'390px', overflowX:'hidden' ,overflowY:'scroll'}}>
      {value === 'tokens' && <TokenBalances />}
      {value === 'gas' && <GasTank />}
      {value === 'recent' && <RecentTransactions />}
      {value === 'batch' && <BatchTransaction/>}
      </div>
      <div style={{position:'absolute', bottom:'0px', height:'60px', background:'#2b2b2b', width:'365px' }}>
          <BottomNavigation sx={{width:'365px',background:'#2b2b2b'}}         
          onChange={(event, newValue) => {
            setValue(newValue);
          }}>
             <Tooltip title="Balances" placement="top">
              <BottomNavigationAction
                showLabel={false}
                value="tokens"
                sx={value==='tokens' ? {color: 'white', ':hover': {color:'white'}} : {color:'gray', ':hover': {color:'white'}}}
                icon={<AttachMoneyIcon />}
              />
            </Tooltip>
            <Tooltip title="Recent Transactions" placement="top">
              <BottomNavigationAction
                showLabel={false}
                value="recent"
                sx={value==='recent' ? {color: 'white', ':hover': {color:'white'}} : {color:'gray', ':hover': {color:'white'}}}
                icon={<RestoreIcon />}
              />
            </Tooltip>
            <Tooltip title="Gas Tank" placement="top">
              <BottomNavigationAction
                showLabel={false}
                value="gas"
                sx={value==='gas' ? {color: 'white', ':hover': {color:'white'}} : {color:'gray', ':hover': {color:'white'}}}
                icon={<LocalGasStationIcon />}
              />
            </Tooltip>
            <Tooltip title="Batch Transactions" placement="top">
              <BottomNavigationAction
                showLabel={false}
                value="batch"
                sx={value==='batch' ? {color: 'white', ':hover': {color:'white'}} : {color:'gray', ':hover': {color:'white'}}}
                icon={<AddIcon />}
              />
            </Tooltip>
          </BottomNavigation>
      </div>
    </div>
  )
}

export default Home