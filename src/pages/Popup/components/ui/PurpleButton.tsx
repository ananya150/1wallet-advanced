import React from 'react'
import Button  from '@mui/material/Button'

type Props = {
    children: any;
    width?: string;
    onClick?: any;
    disabled: boolean;
}

const PurpleButton = ({children, width, onClick, disabled}: Props) => {
  return (
    <Button variant='contained' onClick={onClick} sx={{
        backgroundColor: "#ab9ff2",
        borderRadius:'5px',
        color:'#222222',
        fontSize:'14px',
        height:'40px',
        cursor: disabled? 'not-allowed': 'pointer' ,
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