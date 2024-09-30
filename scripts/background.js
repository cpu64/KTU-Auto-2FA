if( 'function' === typeof importScripts) {
  importScripts('../libraries/JS-OTP/dist/jsOTP.js');
  var last_login1 = 0;
  var last_login2 = 0;

  chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
    globalTabId = tabId;

      if (changeInfo.status == 'complete') {
        if (Date.now() - last_login1 > 1000 && tab.url && tab.url.includes("loginuserpass")) {
          last_login1 = Date.now();
          chrome.storage.local.get(["username", "password", "autoLoginInfo"], function(login_data) {
            if(login_data.autoLoginInfo)
            {
              chrome.tabs.sendMessage(tabId, {
                message: "background_to_content", login_stage: 1, username: login_data.username, password: login_data.password });
              }
            }
          )}
        else if (Date.now() - last_login2 > 1000 && tab.url && tab.url.includes("privacyidea")) {
          last_login2 = Date.now();
          chrome.storage.local.get(["secret", "auto2FA"], function(data) {
            if(data.auto2FA)
            {
              var totp1 = new jsOTP.totp(30, 6);
              if(data.secret != null)
                var code = totp1.getOtp(data.secret);
              chrome.tabs.sendMessage(tabId, { message: "background_to_content", login_stage: 2, code: code });
            }
          });
        }
      }
    })

    // resize window to see secret automatically
}