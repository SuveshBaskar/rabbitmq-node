const amqp = require('amqplib');

async function connect() {
  try {
    const connection = await amqp.connect('amqp://localhost:5672');
    const channel = await connection.createChannel();

    channel.consume('jobs', message => {
      const {
        data: { value }
      } = JSON.parse(message.content.toString());
      console.log(`Received Job of the value: ${value}`);
      channel.ack(message);
    });

    console.log('Waiting for messages...');
  } catch (error) {
    console.error(error);
  }
}

connect();
