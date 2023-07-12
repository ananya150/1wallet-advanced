import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getWalletInfo } from '../../utils';
import { fetchTokens } from '../store/tokens/tokensSlice';
import { RootState, AppDispatch } from '../store/store';
import namedLogo from '../namedLogo.png';

const Home = () => {

  const dispatch = useDispatch<AppDispatch>();
  const tokens = useSelector((state: RootState) => state.tokens);
  const [walletAddress, setWalletAddress] = useState('');
  const [name,setName] = useState('')


  const init = async () => {
    const {walletAddress, name} = await getWalletInfo();
    console.log(walletAddress);
    setName(name);
    setWalletAddress(walletAddress);
    // dispatch(fetchTokens(walletAddress));
  }

  useEffect(() => {
    init();
  }, [dispatch]);



  return (
    <div className='container' style={{color: 'white'}}>
      {/* {tokens.map((token: any) => (
        <div key={token.contract_address}>
          <h2>{token.contract_name}</h2>
        </div>
      ))} */}
      <div className='headerA'>
        <img src={namedLogo} alt='logo' width="160px" height="36px" className='namedLogo' />
      </div>
      <div style={{display: 'flex', justifyContent: 'center', marginTop: '10px'}}>
        <div style={{display: 'flex', color: '#fefdf9' }}>
          {name}
        </div>
      </div>

    </div>
  )
}

export default Home