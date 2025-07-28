import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

const event = {
  type: 'user.created',
  payload: {
    id: '1',
    username: 'nickop',
    instagram: 'bizrgames',
    createdAt: new Date().toISOString()
  }
};

console.log(`${new Date().toISOString()} - Publishing event...`);
redis.publish('user-events', JSON.stringify(event))
  .then(() => {
    console.log(`${new Date().toISOString()} - Published event:`, event);
    redis.quit();
  });
