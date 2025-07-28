import Redis from 'ioredis';

const sub = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

sub.subscribe('user-events', (err, count) => {
  if (err) {
    console.error('Failed to subscribe:', err);
    return;
  }
  console.log(`${new Date().toISOString()} - Subscribed to ${count} channel(s). Waiting for messages...`);
});

sub.on('message', (channel: string, message: string) => {
  const event = JSON.parse(message);
  console.log(`${new Date().toISOString()} - [${channel}] Received event:`, event);
});
