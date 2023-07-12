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
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import { getWalletInfo } from '../../utils';
import RecentTransactions from './RecentTransactions';

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const Home = () => {

  const [value, setValue] = useState('recent');
  const [walletAddress, setWalletAddress] = useState('');
  const [name,setName] = useState('')
  const [copied,setCopied] = useState(false);

  const init = async () => {
    const {walletAddress, name} = await getWalletInfo();
    setName(name);
    setWalletAddress(walletAddress);
  }

  const copyAddress = async () => {
    setCopied(true);
    navigator.clipboard.writeText(walletAddress)
    await (delay(2000));
    setCopied(false);
  }


  useEffect(() => {
    init();
  })

  return (
    <div className='container' style={{color: 'white'}}> 
      <div className='headerA' style={{width:'365px'}}>
        <img src={namedLogo} alt='logo' width="160px" height="36px" className='namedLogo' />
      </div>
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
      <div className='accountHome' style={{height:'380px', overflowX:'hidden' ,overflowY:'scroll'}}>
      {value === 'tokens' && <TokenBalances />}
      {value === 'recent' && <RecentTransactions />}
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