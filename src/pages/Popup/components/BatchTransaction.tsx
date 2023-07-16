import React, { useEffect, useState } from 'react';
import { getBtachedTransactions, removeElement, BatchTransactionItem } from '../../batch';
import { Reorder } from "framer-motion";
import { Item } from "./batch/item";
// total- 450
// marginTop-30
// heading - 30

const dummTx1: BatchTransactionItem = {
  amount: '0.06',
  data:'akjsnsk',
  label:'MATIC',
  id: 'smnkjdn',
  to:'0x85530eD1f8e9Bbd3e093e0aDB7C6B8966A0eca22'
}

const dummTx2: BatchTransactionItem = {
  amount: '0.46',
  data:'akjsnsk',
  label:'MATIC',
  id: 'ejhfbue',
  to:'0x85530eD1f8e9Bbd3e093e0aDB7C6B8966A0eca22'
}

const dummTx3: BatchTransactionItem = {
  amount: '0.1',
  data:'akjsnsk',
  label:'MATIC',
  id: 'eiurhnvf',
  to:'0x85530eD1f8e9Bbd3e093e0aDB7C6B8966A0eca22'
}

const initialItems = [dummTx1, dummTx2, dummTx3];

const BatchTransaction = () => {

  const [transactions, setTransaction] = useState<BatchTransactionItem[]>([])
  const [items, setItems] = useState(initialItems);

  useEffect(() => {
    const init = async () => {
      const txs = await getBtachedTransactions();
      setTransaction(txs);
      console.log("Transaction list are ", txs);
    }
    init()
  },[])

  return (
    <div>
        <div className='headingHome' style={{display:'flex', justifyContent:'center', height:'30px', marginTop:'30px', marginLeft:'10px', fontSize:'24px', fontWeight:'600', color:'#D3D3D3'}}>
            Batch Transactions
        </div>
        {
          transactions.length !== 0 
          ?
          <div style={{display:'flex', justifyContent:'center', height:'30px', marginTop:'190px', fontSize:'15px', fontWeight:'500', color:'#B2BEB5'}}>
            No Stored Transactions
          </div>
          :
          <div style={{marginTop:'50px', width:'365px'}} >
            <Reorder.Group axis="y" onReorder={setItems} values={items}>
              {items.map((item, i) => (
                <Item key={item.id} transaction={item} />
              ))}
            </Reorder.Group>
          </div>
        }
    </div>
  )
}

export default BatchTransaction