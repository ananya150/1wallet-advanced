import React from 'react'
import Button  from '@mui/material/Button'

type Props = {
    text: string;
    width?: string;
    onClick?: any;
    disabled?:boolean;
}

const BlackButton = ({text, width, onClick, disabled}: Props) => {
  return (
    <Button variant='contained' onClick={onClick} sx={{
        backgroundColor: "#2c2c2c",
        borderRadius:'10px',
        color:'gray',
        fontSize:'15px',
        cursor: disabled? 'not-allowed': 'pointer' ,
        height:'50px',
        width: `${width}`,
        ':hover': {
          bgcolor: '#444444',
          color:'#fefdf9',
        },      
        }} 
        >
        {text}
      </Button>
  )
}

export default BlackButton