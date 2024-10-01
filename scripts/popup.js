document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("autoLoginInfo").addEventListener("click", autoLoginInfo);
});

document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("auto2FA").addEventListener("click", auto2FA);
});

document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("usernameAndPasswordUpload").addEventListener("click", usernameAndPasswordUpload);
});

document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("secretUpload").addEventListener("click", secretUpload);
});

function autoLoginInfo() {
  chrome.storage.local.set({'autoLoginInfo' : document.getElementById('autoLoginInfo').checked});
}

function auto2FA() {
  chrome.storage.local.set({'auto2FA' : document.getElementById('auto2FA').checked});
}

function usernameAndPasswordUpload() {
  chrome.storage.local.set({'username' : document.getElementById('usernameInput').value});
  chrome.storage.local.set({'password' : document.getElementById('passwordInput').value});
}

function secretUpload() {
  chrome.storage.local.set({'secret' : document.getElementById('secretInput').value});
}

window.onload = function() {
  chrome.storage.local.get(["autoLoginInfo", "auto2FA", "username", "password", "secret"], function(data) {
    console.log(data);
    if(data.autoLoginInfo != null)
      document.getElementById('autoLoginInfo').checked = data.autoLoginInfo;
    if(data.auto2FA != null)
      document.getElementById('auto2FA').checked = data.auto2FA;
    if(data.username != null)
      document.getElementById('usernameInput').value = data.username;
    if(data.password != null)
      document.getElementById('passwordInput').value = data.password;
    if(data.secret != null)
      document.getElementById('secretInput').value = data.secret;

    // totp
    var totp = new jsOTP.totp();
    var timeCode = totp.getOtp(data.secret);
    document.getElementById('totpCode').textContent = timeCode;
  });
}