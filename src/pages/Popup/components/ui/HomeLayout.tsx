/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
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
import  List  from '@mui/material/List';
import  ListItem  from '@mui/material/ListItem';
import  ListItemButton  from '@mui/material/ListItemButton';
import  ListItemIcon  from '@mui/material/ListItemIcon';
import Drawer  from '@mui/material/Drawer';
import Button  from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton  from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SettingsIcon from '@mui/icons-material/Settings';
import Avatar from '@mui/material/Avatar';
import accountLogo from '../../accountLogo3.jpg'

// Total height = 560px
// header height = 50px 
// remaining height = 450px

const Layout = ({children, value, setValue}: any) => {

  const [state, setState] = React.useState(false)

  const toggleDrawer = (anchor: any, open: any) => (event: any) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    state ? setState(false) : setState(true);
  };

  const list = (anchor: any) => (
    <Box
      sx={{ width: 70, height:'560px', background:'#000000', display:'flex', flexDirection:'column', justifyContent:'space-between',  }}
      role="presentation"
      // onClick={toggleDrawer(anchor, false)}
      // onKeyDown={toggleDrawer(anchor, false)}
    >
      <div>
        <List style={{color:'white'}}>
            <ListItem disablePadding>
              <ListItemButton onClick={toggleDrawer('left', true)}>
                <ListItemIcon>
                  <ArrowBackIcon sx={{color:'white'}} />
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
        </List>
        <List style={{color:'white'}}>
            <ListItem disablePadding style={{marginRight:'20px'}}>
              <ListItemButton onClick={toggleDrawer('left', true)}>
                <ListItemIcon>
                  <Avatar alt="Account" src={accountLogo} />
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
        {/* <span style={{color:'white', marginLeft:'15px', fontFamily:'sans-serif'}}>Account</span> */}
        </List>
      </div>
      <List style={{color:'white'}}>
          <ListItem disablePadding>
            <ListItemButton onClick={toggleDrawer('left', true)}>
              <ListItemIcon>
                <SettingsIcon sx={{color:'white'}} />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
      </List>
    </Box>
  );






  return (
    <div className='container' style={{color: 'white'}}>
        <div className='headerHome' style={{width:'365px'}}>
            <React.Fragment key={'left'}>
              <div style={{marginTop:'6px'}}>
                <IconButton onClick={toggleDrawer('left', true)} >
                  <MenuIcon sx={{color:'white'}} />
                </IconButton>
              </div>
              <Drawer
                anchor={'left'}
                open={state}
                onClose={toggleDrawer('left', false)}
              >
                {list('left')}
              </Drawer>
            </React.Fragment>

        <img src={namedLogo} alt='logo' width="160px" height="36px" className='namedLogo' style={{marginRight:'24px'}} />
          <div></div>
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
      </div>

    </div>
  )
}

export default Layout