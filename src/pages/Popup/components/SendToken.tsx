import React, { useState } from 'react';
import { Token } from '../store/tokens/tokensSlice';
import {InputField, InputFieldWithButton} from './ui/InputField';
import BlackButton from './ui/BlackButton';
import noImg from '../noImg.png';
import ConfirmTokenTransfer from './ConfirmTokenTransfer';

// TODO handle send token

function isAddress(address: string) {
  if (!/^0x[0-9A-Fa-f]{40}$/i.test(address)) {
    return false;
  }

  return true;
}

function validateAmount(str: string, maxNumber: number) {
  const number = Number(str);

  if (isNaN(number) || !Number.isFinite(number) || number === 0 || number > maxNumber) {
    return false; 
  }

  return true; 
}

type pageProps = {
    token: Token;
    setTokenSelected:any;
    setValue: any
}

const SendToken = ({token, setTokenSelected, setValue}: pageProps) => {
    const maxAmount = parseFloat(token.balance)/(10**token.contract_decimals)
    console.log(maxAmount)
    const [address, setAddress] = useState('');
    const [addressErr, setAddressErr] = useState(false);
    const handleAddress = (event: any) => {
        setAddress(event.target.value);
      };
    const [amount, setAmount] = useState('');
    const [amountErr, setAmountErr] = useState(false);
    const [imageError, setImageError] = useState(false);

    const [conformation, setConfirmation] = useState(false);

    const handleImageError = () => {
      setImageError(true);
    }
    const handleAmount = (event: any) => {
        setAmount(event.target.value);
      };

    const handleCancel = () => {
      setValue("tokens")
    }

    const handleSend = () => {
      setAddressErr(false);
      setAmountErr(false);
      const isAdd = isAddress(address);
      if(!isAdd){
        setAddressErr(true);
        return;
      }
      const isValidAmount = validateAmount(amount, maxAmount)
      if(!isValidAmount){
        setAmountErr(true);
        return
      }
      setConfirmation(true);
    }


  return (

    <>
      {
        conformation ?
          <ConfirmTokenTransfer setConfirmation={setConfirmation} address={address} setValue={setValue} token={token} amount={amount} />
          :
        <div style={{height:'450px', width:'365px', display:'flex', justifyContent:'space-between', flexDirection:'column', overflowX:'hidden' ,overflowY:'scroll'}}>
          <div>

            <div className='headingHome' style={{display:'flex', justifyContent:'center', height:'30px', marginTop:'30px', marginLeft:'10px', fontSize:'24px', fontWeight:'600', color:'#D3D3D3'}}>
                Send {token.contract_ticker_symbol}
            </div>

            <div style={{display:'flex', justifyContent:'center', marginTop:'30px'}}>
              <img style={{borderRadius:'50%', height:'60px'}} src={token.contract_ticker_symbol !=='MATIC'? ( imageError ? token.logo_url : noImg)  : 'https://cdn.iconscout.com/icon/free/png-256/free-polygon-token-4086724-3379854.png'} alt='tokenlogo' onError={() => handleImageError()} />
            </div>
            
            <div style={{display:'flex', justifyContent:'center', marginTop:'30px'}}>
              <InputField value={address} handleValue={handleAddress} isErr={addressErr} autofocus={true} errMsg={'Invalid Address'} placeHolder={"Recipient's Address"} />
            </div>
            <div style={{display:'flex', justifyContent:'center'}}>
              <InputFieldWithButton setValue={setAmount} maxValue={maxAmount} value={amount} handleValue={handleAmount} isErr={amountErr} autofocus={false} errMsg={'Invalid Amount'} placeHolder={"Amount"} />
            </div>

          </div>
            <div style={{marginBottom:'20px', marginTop:'30px',  background:'#222222', width:'365px'}}>
              <div style={{marginLeft:'20px', marginRight:'15px', display:'flex', justifyContent:'space-between'}}>
                <BlackButton onClick={handleCancel} text='Cancel' width='150px' />
                <BlackButton onClick={handleSend} text='Send' width='150px' />
              </div>
            </div>
        </div>
      }
    </>

  )
}

export default SendToken