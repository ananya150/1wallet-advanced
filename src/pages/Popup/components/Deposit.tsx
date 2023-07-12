import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { getWalletInfo } from '../../utils';
import namedLogo from '../namedLogo.png';
import QRCode from 'qrcode.react';
import IconButton  from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

const Deposit = () => {
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

    useEffect(() => {
        init();
    },[])


  return (
    <div className='container'>
        <div className='headerA' style={{width:'365px'}}>
            <img src={namedLogo} alt='logo' width="160px" height="36px" className='namedLogo' />
        </div>
        <div style={{display:'flex', justifyContent:'center', marginTop:'30px',fontSize:'24px', fontWeight:'600', color:'#fefdf9'}}>
            Deposit
        </div>
        <div style={{display:'flex', justifyContent:'center', marginTop:'20px', fontSize:'15px', fontWeight:'500', color:'#fefdf9'}}>
            on Polygon Mumbai
        </div>
        <div style={{display:'flex', justifyContent:'center', marginTop:'30px'}}>
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
        <div style={{bottom:'0px', position:'absolute', display:'flex', justifyContent:'center', height:'80px',background:'#222222' , width:'365px'}}>
            <div onClick={() => navigate('/home')} className='backButton' style={{ marginTop:'20px' , width:'320px', background:'#2b2b2b', fontSize:'18px', display:'flex', flexDirection:'column', textAlign:'center', justifyContent:'center'}}>
                Back
            </div>
        </div>
    </div>
  )
}

export default Deposit