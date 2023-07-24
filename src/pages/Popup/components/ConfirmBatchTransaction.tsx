import React, { useState } from 'react'
import BlackButton from './ui/BlackButton';
import PurpleButton from './ui/PurpleButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton  from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import Skeleton from '@mui/material/Skeleton';
import PaymasterSelect from './ui/Select';
import { getWalletInfo } from '../../utils';
import { buildBatchExecuteUserOp, estimateGas , sendBatchExecuteUserOp} from '../../userOp';
import { BatchTransactionItem } from '../../batch';

type props = {
    transactions: BatchTransactionItem[];
    setValue: any;
    setSend:any;
}

const ConfirmBatchTransaction = ({transactions, setValue, setSend}: props) => {

    const [loading,setLoading] = useState(false);
    const [gasPrice,setGasPrice] = useState<any>('');
    const [selectedValue, setSelectedValue] = useState('gastank'); // Set the initial value

    const handleSelectChange = (event: any) => {
        setSelectedValue(event.target.value);
      };

    const handleClose = () => {
        setValue('tokens');
    }
    const handleSend = async () => {
        const {walletAddress} = await getWalletInfo();
        // const userOp = await buildBatchExecuteUserOp(walletAddress,transactions,true);
        // const res = await estimateGas(userOp);
        const res = await sendBatchExecuteUserOp(walletAddress,transactions,false);
        console.log(res);
    }

  return (
    <div className='back' style={{height:'450px', width:'365px', display:'flex', justifyContent:'space-between', flexDirection:'column', overflowX:'hidden' ,overflowY:'scroll'}}>
        <div>
            <div style={{display:'flex', justifyContent:'space-between', height:'30px', marginTop:'10px'}}>
                <IconButton onClick={() => {setSend(false)}}>
                    <ArrowBackIcon sx={{color:'white', marginLeft:'6px'}} />
                </IconButton>
                <div className='headingHome' style={{marginRight:'20px', fontSize:'24px', fontWeight:'600', color:'#D3D3D3'}}>
                    Confirm Send
                </div>
                <div></div>
            </div>
            <div className='amount' style={{display: 'flex', justifyContent: 'center', marginTop: '30px', fontSize:'35px', fontWeight:'600',color:'#fefdf9',width:'365px'}}>
                {transactions.length} 
            </div>
            <div style={{display: 'flex', justifyContent: 'center', marginTop: '8px', fontSize:'15px', fontWeight:'400',color:'#808080',width:'365px'}}>
                Transactions                
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
                <BlackButton text='Close' onClick={handleClose} width='154px' />
                <PurpleButton disabled={false} onClick={handleSend} heigth={'50px'} width='154px'>
                    <div>Send</div>
                </PurpleButton>
            </div>
        </div>
    </div>
  )
}

export default ConfirmBatchTransaction