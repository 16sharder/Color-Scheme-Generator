// Front end file that sends to and receives from the back end controller
// Uses a proxy to connect to Port 1980 to send HTTP requests to the back end

// Takes data and a ZeroMQ port, returns the data from HTTP request
async function retrieve (data, port) {
    // sends the data and ZMQ port as part of HTTP Post request
    const response = await fetch("/retrieve", {
        method: "POST", 
        body: JSON.stringify({request: data, port: port}),
        headers: {"Content-type": "application/json"}
    })
    // Handles if response is a string
    if (response.status == 200){
        const msg = await response.text()
        return msg
    }
    // Sends error alert if the request failed
    else if (response.status !== 201){
        alert(`Request failed. Status code = ${response.status}`)
    // Returns the retreived data if request successful
    } else {
        const data = await response.json()
        return data
    }
}

// Sends data from the uploaded image to the back end
async function postImage (data) {
    const response = await fetch("/image", {
        method: "POST", 
        body: JSON.stringify({request: data}),
        headers: {"Content-type": "application/json"}
    })

    // Returns no real data, just a failure/success message
    if (response.status == 419) return "failed"
    else if (response.status == 413) return "large"
    else return "success"
}

export default retrieve
export {postImage}