import React from 'react'
import Button  from '@mui/material/Button'

type Props = {
    text: string;
    width?: string;
    onClick?: any
}

const BlackButton = ({text, width, onClick}: Props) => {
  return (
    <Button variant='contained' onClick={onClick} sx={{
        backgroundColor: "#2c2c2c",
        borderRadius:'10px',
        color:'gray',
        fontSize:'15px',
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