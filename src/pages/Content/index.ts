async function registerContentScript() {
  await chrome.runtime.sendMessage({ method: "inject script" });
}

registerContentScript();

window.addEventListener('message', async (event) => {
  const { method, params } = event.data;
  if (!method) {
    return;
  }
  
  chrome.runtime.sendMessage({ method, params }, (response) => {
    event.source!.postMessage(response);
  });
  
});
