import React, { useState } from 'react'
import './index.css'
import Button from '@mui/material/Button';


const Popup = () => {
  const [received, setReceived] = useState<any>(null)
  const onSend = async () => {
    chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
      console.log("response is ",response);
      setReceived(response.message)
    });
  }

  return (
    <div className="container">
      <Button variant="contained" onClick={onSend}>Send Message</Button>
      <div>Received Message is : {received}</div>
    </div>
  )
}

export default Popup