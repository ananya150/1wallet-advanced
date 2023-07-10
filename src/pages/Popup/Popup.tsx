import React, { useState } from 'react'
import './index.css'

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
      <button onClick={onSend}>SendMEssage</button>
      <div>Received Message is : {received}</div>
    </div>
  )
}

export default Popup