import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { getWalletInfo } from '../../utils';
import namedLogo from '../namedLogo.png';
import QRCode from 'qrcode.react';
import IconButton  from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import BlackButton from './ui/BlackButton';

function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

const Deposit = ({setValue}: any) => {
    const [walletAddress, setWalletAddress] = useState('');
    const navigate = useNavigate();
    const init = async () => {
        const {walletAddress, name} = await getWalletInfo();
        setWalletAddress(walletAddress);
      }
    const [copied,setCopied] = useState(false);
    const copyAddress = async () => {
        setCopied(true);
        navigator.clipboard.writeText(walletAddress)
        await (delay(2000));
        setCopied(false);
      }

    const handleBack = () => {
        setValue("tokens")
    }

    useEffect(() => {
        init();
    },[])


  return (
    <div style={{height:'450px', width:'365px', display:'flex', justifyContent:'space-between', flexDirection:'column', overflowX:'hidden' ,overflowY:'scroll'}}>
        <div>
            <div className='headingHome' style={{display:'flex', justifyContent:'center', height:'30px', marginTop:'20px', marginLeft:'10px', fontSize:'24px', fontWeight:'600', color:'#D3D3D3'}}>
                Deposit
            </div>
            <div className='headingHome' style={{display:'flex', justifyContent:'center', marginTop:'15px', marginLeft:'15px', fontSize:'15px', fontWeight:'500', color:'#fefdf9'}}>
                on Polygon Mumbai
            </div>
            <div style={{display:'flex', justifyContent:'center', marginLeft:'15px', marginTop:'45px'}}>
                <div style={{height:'150px', width:'150px', background:'white', borderRadius:'5px'}}>
                    <QRCode value={walletAddress} style={{height:'120px', width:'120px', marginTop:'15px', marginLeft:'15px'}} />
                </div>
            </div>
            <div style={{display:'flex', justifyContent:'space-between', marginTop:'30px', height:'50px', background:'#191819', width:'325px', marginLeft:'20px', color:'gray'}} >
                <div style={{display:'flex', justifyContent:'center', flexDirection:'column', marginLeft:'15px', fontSize:'11px'}}>
                    {walletAddress}
                </div>
                <IconButton onClick={copyAddress}>
                {copied? 
                    <CheckIcon style={{marginRight: '10px', fontSize: '13px', color: '#B2BEB5', marginTop:'2px'}} /> 
                    :
                    <ContentCopyIcon style={{marginRight: '10px', fontSize: '13px', color: '#B2BEB5', marginTop:'2px'}} />
                } 
                </IconButton>

            </div>
        </div>
        <div style={{marginBottom:'20px', marginTop:'20px',  background:'#222222', width:'365px'}}>
            <div style={{marginLeft:'25px', marginRight:'25px', display:'flex', justifyContent:'center'}}>
                <BlackButton onClick={handleBack} text='Back' width='310px' />
            </div>
        </div>
    </div>
  )
}

export default Deposit