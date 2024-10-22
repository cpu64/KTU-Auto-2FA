if ("function" === typeof importScripts) {
    importScripts("totp.js");
}
var last_login1 = 0;
var last_login2 = 0;
var last_code_gen = 0;

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status == "complete") {
        if (
            Date.now() - last_login1 > 1000 &&
            tab.url &&
            tab.url.startsWith("https://login.ktu.lt/simplesaml/module.php/core/loginuserpass")
        ) {
            last_login1 = Date.now();
            chrome.storage.local.get(["username", "password", "autoLoginInfo"], function (login_data) {
                if (login_data.autoLoginInfo) {
                    chrome.tabs.sendMessage(tabId, {
                        message: "background_to_content",
                        login_stage: 1,
                        username: login_data.username,
                        password: login_data.password
                    });
                }
            });
        } else if (
            Date.now() - last_login2 > 1000 &&
            tab.url &&
            tab.url.startsWith("https://login.ktu.lt/simplesaml/module.php/privacyidea/formBuilderMain")
        ) {
            last_login2 = Date.now();
            chrome.storage.local.get(["secret", "auto2FA"], async function (data) {
                if (data.auto2FA) {
                    if (last_code_gen >= Math.floor(Date.now() / 1000 / 30) || getTimeLeft(30) < 2) {
                        chrome.tabs.sendMessage(tabId, {
                            message: "background_to_content",
                            login_stage: 2,
                            waiting: true
                        });
                        await new Promise((r) => setTimeout(r, (getTimeLeft(30) + 1) * 1000));
                    }
                    last_code_gen = Math.floor(Date.now() / 1000 / 30);
                    if (data.secret != null)
                        getTOTP(data.secret, 30, 6, function (code) {
                            chrome.tabs.sendMessage(tabId, {
                                message: "background_to_content",
                                login_stage: 2,
                                code: code
                            });
                        });
                }
            });
        }
    }
});
