const amqp = require('amqplib');

const message = {
  success: true,
  data: {
    value: new Date().toISOString()
  }
};

async function connect() {
  try {
    const connection = await amqp.connect('amqp://localhost:5672');
    const channel = await connection.createChannel();
    const checkQueue = await channel.assertQueue('jobs');
    channel.sendToQueue('jobs',Buffer.from(JSON.stringify(message)));
    console.log('Job sent to Queue')
  } catch (error) {
    console.error(error);
  }
}

connect();
