function convertHex (color) {
    let hex = "#"
    for (let i in color){
        // converts number to hex and adds to hex val
        const hex2 = color[i] % 16
        const hex1 = (color[i] - hex2) / 16
        hex = hex.concat(nHex(hex1))
        hex = hex.concat(nHex(hex2))
    }
    return hex
}

function nHex (num) {
    // converts a number from 0 to 15 to hex string
    let hex;
    if (num == 10) hex = "A"
    else if (num == 11) hex = "B"
    else if (num == 12) hex = "C"
    else if (num == 13) hex = "D"
    else if (num == 14) hex = "E"
    else if (num == 15) hex = "F"
    else hex = String(num)
    return hex
}

export {convertHex}

