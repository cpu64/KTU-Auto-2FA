(() => {
    chrome.runtime.onMessage.addListener((obj, sender, response) => {
        const { message, secretScan, login_stage, username, password, code } = obj;
        console.log("caught message");
        if(message === "background_to_content") {
            if (login_stage === 1) {
                document.getElementById('username').value=username;
                document.getElementById('password').value=password;
                document.querySelector("button[id='submit_button']").click();
            } else if (login_stage === 2) {
                document.getElementById('otpHint').value=code;
                document.querySelector("input[id='submitButton']").click();
            }
            // else if (secretScan == 1) {
            //     if(document.getElementsByClassName('text-2xl font-medium font-sans border-b border-neutral-300 border-solid tracking-tight') != null)
            //     {
            //         document.body.style.width = '600px';
            //     }
            // }
        }
    });
})();