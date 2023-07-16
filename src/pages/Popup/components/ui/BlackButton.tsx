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
        color:'gray',
        fontSize:'15px',
        width: `${width}`,
        ':hover': {
          bgcolor: '#2f2f2f',
          color:'#fefdf9',
        },      
        }} 
        >
        {text}
      </Button>
  )
}

export default BlackButton