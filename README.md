<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository with authentication system, Prisma ORM, and Docker support.

## 🐳 Docker Setup (Recommended)

This project includes full Docker support for easy development and deployment.

### Quick Start with Docker

1. **Clone the repository**
   ```bash
   git clone <your-repo>
   cd auth-nest-js
   ```

2. **Setup environment**
   ```bash
   cp env.example .env
   # Edit .env with your configuration
   ```

3. **Start with Docker**
   ```bash
   # Development mode (with hot reload)
   make dev
   
   # OR Production mode
   make prod
   ```

### Docker Commands

```bash
# View all available commands
make help

# Development
make dev          # Start development environment
make logs         # View application logs
make shell        # Access container shell

# Production
make prod         # Start production environment
make up           # Start services
make down         # Stop services

# Database
make migrate      # Run migrations
make studio       # Open Prisma Studio
make db-shell     # Access MySQL shell

# Maintenance
make clean        # Clean up containers and volumes
make rebuild      # Rebuild and restart
make status       # Show container status
```

### Manual Docker Commands

```bash
# Build images
docker-compose build

# Start services
docker-compose up -d

# Development with hot reload
docker-compose -f docker-compose.yml -f docker-compose.override.yml up -d

# View logs
docker-compose logs -f app

# Stop services
docker-compose down
```

For detailed Docker documentation, see [README-Docker.md](./README-Docker.md).

## 🚀 Local Development Setup

### Prerequisites

- Node.js 18+
- MySQL 8.0+
- npm or yarn

### Project setup

```bash
$ npm install
```

### Environment Configuration

1. Copy the environment template:
   ```bash
   cp env.example .env
   ```

2. Configure your environment variables in `.env`:
   ```env
   DATABASE_URL="mysql://username:password@localhost:3306/database_name"
   JWT_SECRET="your-super-secret-jwt-key"
   EMAIL_HOST="smtp.gmail.com"
   EMAIL_USER="your-email@gmail.com"
   EMAIL_PASS="your-email-password"
   ```

### Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate deploy

# Open Prisma Studio
npx prisma studio
```

### Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## 🧪 Testing

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## 📁 Project Structure

```
auth-nest-js/
├── src/
│   ├── authentication/     # Authentication module
│   ├── users/             # User management
│   ├── departments/       # Department management
│   ├── notifications/     # Notification system
│   ├── prisma/           # Database service
│   └── main.ts           # Application entry point
├── prisma/
│   ├── schema.prisma     # Database schema
│   └── migrations/       # Database migrations
├── docker-compose.yml    # Docker services configuration
├── Dockerfile           # Production Docker image
├── Dockerfile.dev       # Development Docker image
├── Makefile            # Docker management commands
└── scripts/            # Setup and utility scripts
```

## 🔐 Features

- **Authentication System**
  - JWT-based authentication
  - Two-factor authentication (2FA)
  - Email verification
  - Password reset functionality
  - Remember me functionality

- **User Management**
  - User registration and login
  - Role-based permissions
  - User profile management

- **Database**
  - Prisma ORM with MySQL
  - Automatic migrations
  - Type-safe database queries

- **Real-time Features**
  - WebSocket support
  - Real-time notifications

- **Security**
  - Input validation
  - Rate limiting
  - CORS configuration
  - Secure password hashing

## 🚀 Deployment

### Docker Deployment

When you're ready to deploy your NestJS application to production using Docker:

1. **Build production image**
   ```bash
   docker build -t auth-nest-prod .
   ```

2. **Configure production environment**
   - Set proper environment variables
   - Configure SSL/TLS certificates
   - Set up proper database credentials

3. **Deploy with Docker Compose**
   ```bash
   docker-compose up -d
   ```

### Cloud Deployment

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## 📚 Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## 🤝 Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## 📞 Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## 📄 License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
