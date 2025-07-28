import { Worker } from 'bullmq';
import IORedis from 'ioredis';

const connection = new IORedis(process.env.REDIS_URL || 'redis://localhost:6379', {
  maxRetriesPerRequest: null, // Required for BullMQ to avoid conflicts with Redis
});

const worker = new Worker(
  'user-events',
  async job => {
    const attempt = job.attemptsMade + 1;
    const maxAttempts = job.opts.attempts || 1;
    console.log(`${new Date().toISOString()} - [${job.name}] Processing attempt ${attempt}/${maxAttempts}:`, job.data, job.attemptsMade);
    
    const shouldFail = Math.random() < 0.7; // Simulate 70% chance of failure
    
    if (shouldFail && attempt < 3) {
      const error = 'Event failed';
      console.log(`${new Date().toISOString()} - [${job.name}] ${error}`);
      throw new Error(error);
    }
    
    console.log(`${new Date().toISOString()} - [${job.name}] Successfully processed user: ${job.data.payload.username}`);
    
    return {
      processedAt: new Date().toISOString(),
      userId: job.data.payload.id,
      status: 'user_created_successfully'
    };
  },
  { 
    connection,
    concurrency: 3,
  }
);

// Event handlers for different job states
worker.on('completed', (job, result) => {
  console.log(`${new Date().toISOString()} - ✅ Job completed:`, {
    jobId: job.id,
    attempts: job.attemptsMade + 1,
    result: result
  });
});

worker.on('failed', (job, err) => {
  if (!job) return;
  
  const maxAttempts = job.opts.attempts || 1;
  const currentAttempt = job.attemptsMade + 1;
  const isLastAttempt = currentAttempt >= maxAttempts;
  
  if (isLastAttempt) {
    console.error(`${new Date().toISOString()} - ❌ Job permanently failed after ${currentAttempt} attempts:`, {
      jobId: job.id,
      error: err.message,
      userData: job.data
    });
  } else {
    const backoff = job.opts.backoff;
    let delayInfo = 'unknown';
    
    if (typeof backoff === 'number') {
      delayInfo = `${backoff}ms`;
    } else if (backoff && typeof backoff === 'object' && 'delay' in backoff) {
      delayInfo = `${backoff.delay}ms`;
    }
    
    console.warn(`${new Date().toISOString()} - ⚠️  Job failed, will retry:`, {
      jobId: job.id,
      attempt: currentAttempt,
      error: err.message,
      nextRetryIn: delayInfo
    });
  }
});

worker.on('stalled', jobId => {
  console.warn(`${new Date().toISOString()} - 🔄 Job stalled:`, jobId);
});

worker.on('progress', (job, progress) => {
  console.log(`${new Date().toISOString()} - 📊 Job progress:`, job.id, `${progress}%`);
});

console.log(`${new Date().toISOString()} - Worker started with retry handling, waiting for jobs...`);
