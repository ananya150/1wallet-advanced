import React, { Children } from 'react'
import Button  from '@mui/material/Button'

type Props = {
    children: any;
    width?: string
}

const PurpleButton = ({children, width}: Props) => {
  return (
    <Button variant='contained' sx={{
        backgroundColor: "#ab9ff2",
        borderRadius:'5px',
        color:'#222222',
        fontSize:'14px',
        height:'40px',
        width: `${width}`,
        ':hover': {
          bgcolor: '#e2dffe',
        },      
        }} 
        >
        {children}
      </Button>
  )
}


export default PurpleButton