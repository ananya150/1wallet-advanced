/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { Token } from '../store/tokens/tokensSlice';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton  from '@mui/material/IconButton';
import BlackButton from './ui/BlackButton';
import PurpleButton from './ui/PurpleButton';
import { Tooltip } from 'react-tooltip';
import Divider from '@mui/material/Divider';
import PaymasterSelect from './ui/Select';
import { getWalletInfo } from '../../utils';
import { buildExecuteUserOp, estimateGas, getCallData, getMaticPrice, sendExecuteUserOp } from '../../userOp';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import Link from '@mui/material/Link';
import { CircularProgress } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import { BatchTransactionItem, addElementToBatch } from '../../batch';

type pageProps = {
    token: Token;
    amount:string;
    setValue: any;
    address: string;
    setConfirmation: any;
}

type TransactionState = {
    isLoading: boolean;
    isSuccess: boolean;
    isFailure: boolean;
}

const initialTransactionState: TransactionState = {
    isLoading: false,
    isSuccess: false,
    isFailure: false
}

const openNewTab = (url: string) => {
    window.open(url, '_blank');
  }

const ConfirmTokenTransfer = ({setConfirmation, address , setValue, amount , token}: pageProps) => {

    function delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }    
    const [copied, setCopied] = useState(false);
    const [transactionState, setTransactionState] = useState<TransactionState>(initialTransactionState);
    const [txHash, setTxHash] = useState<any>('')
    const [gasPrice,setGasPrice] = useState<any>('') ;
    const [err, setErr] = useState(false);
    const [loading,setLoading] = useState(false);
    const handleClose = () => {
        setValue('tokens')
    }

    const init = async () => {
        setLoading(true);
        const {walletAddress} = await getWalletInfo();
        const maticPrice = await getMaticPrice();
        console.log("Matic price is ", maticPrice)
        let hasPaymaster = true;
        if(selectedValue === 'matic'){
            hasPaymaster = false;
        }
        try{
            if(token.contract_ticker_symbol === 'MATIC'){
                const to = address;
                const value = String(parseFloat(amount)*(10**18));
                const data = '0x';
                const userOp = await buildExecuteUserOp(walletAddress,to,value,data,hasPaymaster);
                console.log("User Op is ", userOp)
                const gas = (await estimateGas(userOp)).result;
                console.log("Gas Response is ", gas)
                const totalGas = parseInt(gas.callGasLimit,16) + parseInt(gas.preVerificationGas,16) + parseInt(gas.verificationGas,16) 
                console.log("Total gas is ", totalGas)
                const price = (totalGas*maticPrice)/10**9
                console.log(price);
                setGasPrice(price.toFixed(5))
            }else{
                const newAmount = String(parseFloat(amount) * (10**token.contract_decimals));
                const callData = await getCallData(address, newAmount);
                const value = '0';
                const to = token.contract_address;
                const userOp = await buildExecuteUserOp(walletAddress,to,value,callData,hasPaymaster);
                console.log("User Op is ", userOp)
                const gas = (await estimateGas(userOp)).result;
                console.log("Gas Response is ", gas)
                const totalGas = parseInt(gas.callGasLimit,16) + parseInt(gas.preVerificationGas,16) + parseInt(gas.verificationGas,16) 
                console.log("Total gas is ", totalGas)
                const price = (totalGas*maticPrice)/10**9
                console.log(price);
                setGasPrice(price.toFixed(5))
            }
            setLoading(false);
        }catch(e){
            console.log("Some error occured");
            console.log(e);
            setGasPrice('Null')
            setLoading(false);
            setErr(true);
        }
    }

    const [selectedValue, setSelectedValue] = useState('gastank'); // Set the initial value
    useEffect(() => {
        init();
    },[selectedValue])


    const handleSelectChange = (event: any) => {
      setSelectedValue(event.target.value);
    };
  
    const handleSend = async () => {
        setTransactionState(prevState => ({
            ...prevState, isLoading:true
        }))
        let hasPaymaster = true;
        if(selectedValue === 'matic'){
            hasPaymaster = false;
        }
        const {walletAddress} = await getWalletInfo();
        if(token.contract_ticker_symbol === 'MATIC'){
            try{
                const to = address;
                const value = String(parseFloat(amount)*(10**18));
                const data = '0x';
                const res = await sendExecuteUserOp(walletAddress,to,value,data,hasPaymaster);
                console.log(res);
                setTxHash(res);
                setTransactionState(prevState => ({
                    ...prevState, isLoading:false , isSuccess:true
                }))
            }catch(e){
                console.log(e);
                setTransactionState(prevState => ({
                    ...prevState, isLoading:false , isFailure:true
                }))
            }
        }else{
            try{
                const newAmount = String(parseFloat(amount) * (10**token.contract_decimals));
                const callData = await getCallData(address, newAmount);
                const value = '0';
                const to = token.contract_address;
                const res = await sendExecuteUserOp(walletAddress,to,value,callData,hasPaymaster);
                console.log("Transaction hash is " ,res);
                setTransactionState(prevState => ({
                    ...prevState, isLoading:false , isSuccess:true
                }))
            }catch(e){
                console.log(e);
                setTransactionState(prevState => ({
                    ...prevState, isLoading:false , isFailure:true
                }))
            }
        }
    }

    const handleStoreTransaction = async () => {
        if(token.contract_ticker_symbol === 'MATIC'){
            const to = address;
            const value = String(parseFloat(amount));
            const data = '0x';

            const transaction: BatchTransactionItem = {
                to:to,
                amount:value,
                data:data,
                id: String(Date.now()),
                label: 'MATIC'
            }
            await addElementToBatch(transaction);
        }else{
            const newAmount = String(parseFloat(amount) * (10**token.contract_decimals));
            const callData = await getCallData(address, newAmount);
            const value = '0';
            const to = token.contract_address;
            const transaction: BatchTransactionItem = {
                to:to,
                amount:value,
                data:callData,
                id: String(Date.now()),
                label: token.contract_ticker_symbol
            }
            await addElementToBatch(transaction);
        }
        setValue('batch')
    }

    const handleCopy = async () => {
        setCopied(true);
        navigator.clipboard.writeText(address)
        await delay(2000);
        setCopied(false);
    }

    return (

        <>
        
        {
            !transactionState.isLoading && !transactionState.isFailure && !transactionState.isSuccess &&
                <div className='back' style={{height:'450px', width:'365px', display:'flex', justifyContent:'space-between', flexDirection:'column', overflowX:'hidden' ,overflowY:'scroll'}}>
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
                                        Estimated Fee
                                    </div>
                                    <div style={{color:'#fefdf9', marginRight:'15px', fontSize:'17px'}}>
                                        {
                                            loading ?
                                            <Skeleton animation='wave' variant="text" sx={{ fontSize: '1rem', width:'50px',bgcolor: 'grey.800' }} />:
                                            <div>$ {gasPrice}</div>
                                        }
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
                            <BlackButton text='Store' onClick={handleStoreTransaction} width='96px' />
                            <PurpleButton disabled={false} onClick={handleSend} heigth={'50px'} width='96px'>
                                <div>Send</div>
                            </PurpleButton>
                        </div>
                    </div>
                    <Tooltip id="address-tooltip" />
                </div>
        }

        {
            transactionState.isLoading && 
            <div style={{background:'#222222', height:'450px', width:'365px', display:'flex', justifyContent:'space-between', flexDirection:'column', overflowX:'hidden' ,overflowY:'scroll'}}>
                <div style={{height:'350px', display:'flex', flexDirection:'column',justifyContent:'center'}}>
                    <div style={{display:'flex', justifyContent:'center'}}>
                        <div style={{width:'80px', height:'80px', borderRadius:'50%', background:'#3d3b4b', display:'flex', justifyContent:'center'}}>
                            <div style={{height:'80px', display:'flex', flexDirection:'column',justifyContent:'center'}}>
                                <CircularProgress sx={{color:'#a197e5', width:'50px', height:'50px'}} />
                            </div>
                        </div>
                    </div>
                    <div style={{marginTop:'10px', color:'#fefdf9', fontSize:'30px',display:'flex', justifyContent:'center'}} className="headingHome">
                        Sending..
                    </div>
                    <div style={{display: 'flex', justifyContent: 'center', marginTop: '20px', fontSize:'15px', fontWeight:'400',color:'#676666', marginLeft:'20px', marginRight:'20px'}}>
                            {amount} {token.contract_ticker_symbol} to {address.slice(0,5)}....{address.slice(-5)}
                    </div>
                </div>
                <div style={{marginBottom:'20px', marginTop:'30px',  background:'#222222', width:'365px'}}>
                    <div style={{marginLeft:'20px', marginRight:'15px', display:'flex', justifyContent:'space-between'}}>
                        <BlackButton text='Close' onClick={handleClose} width='320px' />
                    </div>
                </div>
            </div>
        }

        {
            transactionState.isFailure && 
            <div style={{background:'#222222',height:'450px', width:'365px', display:'flex', justifyContent:'space-between', flexDirection:'column', overflowX:'hidden' ,overflowY:'scroll'}}>
                <div style={{height:'350px', display:'flex', flexDirection:'column',justifyContent:'center'}}>
                    <div style={{display:'flex', justifyContent:'center'}}>
                        <div style={{width:'80px', height:'80px', borderRadius:'50%', background:'#220000', display:'flex', justifyContent:'center'}}>
                                <CloseIcon sx={{color:'#e5216f', marginTop:'25px',width:'30px', height:'30px'}} />
                        </div>
                    </div>
                    <div style={{marginTop:'10px', color:'#fefdf9', fontSize:'30px',display:'flex', justifyContent:'center'}} className="headingHome">
                        Failed!
                    </div>
                </div>
                <div style={{marginBottom:'20px', marginTop:'30px',  background:'#222222', width:'365px'}}>
                    <div style={{marginLeft:'20px', marginRight:'15px', display:'flex', justifyContent:'space-between'}}>
                        <BlackButton text='Close' onClick={handleClose} width='320px' />
                    </div>
                </div>
            </div>
        }
        {
            transactionState.isSuccess && 
            <div style={{ background:'#222222', height:'450px', width:'365px', display:'flex', justifyContent:'space-between', flexDirection:'column', overflowX:'hidden' ,overflowY:'scroll'}}>
                <div style={{height:'350px', display:'flex', flexDirection:'column',justifyContent:'center'}}>
                    <div style={{display:'flex', justifyContent:'center'}}>
                        <div style={{width:'80px', height:'80px',marginTop:'50px', borderRadius:'50%', background:'#22342b', display:'flex', justifyContent:'center'}}>
                                <CheckIcon sx={{color:'#21e56f', marginTop:'25px',width:'30px', height:'30px'}} />
                        </div>
                    </div>
                    <div style={{marginTop:'10px', color:'#fefdf9', fontSize:'30px',display:'flex', justifyContent:'center'}} className="headingHome">
                        Sent!
                    </div>
                    <div style={{display: 'flex', justifyContent: 'center', marginTop: '20px', fontSize:'15px', fontWeight:'400',color:'#676666', marginLeft:'20px', marginRight:'20px'}}>
                            {amount} {token.contract_ticker_symbol} was successfully sent to
                    </div>
                    <div style={{display: 'flex', justifyContent: 'center', marginTop: '4px', fontSize:'15px', fontWeight:'400',color:'#676666',width:'365px'}}>
                        to {address.slice(0,5)}....{address.slice(-5)}
                    </div>
                    <div style={{display: 'flex', justifyContent: 'center', marginTop: '20px', fontSize:'15px', fontWeight:'400',color:'#aa9ff3',width:'365px'}}>
                        {/* <Link to={`https://mumbai.polygonscan.com/tx/${txHash}`}> */}
                            <Link onClick={() => openNewTab(`https://mumbai.polygonscan.com/tx/${txHash}`)} underline='hover' sx={{color:'#aa9ff3',cursor:'pointer'}}>View Transaction</Link>
                        {/* </Link> */}
                    </div>
                </div>
                <div style={{marginBottom:'20px', marginTop:'30px',  background:'#222222', width:'365px'}}>
                    <div style={{marginLeft:'20px', marginRight:'15px', display:'flex', justifyContent:'space-between'}}>
                        <BlackButton text='Close' onClick={handleClose} width='320px' />
                    </div>
                </div>
            </div>
        }
        </>


    )
}

export default ConfirmTokenTransfer