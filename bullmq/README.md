# BullMQ Queue Example

This project demonstrates a job queue processing using BullMQ. It shows how to build robust background processing systems with retry mechanisms, failure handling, and job monitoring.

## What This Example Shows

- **Publisher**: Adds jobs to a queue with retry configuration
- **Worker**: Processes jobs with simulated failures and automatic retries
- **Retry Logic**: Exponential backoff strategy for failed jobs
- **Job Monitoring**: Comprehensive logging of job states and progress
- **Error Handling**: Graceful failure recovery with configurable attempts

## Architecture

```
Publisher → BullMQ Queue → Worker Pool
                ↓
            Job States: pending → active → completed/failed
```

Jobs are queued by publishers and processed by workers. Failed jobs are automatically retried with exponential backoff until success or maximum attempts reached.

## Running the Example

### Option 1: Full Docker Setup
```bash
npm run start
```
This starts Redis, publisher, and worker services in containers.

### Option 2: Manual Steps
```bash
# Start Redis
npm run start:redis

# In one terminal - start worker
npm run worker

# In another terminal - publish a job
npm run pub
```

## Key Features

- **Retry Strategy**: Jobs retry up to 3 times with exponential backoff
- **Failure Simulation**: 70% chance of failure to demonstrate retry behavior
- **Job Persistence**: Jobs are stored in Redis for reliability
- **Concurrency Control**: Worker processes up to 3 jobs simultaneously
- **Job Cleanup**: Automatic removal of old completed/failed jobs
- **Comprehensive Monitoring**: Detailed logging of all job states

## Job Configuration

```typescript
{
  attempts: 3,
  backoff: {
    type: 'exponential',
    delay: 2000, // 2s, 4s, 8s delays
  },
  removeOnComplete: 10, // Keep last 10 completed jobs
  removeOnFail: 50,     // Keep last 50 failed jobs
}
```

## Job States Tracked

- **Completed**: Job finished successfully
- **Failed**: Job failed after all retry attempts
- **Stalled**: Job was picked up but worker became unresponsive
- **Progress**: Real-time job progress updates