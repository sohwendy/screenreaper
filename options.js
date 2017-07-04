// Saves options to chrome.storage
function save_options() {
  var save_html = document.getElementById('save_html').checked;
  var save_screenshot = document.getElementById('save_screenshot').checked;
  var save_mhtml = document.getElementById('save_mhtml').checked;

  console.log(save_html, save_mhtml, save_screenshot)

  chrome.storage.sync.set({
    save_html: save_html,
    save_screenshot: save_screenshot,
    save_mhtml: save_mhtml
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

function restore_options() {
  chrome.storage.sync.get({
    save_html: true,
    save_screenshot: true,
    save_mhtml: false
  }, function(items) {
    document.getElementById('save_html').checked = items.save_html;
    document.getElementById('save_screenshot').checked = items.save_screenshot;
    document.getElementById('save_mhtml').checked = items.save_mhtml;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save_html').addEventListener('change', save_options);
document.getElementById('save_screenshot').addEventListener('change', save_options);
document.getElementById('save_mhtml').addEventListener('change', save_options);