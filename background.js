var options = { };

chrome.storage.sync.get({
  save_html: true,
  save_screenshot: true,
  save_mhtml: false
}, function(items) {
 options = items;
});

chrome.storage.onChanged.addListener(function(changes, namespace) {
  for (key in changes) {
    var storageChange = changes[key];
    options[key] = changes[key].newValue;
  }
});

chrome.browserAction.onClicked.addListener(function(tab) {
  pageName = getTimestamp();

  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    //download as html
    if (options['save_html']) {
      chrome.tabs.sendMessage(tabs[0].id, {}, function(response) {
        let doc = response.document;
        let blob = new Blob([doc], {type: "text/plain;charset=utf-8"});

        chrome.downloads.download({
          url: URL.createObjectURL(blob, { oneTimeOnly: true }),
          filename: `${pageName}.html`,
        });
      });
    }

    //download as mhtml
    if (options['save_mhtml']) {
      chrome.pageCapture.saveAsMHTML({
        tabId: tabs[0].id
       }, function(html) {
        var url = URL.createObjectURL(html, { oneTimeOnly: true });
        chrome.downloads.download({
          url: url,
          filename: `${pageName}.mhtml`
        });
      });
    }
  });

  //capture visible area
  if (options['save_screenshot']) {
    chrome.tabs.captureVisibleTab({
       format : "png"
    }, function(screenshot) {
        chrome.downloads.download({
        url: screenshot,
        filename: `${pageName}.png`
      });
    });
  }
});