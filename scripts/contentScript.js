(() => {
    chrome.runtime.onMessage.addListener((obj, sender, response) => {
        const {message, login_stage, username, password, code, waiting} = obj;
        if (message === "background_to_content") {
            if (login_stage === 1) {
                document.getElementById("username").value = username;
                document.getElementById("password").value = password;
                document.querySelector("button[id='submit_button']").click();
            } else if (login_stage === 2) {
                if (waiting) {
                    var nIntervId = setInterval(function () {
                        var timeLeft = 30 - Math.round((Date.now() / 1000) % 30);
                        document.getElementById("otpHint").value = "Waiting: " + timeLeft;
                        if (timeLeft <= 1) clearInterval(nIntervId);
                    }, 1000);
                } else {
                    document.getElementById("otpHint").value = code;
                    document.querySelector("input[id='submitButton']").click();
                }
            }
        }
    });
})();
