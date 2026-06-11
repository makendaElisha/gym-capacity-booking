# Gym Crowding Platform

<img width="400" height="427" alt="booking-test" src="https://github.com/user-attachments/assets/233d49ec-63de-4b25-a9c7-09d146fa27e0" />

This repository contains three main projects:

- `api/` — Fastify backend API for gym capacity and booking
- `gym-app/` — Expo React Native mobile app
- `infra/` — AWS CDK infrastructure for deploying the API

## How to run

### Backend

```bash
cd api
npm install
npm run dev
```

### Mobile app

```bash
cd gym-app
npm install
npm start
```

#### Configuring the local API port

To change the local port that the mobile app uses to connect to the API, edit `gym-app/src/services/api.ts` and update the `baseURL`:

```typescript
const baseURL = 'http://localhost:3000'; // Change 3000 to your desired API port
```

### Infrastructure

```bash
cd infra
npm install
npx cdk synth
npx cdk deploy --require-approval never
```

## Architecture decisions

### Backend

- The API uses Fastify with TypeScript and a repository layer:
  - `GymController` handles request/response
  - `BookingService` encapsulates booking rules
  - `IGymRepository` interface defines the data contract
  - `MockRepository implements IGymRepository` simulates reservation operation
  
#### Repository Pattern & Swapping Implementations

The booking logic is abstracted behind the `IGymRepository` interface. Currently using `MockRepository`, but you can swap it for real database implementations:

```typescript
// Current: MockRepository
MockRepository implements IGymRepository

// Production alternatives:
DynamoRepository implements IGymRepository
PostgresRepository implements IGymRepository
MongoRepository implements IGymRepository
```

Simply update the repository injection in `BookingService` to use your chosen implementation.

#### Atomic Operations

The booking pipeline avoids race conditions by performing the slot reservation atomically:

**General transaction pattern:**
```
transaction {
    if(currentBookings < capacity) {
        increment currentBookings
    } else {
        abort
    }
}
```

**If using DynamoDB:**
```
ConditionExpression: currentBookings < :capacity

atomic write with condition check
```

Lock row and perform conditional update atomically.

**If using PostgreSQL:**
```
SELECT ... FROM bookings
FOR UPDATE

atomic read-lock + increment
```

Lock row for update, then perform increment in same transaction.

### Mobile App

- Implemented with Expo and React Native
- `GymScreen` exposes a reusable live capacity display and booking state handling
- Loading, success, and error states are surfaced clearly
- The component uses strict TypeScript types for better maintainability

### Infrastructure

- AWS CDK defines a single plain Lambda function and an API Gateway REST API
- `infra/lambda/index.ts` wraps the Fastify app for Lambda with `@fastify/aws-lambda`
- The CDK stack outputs the deployed API endpoint URL

## Trade-offs

- The `MockRepository` implements the `IGymRepository` interface with an in-memory atomic operation pattern, but is not a real database.
- For production, swap `MockRepository` for a real implementation (`DynamoRepository`, `PostgresRepository`, `MongoRepository`) that uses actual database transactions.
- Real database implementations should use atomic operations:
  - **DynamoDB**: Use `ConditionExpression` to perform conditional writes atomically
  - **PostgreSQL**: Use `SELECT ... FOR UPDATE` to lock rows during transactions
  - **MongoDB**: Use transactions or optimistic locking patterns
- The current mobile app uses a single hardcoded gym and slot; a more complete version would allow selecting gyms/slots and user identity.

## What is missing / next improvements

- Add persistence with a real database and atomic reservation transactions
- Add user authentication and slot selection UI
- Add caching for `GET /capacity` using Redis or ElastiCache
- Add more end-to-end tests for API and app integration

## Bonus design note: AWS ElastiCache

To optimize `GET /capacity` for a global user base, cache capacity values in Redis via ElastiCache.
- Write-through cache on booking updates
- Read-through cache on capacity queries
- Serve regional reads from global caches
- Use TTLs to keep capacity roughly fresh while avoiding hot-spot traffic on the source database
