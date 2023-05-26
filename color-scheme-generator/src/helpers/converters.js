import retrieve from "./requests"

async function toHex (h, s, b) {
    // converts a value from HSV to hex
    const hsv = [h, s, b, "u"]
    const rgb = await retrieve(JSON.stringify(hsv), 7170)
    const hex = convertHex(rgb)
    return hex
}

function convertHex (color) {
    // converts a value from RGB to hex
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
    // converts a number from 0 to 15 to a hex string
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


function switchColors (num, idx, current) {
    // takes two color indexes, and switches the two colors
    // performs the switch for the hexs, rgbs, hsvs, and indexes list
    let temp = current.hexs[idx]
    current.hexs[idx] = current.hexs[num]
    current.hexs[num] = temp

    temp = current.rgbs[idx]
    current.rgbs[idx] = current.rgbs[num]
    current.rgbs[num] = temp

    temp = current.hsvs[idx]
    current.hsvs[idx] = current.hsvs[num]
    current.hsvs[num] = temp

    temp = current.idxs[idx]
    current.idxs[idx] = current.idxs[num]
    current.idxs[num] = temp

    return current
}



export {convertHex, switchColors, toHex}
