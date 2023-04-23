// File that includes all requests to the back end

// resets any given file to empty (given file path)
async function resetFile (path) {
    const response = await fetch("/reset", {
        method: "POST", 
        body: JSON.stringify({path: path}),
        headers: {"Content-type": "application/json"}
    })
    if (response.status !== 201){
        alert(`Reset file failed. Status code = ${response.status}`)
    }
    return
}

// places the path for the image on path.txt (for colors)
async function postPath (filepath) {
    const response = await fetch("/write", {
        method: "POST", 
        body: JSON.stringify({path: "../textfiles/path.txt", text: filepath}),
        headers: {"Content-type": "application/json"}
    })
    if (response.status !== 201){
        alert(`Upload image failed. Status code = ${response.status}`)
    }
    return
}

// retrieves the rgb values placed on colors.txt
async function getColors () {
    const response = await fetch("/read", {
        method: "POST", 
        body: JSON.stringify({path: "../textfiles/colors.txt"}),
        headers: {"Content-type": "application/json"}
    })
    if (response.status !== 201){
        alert(`Color retrieval failed. Status code = ${response.status}`)
    } else {
        const data = await response.text()
        return data
    }
}

// places the directory path on getdir.txt, then reads from directory.txt for files in dir
async function getDirectory (path) {
    console.log(path)
    const response = await fetch("/write", {
        method: "POST", 
        body: JSON.stringify({path: "../textfiles/getdir.txt", text: path}),
        headers: {"Content-type": "application/json"}
    })
    if (response.status !== 201){
        alert(`Request directory failed. Status code = ${response.status}`)
    }
    return
}

async function readDirectory () {
    const res = await fetch("/read", {
        method: "POST", 
        body: JSON.stringify({path: "../textfiles/directory.txt"}),
        headers: {"Content-type": "application/json"}
    })
    if (res.status !== 201){
        alert(`Retrieve directory failed. Status code = ${res.status}`)
    } else {
        const data = await res.text()
        return data
    }
}


export {postPath, getColors, resetFile, getDirectory, readDirectory}