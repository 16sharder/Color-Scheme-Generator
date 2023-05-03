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
    // Sends error alert if the request failed
    if (response.status !== 201){
        alert(`Request failed. Status code = ${response.status}`)
    // Returns the retreived data if request successful
    } else {
        const data = await response.json()
        return data
    }
}

export default retrieve