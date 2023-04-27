var ampq = require('amqplib/callback_api')

function sendMessage (message) {
    ampq.connect('amqp://localhost', function(error0, connection) {
        if (error0) {
            throw error0
        }
        connection.createChannel(function(error1, channel) {
            if (error1) {
                throw error1
            }
            var queue = "jsend"

            channel.assertQueue(queue, {
                durable: false
            })

            channel.sendToQueue(queue, Buffer.from(message))
            console.log(`Sent ${message}`)
        })
    })
}

export { sendMessage }