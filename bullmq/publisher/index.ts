import { Queue } from 'bullmq';
import IORedis from 'ioredis';

const connection = new IORedis(process.env.REDIS_URL || 'redis://localhost:6379', {
  maxRetriesPerRequest: null, // Required for BullMQ
});

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
  
  await queue.add('user-created', event, {
    attempts: 3,
    backoff: {
      type: 'exponential', // E.g. 1s, 2s, 4s, 8s, 16s
      delay: 2000,
    },
    removeOnComplete: 10, // Keep last 10 completed jobs (optional)
    removeOnFail: 50,     // Keep last 50 failed jobs (optional)
    jobId: `user-created-${Date.now()}`, // Custom job ID
  });
  
  console.log(`${new Date().toISOString()} - Job published with retry config:`, event);
  await queue.close();
  await connection.quit();
}

publish().catch(console.error);
