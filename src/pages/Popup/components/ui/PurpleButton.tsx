import React from 'react'
import Button  from '@mui/material/Button'

type Props = {
    children: any;
    width?: string;
    onClick?: any;
    disabled: boolean;
    heigth?: string;
}

const PurpleButton = ({children, width, onClick, disabled, heigth}: Props) => {
  return (
    <Button variant='contained' onClick={onClick} sx={{
        backgroundColor: "#ab9ff2",
        borderRadius:'5px',
        color:'#222222',
        fontSize:'14px',
        height: heigth ? heigth : '40px',
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