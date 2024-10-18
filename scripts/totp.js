function getTimeLeft(expiry) {
    let epoch = Math.round(Date.now() / 1000.0); // Current time in seconds
    let timeElapsed = epoch % expiry; // Time passed in the current interval
    return expiry - timeElapsed; // Time remaining until the next interval
}

function getTOTP(secret, expiry, length, foo) {
    crypto.subtle
        .importKey("raw", Base32ToUint8Array(secret), {name: "HMAC", hash: "SHA-1"}, false, ["sign"])
        .then(function (key) {
            crypto.subtle
                .sign(
                    {name: "HMAC", hash: "SHA-1"},
                    key,
                    HexToUint8Array("00000000" + Int32ToHex(Date.now() / 1000 / expiry))
                )
                .then(function (temp) {
                    let hex = Uint8ArrayToHex(new Uint8Array(temp));
                    let start = parseInt(hex.slice(-1), 16);
                    let num = parseInt(hex.slice(start * 2, start * 2 + 8), 16) & 0x7fffffff;
                    let code = num % Math.pow(10, length);
                    foo(("0000000000" + code).slice(-length));
                });
        });
}

function Base32ToUint8Array(base32) {
    let lookUpTable = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
    let binary = "";
    let array = [];
    base32
        .toUpperCase()
        .split("")
        .forEach((char) => {
            binary += lookUpTable.indexOf(char).toString(2).padStart(5, "0");
        });
    for (let i = 0; i < binary.length; i += 8) {
        array.push(parseInt(binary.slice(i, i + 8), 2));
    }
    return Uint8Array.from(array);
}

function HexToUint8Array(hex) {
    let array = [];
    for (let c = 0; c < hex.length; c += 2) array.push(parseInt(hex.slice(c, c + 2), 16));
    return Uint8Array.from(array);
}

function Uint8ArrayToHex(array) {
    let hex = [];
    for (let i = 0; i < array.length; i++) {
        let current = array[i] < 0 ? array[i] + 256 : array[i];
        hex.push((current >>> 4).toString(16));
        hex.push((current & 0xf).toString(16));
    }
    return hex.join("");
}

function Int32ToHex(int32) {
    return ("00000000" + Math.floor(Math.abs(int32)).toString(16)).slice(-8);
}
