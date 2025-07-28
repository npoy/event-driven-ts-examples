# Event-Driven TypeScript Examples

This repository contains practical examples of event-driven architecture patterns implemented in TypeScript.

## Projects Overview

### 1. Redis Pub/Sub (`/redis`)
A simple implementation of the publish-subscribe pattern using Redis. This example shows basic real-time event communication between components.

**Key concepts demonstrated:**
- Basic publisher-subscriber pattern
- Real-time event broadcasting
- Simple event structure and handling

### 2. BullMQ Queue System (`/bullmq`)
A job queue implementation using BullMQ that provides robust background processing with retry mechanisms and error handling.

**Key concepts demonstrated:**
- Job queue management
- Automatic retry with exponential backoff
- Job failure handling and monitoring
- Worker concurrency control
- Job state tracking (completed, failed, stalled)

## Getting Started

Each project is self-contained with its own Docker setup. Navigate to any project directory and run:

```bash
npm run start
```

This will start the required Redis instance and build the TypeScript applications in Docker containers.

## Architecture Patterns Covered

- **Pub/Sub Pattern**: Loose coupling between publishers and subscribers
- **Queue Pattern**: Reliable message processing with persistence
- **Event-Driven Architecture**: Asynchronous communication between services
- **Retry Strategies**: Handling failures gracefully with backoff policies
- **Worker Patterns**: Concurrent job processing

## Prerequisites

- Docker and Docker Compose
- Node.js (for local development)