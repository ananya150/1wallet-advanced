import * as React from "react";
import { useMotionValue, Reorder } from "framer-motion";
import { useRaisedShadow } from "./use-raised-shadow";
import { BatchTransactionItem, removeElement } from "../../../batch";
import SortIcon from '@mui/icons-material/Sort';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from "@mui/material/IconButton";

interface Props {
    transaction: BatchTransactionItem;
    setTransaction: any
}

export const Item = ({ transaction, setTransaction }: Props) => {
  const y = useMotionValue(0);
  const boxShadow = useRaisedShadow(y);

  const deleteItem = async () => {
    console.log('started')
    const txns = await removeElement(transaction.id);
    setTransaction(txns);
  }
  
  return (
    <Reorder.Item value={transaction} id={transaction.id} style={{ marginLeft:'-30px', boxShadow, y, marginRight:'13px', listStyle:'none', cursor:'grab'}}>
        <div style={{display:'flex', justifyContent:'space-between', height:'60px', marginTop:'15px', background:'#2f2f2f', borderRadius:'12px'}}>
            <div style={{display:'flex', justifyContent:'center', flexDirection:'column', marginLeft:'10px'}}>
                <SortIcon  sx={{color:'white'}} />
            </div>
            <div style={{width:'220px', display:'flex', justifyContent:'space-between'}}>
                <div style={{display:'flex', justifyContent:'center', flexDirection:'column', fontSize:'15px', color:'#fefdf9', fontWeight:'lighter'}}>
                    {transaction.to.slice(0,5)}....{transaction.to.slice(-5)}
                </div>
                <div style={{display:'flex', justifyContent:'center', flexDirection:'column', fontSize:'11px', fontWeight:'200', color:'#c0c0c0'}}>
                        {parseFloat(transaction.amount).toFixed(3)} {transaction.label}
                </div>
            </div>
            <div style={{display:'flex', justifyContent:'center', flexDirection:'column', marginRight:'10px'}}>
                <IconButton onClick={deleteItem}>
                    <DeleteIcon fontSize="small" sx={{color:'white', cursor:'pointer'}} />
                </IconButton>
            </div>
        </div>
    </Reorder.Item>
  );
};
