import React, { useState, useEffect } from 'react'

import BatchTransaction from './BatchTransaction';
import Layout from './ui/HomeLayout';


const Home = () => {
  const [value, setValue] = useState('batch');


  return (
    <Layout value={value} setValue={setValue}>

      <div className='accountHome' >
        {/* {value === 'tokens' && <TokenBalances />}
        {value === 'gas' && <GasTank />}
        {value === 'recent' && <RecentTransactions />} */}
        {value === 'batch' && <BatchTransaction/>}
      </div>


    </Layout>

  )
}

export default Home