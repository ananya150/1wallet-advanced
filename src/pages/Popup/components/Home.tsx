import React, { useState, useEffect } from 'react'
import namedLogo from '../namedLogo.png';

import TokenBalances from './TokenBalances';

import Tooltip from '@mui/material/Tooltip';
import RecentTransactions from './RecentTransactions';
import GasTank from './GasTank';
import withStyles from '@mui/styles/withStyles';

import { makeStyles } from '@mui/styles';
import BatchTransaction from './BatchTransaction';
import Layout from './ui/HomeLayout';

const CustomTooltip = withStyles((theme) => ({
  tooltip: {
    padding: '8px', // Adjust the padding as needed
    fontSize: '14px', // Adjust the font size as needed
  },
  arrow: {
    color: theme.palette.common.black, // Adjust the arrow color as needed
  },
}))(Tooltip);

const Home = () => {
  const [value, setValue] = useState('tokens');


  return (
    <Layout value={value} setValue={setValue}>

      {/* <div className='accountHome' >
        {value === 'tokens' && <TokenBalances />}
        {value === 'gas' && <GasTank />}
        {value === 'recent' && <RecentTransactions />}
        {value === 'batch' && <BatchTransaction/>}
      </div> */}


    </Layout>

  )
}

export default Home