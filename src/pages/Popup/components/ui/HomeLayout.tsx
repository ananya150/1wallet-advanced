/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import namedLogo from '../../namedLogo.png';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import RestoreIcon from '@mui/icons-material/Restore';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import AddIcon from '@mui/icons-material/Add';
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip';
import Box  from '@mui/material/Box';
import List  from '@mui/material/List';
import ListItem  from '@mui/material/ListItem';
import ListItemButton  from '@mui/material/ListItemButton';
import ListItemIcon  from '@mui/material/ListItemIcon';
import Drawer  from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton  from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SettingsIcon from '@mui/icons-material/Settings';
import Avatar from '@mui/material/Avatar';
import accountLogo from '../../accountLogo3.jpg'
import accountLogo2 from '../../accountLogo2.png'
import ReactDOMServer from 'react-dom/server';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import { getWalletInfo } from '../../../utils';


// Total height = 560px
// header height = 50px 
// bottom navigation = 60px
// remaining height = 450px
const Layout = ({children, value, setValue}: any) => {

  const [state, setState] = React.useState(false);
  const [address, setAddress] = useState('');
  const [copied,setCopied] = useState(false);
  const toggleDrawer = () => (event: any) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    state ? setState(false) : setState(true);
  };

  const handleAccountClick = () => {
    setValue("accounts")
    setState(false);
  }

  const handleSettingsClick = () => {
    setValue("settings"); 
    setState(false);
  }

  const init = async () => {
    const {walletAddress} = await getWalletInfo();
    setAddress(walletAddress);
  }

  function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const copyAddress = async () => {
    setCopied(true);
    navigator.clipboard.writeText(address)
    await (delay(2000));
    setCopied(false);
  }

  useEffect(() => {
    init();
  },[])

  const list = () => (
    <Box
      sx={{ width: 70, height:'560px', background:'#000000', display:'flex', flexDirection:'column', justifyContent:'space-between', marginX:'auto' }}
      role="presentation"
    >
      <div>
        <List style={{color:'white'}}>
            <ListItem disablePadding>
              <ListItemButton onClick={toggleDrawer()}>
                <ListItemIcon>
                  <ArrowBackIcon sx={{color:'white'}} />
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
        </List>
        <IconButton onClick={handleAccountClick}>
          <Avatar  alt="Account" sx={{height:'50px', width:'50px'}} src={accountLogo} />
        </IconButton>
      </div>

      <IconButton onClick={handleSettingsClick}>
        <SettingsIcon sx={{color:'white'}} />
      </IconButton>
    </Box>
  );

  return (
    <div className='container' style={{color: 'white'}}>
        <div className='headerHome' style={{width:'365px'}}>
            <React.Fragment key={'left'}>
              <div style={{marginTop:'6px'}}>
                <IconButton onClick={toggleDrawer()} >
                  <MenuIcon sx={{color:'white'}} />
                </IconButton>
              </div>
              <Drawer
                anchor={'left'}
                open={state}
                onClose={toggleDrawer()}
              >
                {list()}
              </Drawer>
            </React.Fragment>

          <img src={namedLogo} alt='logo' width="160px" height="36px" className='namedLogo' style={{marginLeft:'18px'}} />
          
          <div>
            <IconButton 
              onClick={copyAddress}
              data-tooltip-id="address-tooltip"
              data-tooltip-html={ReactDOMServer.renderToStaticMarkup(<div>
                {address.slice(0,6)}.....{address.slice(-6)}
                {copied? 
                <CheckIcon style={{marginLeft: '10px', fontSize: '13px', color: '#B2BEB5', marginTop:'2px'}} /> 
                :
                <ContentCopyIcon style={{marginLeft: '10px', fontSize: '13px', color: '#B2BEB5', marginTop:'2px'}} />
                } 
              </div>)}
              data-tooltip-place="bottom"      
            >
              <Avatar  alt="Account" sx={{height:'35px', width:'35x', marginRight:'1px'}} src={accountLogo2} />
            </IconButton>
          </div>
        </div>

        <div style={{height:'450px', overflowX:'hidden' ,overflowY:'scroll'}}>
          {children}
        </div>


        <div style={{background:'#2b2b2b', width:'365px' }}>
          <BottomNavigation sx={{width:'365px',background:'#2b2b2b', height:'60px', bottom:'0px'}}         
          onChange={(event, newValue) => {
            setValue(newValue);
          }}>
              <BottomNavigationAction
                data-tooltip-id="balance-tooltip"
                data-tooltip-content="Balances"
                data-tooltip-place="top"
                showLabel={false}
                value="tokens"
                sx={value==='tokens' ? {color: 'white', ':hover': {color:'white'}} : {color:'gray', ':hover': {color:'white'}}}
                icon={<AttachMoneyIcon />}
              />
              <BottomNavigationAction
                data-tooltip-id="recent-tooltip"
                data-tooltip-content="Recent Transactions"
                data-tooltip-place="top"
                showLabel={false}
                value="recent"
                sx={value==='recent' ? {color: 'white', ':hover': {color:'white'}} : {color:'gray', ':hover': {color:'white'}}}
                icon={<RestoreIcon />}
              />
              <BottomNavigationAction
                data-tooltip-id="gas-tooltip"
                data-tooltip-content="Gas Tank"
                data-tooltip-place="top"
                showLabel={false}
                value="gas"
                sx={value==='gas' ? {color: 'white', ':hover': {color:'white'}} : {color:'gray', ':hover': {color:'white'}}}
                icon={<LocalGasStationIcon />}
              />
              <BottomNavigationAction
                data-tooltip-id="batch-tooltip"
                data-tooltip-content="Batch Transactions"
                data-tooltip-place="top"
                showLabel={false}
                value="batch"
                sx={value==='batch' ? {color: 'white', ':hover': {color:'white'}} : {color:'gray', ':hover': {color:'white'}}}
                icon={<AddIcon />}
              />
          </BottomNavigation>
          <Tooltip id="balance-tooltip" />
          <Tooltip id="recent-tooltip" />
          <Tooltip id="batch-tooltip" />
          <Tooltip id="gas-tooltip" />
          <Tooltip id="address-tooltip" />
      </div>

    </div>
  )
}

export default Layout