# Microservices Setup Guide

## Environment Configuration

Create a `.env` file in the root directory with the following variables:

```env
# Database Configuration
MONGODB_URI=mongodb://admin:password@mongodb:27017/logic-test?authSource=admin

# JWT Configuration
JWT_KEY=your-secret-jwt-key-here-change-this-in-production

# RabbitMQ Configuration
RMQ_URI=amqp://guest:guest@rabbitmq:5672

# Service Queue Names
RMQ_AUTH_SERVICE_QUEUE=auth_service_queue
RMQ_CLASS_QUEUE=class_queue
RMQ_STUDENT_QUEUE=student_queue
RMQ_GATEWAY_QUEUE=gateway_queue

# Gateway Configuration
GATEWAY_PORT=8000

# Service Ports (if needed for direct access)
AUTH_SERVICE_PORT=3001
CLASS_SERVICE_PORT=3002
STUDENT_SERVICE_PORT=3003
```

## Running the Application

### Using Docker Compose (Recommended)

1. Make sure you have Docker and Docker Compose installed
2. Create the `.env` file as described above
3. Run the following command:

```bash
docker-compose up --build
```

This will start:
- MongoDB (port 27017)
- RabbitMQ (ports 5672, 15672)
- Gateway Service (port 8000)
- Auth Service
- Class Service
- Student Service

### Running Locally

1. Install dependencies:
```bash
npm install
```

2. Start MongoDB and RabbitMQ services
3. Create the `.env` file
4. Build and run services:

```bash
# Build shared library
npx nx build shared

# Run gateway
npx nx serve gateway

# Run auth service
npx nx serve auth-service

# Run class service
npx nx serve class

# Run student service
npx nx serve student
```

## API Documentation

Once the gateway is running, you can access:
- API Documentation: http://localhost:8000/api
- Health Check: http://localhost:8000/health

## Architecture

This microservices application consists of:

1. **Gateway Service**: API Gateway that routes requests to other services
2. **Auth Service**: Handles user authentication and JWT tokens
3. **Class Service**: Manages class/classroom data
4. **Student Service**: Manages student data and relationships with classes
5. **Shared Library**: Common schemas, DTOs, and utilities

## Communication

Services communicate via RabbitMQ message queues. The gateway service acts as the entry point and routes requests to the appropriate microservices.

## Database

MongoDB is used for data persistence. Each service has its own collections but can reference data from other services.

