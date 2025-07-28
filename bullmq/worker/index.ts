import { Worker } from 'bullmq';
import IORedis from 'ioredis';

const connection = new IORedis(process.env.REDIS_URL || 'redis://localhost:6379', {
  maxRetriesPerRequest: null,
});

const worker = new Worker(
  'user-events',
  async job => {
    console.log(`${new Date().toISOString()} - [${job.name}] Received job:`, job.data);
  },
  { connection }
);

worker.on('completed', job => {
  console.log(`${new Date().toISOString()} - Job completed:`, job.id);
});

worker.on('failed', (job, err) => {
  console.error(`${new Date().toISOString()} - Job failed:`, job?.id, err);
});

console.log(`${new Date().toISOString()} - Worker started, waiting for jobs...`);
