alert('This is content script');

async function registerContentScript() {
  console.log("started")  
  await chrome.runtime.sendMessage({ method: "inject script" });
  console.log("ended")
}

registerContentScript();
const currentWindow = window;

window.addEventListener('message', async (event) => {
  const { method, params } = event.data;
  if (!method) {
    console.log("Blocking message")
    return;
  }
  console.log(`Got the request of ${method} in cotent script`)
  
  const resp = await chrome.runtime.sendMessage({ method, params })
  console.log(`Response back from bg script ${resp.result}`)  
  event.source!.postMessage(resp);


});
