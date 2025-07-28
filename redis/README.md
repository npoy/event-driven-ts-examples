# Redis Pub/Sub Example

This project demonstrates a basic implementation of the publish-subscribe pattern using Redis. It shows how to build real-time event communication between different components of an application.

## What This Example Shows

- **Publisher**: Publishes user creation events to a Redis channel
- **Subscriber**: Listens for events on the channel and processes them in real-time
- **Event Structure**: JSON-based event format with type and payload
- **Docker Setup**: Complete containerized environment with Redis

## Architecture

```
Publisher → Redis Channel → Subscriber
```

The publisher sends events to a Redis channel (`user-events`), and any subscribers listening to that channel receive the events immediately.

## Running the Example

### Option 1: Full Docker Setup
```bash
npm run start
```
This starts Redis and both publisher/subscriber services in containers.

### Option 2: Manual Steps
```bash
# Start Redis
npm run start:redis

# In one terminal - start subscriber
npm run sub

# In another terminal - publish an event
npm run pub
```

## Key Features

- **Real-time Communication**: Events are delivered immediately
- **Loose Coupling**: Publishers don't need to know about subscribers
- **Simple Event Format**: JSON-based user events
- **Docker Integration**: Production-ready containerization

## Event Format

```typescript
{
  type: 'user.created',
  payload: {
    id: '1',
    username: 'nickop',
    instagram: 'bizrgames',
    createdAt: '2024-01-15T10:30:00.000Z'
  }
}
```

## Use Cases

This pattern is ideal for:
- Real-time notifications
- Live updates in web applications
- Event broadcasting to multiple services
- Simple microservices communication
