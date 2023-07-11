import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getWalletInfo } from '../../utils';
import { fetchTokens } from '../store/tokens/tokensSlice';
import { RootState, AppDispatch } from '../store/store';

const Home = () => {

  const dispatch = useDispatch<AppDispatch>();
  const tokens = useSelector((state: RootState) => state.tokens);
  const [walletAddress, setWalletAddress] = useState('');


  const init = async () => {
    const {walletAddress, name} = await getWalletInfo();
    console.log(walletAddress);
    setWalletAddress(walletAddress);
    dispatch(fetchTokens(walletAddress));
  }

  useEffect(() => {
    init();
  }, [dispatch]);



  return (
    <div className='container' style={{color: 'white'}}>
      {tokens.map((token: any) => (
        <div key={token.contract_address}>
          <h2>{token.contract_name}</h2>
        </div>
      ))}
    </div>
  )
}

export default Home