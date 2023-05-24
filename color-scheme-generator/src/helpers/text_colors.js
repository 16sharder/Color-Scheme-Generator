function determineText (hsvs) {
    // determines if color's stat text should be white or black
    let btext = []
    for (let hsv of hsvs){
        if (210 < hsv[0] && hsv[0] < 290 && hsv[1] > 65) btext.push("white")
        else if (hsv[2] > 65) btext.push("black")
        else btext.push("white")
    }
    return btext
}

function setTextType (vis, hexvals, btext, swtch=false) {
    if (swtch) {
        if (vis == "Show") return ["Hide", btext]
        else if (vis == "Hide") return ["Show", hexvals]
    }
    else {
        if (vis == "Show") return [vis, hexvals]
        else if (vis == "Hide") return [vis, btext]
    }
}

export { determineText, setTextType }