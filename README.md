# Disclaimer❗

This browser extension is **NOT** secure. It stores your username (optional), password (optional), and secret as plain text.

# Purpose

This extension saves users time (while sacrificing some security) when logging in to the Kaunas University of Technology's Academic Information System. It does this by automatically inputting a 6-digit 2FA One-Time Password on the login page and pressing the "Sign In" button.

# How It Works

1. **First-time setup**: The user provides the extension with their secret, which is obtained from the KTU 2FA setup page.
2. The extension stores the secret in the browser's local storage.
3. Whenever the login page is visited, the extension:
   1. Retrieves the secret from the browser's local storage.
   2. Generates a 2FA code using the **jiangts/JS-OTP** library.
   3. Presses the "Sign In" button.

The user can also optionally provide their username and password. When the login page is visited, the extension will automatically input the username and password, submit the form, generate the TOTP, input it, and press the "Sign In" button.

# Tutorial
