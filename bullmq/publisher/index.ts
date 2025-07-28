import { Queue } from 'bullmq';
import IORedis from 'ioredis';

const connection = new IORedis(process.env.REDIS_URL || 'redis://localhost:6379');
const queue = new Queue('user-events', { connection });

const event = {
  type: 'user.created',
  payload: {
    id: '1',
    username: 'nickop',
    instagram: 'bizrgames',
    createdAt: new Date().toISOString()
  }
};

async function publish() {
  console.log(`${new Date().toISOString()} - Publishing job...`);
  await queue.add('user-created', event);
  console.log(`${new Date().toISOString()} - Job published:`, event);
  await queue.close();
  await connection.quit();
}

publish();
