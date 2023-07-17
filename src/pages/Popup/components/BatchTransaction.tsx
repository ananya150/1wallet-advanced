import React, { useEffect, useState } from 'react';
import { getBtachedTransactions, removeElement, BatchTransactionItem, clearAllBatch } from '../../batch';
import { Reorder } from "framer-motion";
import { Item } from "./batch/item";
import BlackButton from './ui/BlackButton';
import ConfirmBatchTransaction from './ConfirmBatchTransaction';
// total- 450
// marginTop-30
// heading - 30


const BatchTransaction = ({setValue}: any) => {

  const [transactions, setTransaction] = useState<BatchTransactionItem[]>([])
  const [send,setSend] = useState(false);

  const handleClear = async () => {
    const newTxs = await clearAllBatch();
    setTransaction(newTxs);
  }

  const handleSend = async () => {
    setSend(true);
  }

  useEffect(() => {
    const init = async () => {
      const txs = await getBtachedTransactions();
      setTransaction(txs);
      console.log("Transaction list are ", txs);
    }
    init()
  },[])

  return (
    <>
      {
        send ? 
        <ConfirmBatchTransaction transactions={transactions} setValue={setValue} setSend={setSend} />
        :
        <div style={{height:'450px', width:'365px', display:'flex', justifyContent:'space-between', flexDirection:'column', overflowX:'hidden' ,overflowY:'scroll'}}>
          <div>
            <div className='headingHome' style={{display:'flex', justifyContent:'center', height:'30px', marginTop:'30px', marginLeft:'10px', fontSize:'24px', fontWeight:'600', color:'#D3D3D3'}}>
                Batch Transactions
            </div>
            {
              transactions.length === 0 
              ?
              <div style={{display:'flex', justifyContent:'center', height:'30px', marginTop:'150px', fontSize:'15px', fontWeight:'500', color:'#B2BEB5'}}>
                No Stored Transactions
              </div>
              :
              <div style={{marginTop:'50px', width:'365px'}} >
                <Reorder.Group axis="y" onReorder={setTransaction} values={transactions}>
                  {transactions.map((item, i) => (
                    <Item key={item.id} transaction={item} setTransaction={setTransaction} />
                  ))}
                </Reorder.Group>

              </div>

            }
          </div>
          <div style={{marginBottom:'20px', marginTop:'30px',  background:'#222222', width:'365px'}}>
            <div style={{marginLeft:'20px', marginRight:'15px', display:'flex', justifyContent:'space-between'}}>
              <BlackButton onClick={handleClear} text='Clear' width='150px' />
              <BlackButton text='Send' onClick={handleSend} width='150px' />
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default BatchTransaction