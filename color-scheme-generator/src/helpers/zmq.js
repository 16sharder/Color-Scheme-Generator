const zmq = "require('0mq')";

async function getDirectory(path) {
    console.log('Connecting to server 1951…');

    //  Socket to talk to server
    const sock = new zmq.Request();
    sock.connect('tcp://localhost:1951');

    console.log(`Sending Path ${path}`);
    await sock.send(path);
    const [result] = await sock.receive();
    console.log('Received ', result.toString());
    return result.toString()
}

export {getDirectory}