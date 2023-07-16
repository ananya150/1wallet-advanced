import React from 'react'
import Button  from '@mui/material/Button'

type Props = {
    text: string;
    width?: string
}

const BlackButton = ({text, width}: Props) => {
  return (
    <Button variant='contained' sx={{
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