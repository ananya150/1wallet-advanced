import React, { useEffect, useState } from 'react';
import { TransactionBatch, BatchTransactionItem } from '../../batch';
// total- 450
// marginTop-30
// heading - 30



const BatchTransaction = () => {

  const [transactions, setTransaction] = useState<BatchTransactionItem[]>([])
  const [transactionClass,setTransactionClass] = useState<TransactionBatch | null>(null)

  useEffect(() => {
    const init = async () => {
      const batchTransactionClass = new TransactionBatch();
      const txs = await batchTransactionClass.init();
      setTransaction(txs);
      console.log("Transaction list are ", txs);
      setTransactionClass(batchTransactionClass)
    }
    init()
  },[])


  return (
    <div>
        <div className='headingHome' style={{display:'flex', justifyContent:'center', height:'30px', marginTop:'30px', marginLeft:'10px', fontSize:'24px', fontWeight:'600', color:'#D3D3D3'}}>
            Batch Transactions
        </div>
        {
          transactions.length === 0 
          ?
          <div style={{display:'flex', justifyContent:'center', height:'30px', marginTop:'190px', fontSize:'15px', fontWeight:'500', color:'#B2BEB5'}}>
            No Stored Transactions
          </div>
          :
          <div>

          </div>
        }
    </div>
  )
}

export default BatchTransaction