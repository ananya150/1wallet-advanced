/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { Token } from '../store/tokens/tokensSlice';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton  from '@mui/material/IconButton';
import BlackButton from './ui/BlackButton';
import PurpleButton from './ui/PurpleButton';
import { Tooltip } from 'react-tooltip';
import Divider from '@mui/material/Divider';
import PaymasterSelect from './ui/Select';
import { getWalletInfo } from '../../utils';
import { buildExecuteUserOp } from '../../userOp';


type pageProps = {
    token: Token;
    amount:string;
    setValue: any;
    address: string;
    setConfirmation: any;
}

const ConfirmTokenTransfer = ({setConfirmation, address , setValue, amount , token}: pageProps) => {

    function delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }    
    const [copied, setCopied] = useState(false)
    const handleClose = () => {
        setValue('tokens')
    }

    const [selectedValue, setSelectedValue] = useState('gastank'); // Set the initial value

    const handleSelectChange = (event: any) => {
      setSelectedValue(event.target.value);
    };
  
    const handleSend = async () => {
        const {walletAddress} = await getWalletInfo();
        const to = address;
        const value = String(parseFloat(amount)*(10**18));
        const data = '0x';
        const res = await buildExecuteUserOp(walletAddress,to,value,data);
        console.log(res)
    }


    const handleCopy = async () => {
        setCopied(true);
        navigator.clipboard.writeText(address)
        await delay(2000);
        setCopied(false);
    }

    return (
        <div style={{height:'450px', width:'365px', display:'flex', justifyContent:'space-between', flexDirection:'column', overflowX:'hidden' ,overflowY:'scroll'}}>
            <div>
                <div style={{display:'flex', justifyContent:'space-between', height:'30px', marginTop:'10px'}}>
                    <IconButton onClick={() => {setConfirmation(false)}}>
                        <ArrowBackIcon sx={{color:'white', marginLeft:'6px'}} />
                    </IconButton>
                    <div className='headingHome' style={{marginRight:'20px', fontSize:'24px', fontWeight:'600', color:'#D3D3D3'}}>
                        Confirm Send
                    </div>
                    <div></div>
                </div>
                <div className='amount' style={{display: 'flex', justifyContent: 'center', marginTop: '30px', fontSize:'35px', fontWeight:'600',color:'#fefdf9',width:'365px'}}>
                    {amount} {token.contract_ticker_symbol}
                </div>
                <div style={{display: 'flex', justifyContent: 'center', marginTop: '8px', fontSize:'15px', fontWeight:'400',color:'#808080',width:'365px'}}>
                    to &nbsp; <a data-tooltip-id="address-tooltip" onClick={handleCopy} style={{cursor:'pointer'}}
                          data-tooltip-content={copied ? 'Copied' : 'Copy to clipboard'}
                          data-tooltip-place="top">{address.slice(0,5)}....{address.slice(-5)}</a>
                </div>
                <div style={{display:'flex', justifyContent:'center', marginTop:'40px', width:'365px'}}>
                    <div style={{borderRadius:'10px',marginLeft:'25px', marginRight:'20px', background:'#2a2a2a'}}>

                        <div style={{display:'flex', justifyContent:'space-between', paddingTop:'10px', paddingBottom:'10px', width:'300px'}}>
                            <div style={{color:'#808080',  marginLeft:'15px', fontSize:'17px'}}>
                                Network
                            </div>
                            <div style={{color:'#fefdf9', marginRight:'15px', fontSize:'17px'}}>
                                Mumbai
                            </div>
                        </div>
                        <Divider sx={{color:'black'}} />
                        <div style={{display:'flex', justifyContent:'space-between', paddingTop:'10px', paddingBottom:'10px', width:'300px'}}>
                            <div style={{color:'#808080',  marginLeft:'15px', fontSize:'17px'}}>
                                Network Fee
                            </div>
                            <div style={{color:'#fefdf9', marginRight:'15px', fontSize:'17px'}}>
                                $ 0.004
                            </div>
                        </div>
                        <Divider sx={{color:'black'}} />
                        <div style={{display:'flex', justifyContent:'space-between', paddingTop:'10px', paddingBottom:'10px', width:'300px'}}>
                            <div style={{color:'#808080',  marginLeft:'15px', fontSize:'17px', display:'flex', flexDirection:'column', justifyContent:'center' }}>
                                Fee
                            </div>
                            <div style={{color:'#fefdf9', marginRight:'15px', fontSize:'17px'}}>
                                <PaymasterSelect selectedValue={selectedValue} setSelectedValue={setSelectedValue} handleSelectChange={handleSelectChange} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{marginBottom:'20px', marginTop:'30px',  background:'#222222', width:'365px'}}>
                <div style={{marginLeft:'20px', marginRight:'15px', display:'flex', justifyContent:'space-between'}}>
                    <BlackButton text='Close' onClick={handleClose} width='96px' />
                    <BlackButton text='Store' width='96px' />
                    <PurpleButton disabled={false} onClick={handleSend} heigth={'50px'} width='96px'>
                        <div>Send</div>
                    </PurpleButton>
                </div>
            </div>
            <Tooltip id="address-tooltip" />
        </div>
    )
}

export default ConfirmTokenTransfer