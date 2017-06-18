chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    sendResponse({document: document.documentElement.innerHTML});
});
