# Disclaimer❗

This browser extension is **NOT** secure. It stores your username (optional), password (optional), and secret as plain text.

# Purpose

This extension saves users time (while sacrificing some security) when logging in to the Kaunas University of Technology's Academic Information System. It does this by automatically inputting a 6-digit 2FA One-Time Password on the login page and pressing the "Sign In" button.

# How It Works

1. **First-time setup**: The user provides the extension with their secret, which is obtained from the KTU 2FA setup page.
2. The extension stores the secret in the browser's local storage.
3. Whenever the login page is visited, the extension:
    1. Retrieves the secret from the browser's local storage.
    2. Generates a 2FA code using the **totp.js** script.
    3. Presses the "Sign In" button.

The user can also optionally provide their username and password. When the login page is visited, the extension will automatically input the username and password, submit the form, generate the TOTP, input it, and press the "Sign In" button.

# Tutorial

### Installing

For Chrome:
* Download the source code from this repo.
* Unzip the downloaded source code.
* Open extension settings by visiting this URL: `chrome://extensions/` or by clicking on the extension button in the upper-right corner and pressing 'Manage extensions'.
* Enable 'Developer mode' in the upper-right corner of the page.
* New buttons should appear called 'Load unpacked', 'Pack extension', and 'Update'.
* Press 'Load unpacked'.
* Select the unzipped folder (the folder should contain files such as 'manifest.json' and 'main.html', not just another folder).
* For easy access, pin the extension to the extension quick bar.

For Firefox:  
TBD

### First-time setup

* Visit the KTU AIS page, input your username and password, and press 'Prisijungti' ('Login').
* When the page asks for your 'App code', press 'konfigūruoti programėlę' ('Configure app').
* Input the SMS code and press 'Patvirtinti' ('Confirm').
* When a QR code appears, zoom in to around 400% until you can see a red message: 'Rekomenduojame atidaryti prisijungimo puslapį naudojant kompiuterio naršyklę...' ('We recommend opening the login page using a computer browser...').
* Copy the 32-character code labeled 'secret' to your clipboard.
* Open the extension by clicking the icon in the quick bar, or by pressing the button that opens the list of all extensions and selecting this extension.
* In the extension window, paste the secret into the textbox labeled 'Secret' and press 'Save secret from textbox'.
* Toggle the switch labeled 'Autoinput 2FA code'.

You can also:
* Input your username and password, then press 'Save username and password'.
* Toggle the switch labeled 'Autoinput login info'.

This will automatically input your username and password, press the login button, then input the 2FA code and press the login button again.

❗Disclaimer - This is very unsafe and we don't recommend using this feature.❗
