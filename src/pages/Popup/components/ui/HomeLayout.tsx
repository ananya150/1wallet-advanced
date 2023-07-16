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
import  ListItemText  from '@mui/material/ListItemText';
import Divider  from '@mui/material/Divider';
import Drawer  from '@mui/material/Drawer';
import Button  from '@mui/material/Button';




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
      sx={{ width: 70, height:'560px', background:'#000000' }}
      role="presentation"
      // onClick={toggleDrawer(anchor, false)}
      // onKeyDown={toggleDrawer(anchor, false)}
    >
      <List style={{color:'white'}}>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              {/* <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon> */}
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              {/* <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon> */}
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );






  return (
    <div className='container' style={{color: 'white'}}>
        <div className='headerA' style={{width:'365px'}}>
            <img src={namedLogo} alt='logo' width="160px" height="36px" className='namedLogo' />
        </div>

        <div style={{height:'450px', overflowX:'hidden' ,overflowY:'scroll'}}>
          {children}
          <div>
            {['left'].map((anchor) => (
              <React.Fragment key={anchor}>
                <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
                <Drawer
                  anchor={'left'}
                  open={state}
                  onClose={toggleDrawer(anchor, false)}
                >
                  {list(anchor)}
                </Drawer>
              </React.Fragment>
            ))}
          </div>
        </div>


        <div style={{position:'relative', background:'#2b2b2b', width:'365px' }}>
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