import React from 'react'

// TODO Fetch recent activity

const RecentTransactions = () => {
  return (
    <div style={{height:'450px', width:'365px', display:'flex', justifyContent:'space-between', flexDirection:'column', overflowX:'hidden' ,overflowY:'scroll'}}>
      <div>
        <div className='headingHome' style={{display:'flex', justifyContent:'center', height:'30px', marginTop:'30px', marginLeft:'10px', fontSize:'24px', fontWeight:'600', color:'#D3D3D3'}}>
          Recent Activity
        </div>
        <div style={{display:'flex', justifyContent:'center', marginTop:'190px', marginLeft:'10px' , color:'#B2BEB5', fontSize:'15px'}}>
            No transactions found
        </div>
      </div>
    </div>
  )
}

export default RecentTransactions