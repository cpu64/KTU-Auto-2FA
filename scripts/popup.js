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
    if (data.autoLoginInfo != null)
      document.getElementById('autoLoginInfo').checked = data.autoLoginInfo;
    if (data.auto2FA != null)
      document.getElementById('auto2FA').checked = data.auto2FA;
    if (data.username != null)
      document.getElementById('usernameInput').value = data.username;
    if (data.password != null)
      document.getElementById('passwordInput').value = data.password;
    if (data.secret != null)
      document.getElementById('secretInput').value = data.secret;

    // Initialize TOTP
    var totp = new jsOTP.totp();

    // Function to update the TOTP code and time left
    function updateTotp() {
      var timeCode = totp.getOtp(data.secret);
      var timeLeft = totp.getTimeLeft();
      document.getElementById('totpCode').textContent = timeCode;
      document.getElementById('timeLeft').textContent = "Time left: " + timeLeft + "s";
    }

    // Call the function immediately to display the initial code and time left
    updateTotp();

    // Update every second
    setInterval(function() {
      updateTotp();
    }, 1000); // 1000ms = 1 second
  });
}


const showPassword = document.getElementById('togglePassword');
let passwordInput = document.getElementById('passwordInput');

showPassword.addEventListener('click', function() {
  if(passwordInput.type === "password") {
    passwordInput.type = "text";
    showPassword.classList.add("eye");
    showPassword.classList.remove("eye-slash");
  }
  else {
    passwordInput.type = "password";
    showPassword.classList.add("eye-slash");
    showPassword.classList.remove("eye");
  }
});

const showSecret = document.getElementById('toggleSecret');
let secretInput = document.getElementById('secretInput');

showSecret.addEventListener('click', function() {
  if(secretInput.type === "password") {
    secretInput.type = "text";
    showSecret.classList.add("eye");
    showSecret.classList.remove("eye-slash");
  }
  else {
    secretInput.type = "password";
    showSecret.classList.add("eye-slash");
    showSecret.classList.remove("eye");
  }
});