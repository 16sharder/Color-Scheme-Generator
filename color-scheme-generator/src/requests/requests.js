// file that includes all requests to the back end

async function postPath (filepath) {
    const response = await fetch("/upload", {
        method: "POST", 
        body: JSON.stringify({filepath: filepath}),
        headers: {"Content-type": "application/json"}
    })
    if (response.status !== 201){
        alert(`Upload image failed. Status code = ${response.status}`)
    }
}



export {postPath}