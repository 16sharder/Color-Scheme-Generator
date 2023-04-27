const zmq = require('zeromq');

async function runClient() {
    console.log('Connecting to server 1951…');

    //  Socket to talk to server
    const sock = new zmq.Request();
    sock.connect('tcp://localhost:1951');

    console.log('Sending Hello ');
    await sock.send('Hello');
    const [result] = await sock.receive();
    console.log('Received ', result.toString());
  
}

runClient();
