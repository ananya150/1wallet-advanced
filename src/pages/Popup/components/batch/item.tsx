import * as React from "react";
import { useMotionValue, Reorder } from "framer-motion";
import { useRaisedShadow } from "./use-raised-shadow";
import { BatchTransactionItem } from "../../../batch";
import SortIcon from '@mui/icons-material/Sort';
import DeleteIcon from '@mui/icons-material/Delete';

interface Props {
    transaction: BatchTransactionItem
}

export const Item = ({ transaction }: Props) => {
  const y = useMotionValue(0);
  const boxShadow = useRaisedShadow(y);

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
                        {transaction.amount} {transaction.label}
                </div>
            </div>
            <div style={{display:'flex', justifyContent:'center', flexDirection:'column', marginRight:'10px'}}>
                <DeleteIcon fontSize="small" sx={{color:'white'}} />
            </div>
        </div>
    </Reorder.Item>
  );
};
