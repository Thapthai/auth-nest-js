# Docker Setup for Auth NestJS (External Database)

This document explains how to run the Auth NestJS application using Docker with an external database.

## Prerequisites

- Docker
- Docker Compose
- External MySQL database (running on your machine or cloud)

## Quick Start

### 1. Clone and Setup

```bash
git clone <your-repo>
cd auth-nest-js
```

### 2. Environment Configuration

Copy the example environment file and configure it:

```bash
cp env.example .env
```

Edit `.env` file with your actual values:

```env
# Database Configuration (External Database)
DATABASE_URL="mysql://username:password@hostname:3306/database_name"
# Example: DATABASE_URL="mysql://root:mypassword@localhost:3306/auth_nest_db"

# Application Configuration
PORT=3000
NODE_ENV=production

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=1d

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-email-password

# CORS Configuration
CORS_ORIGIN=http://localhost:3005
```

### 3. Run with Docker Compose

#### Production Mode
```bash
docker-compose up -d
```

#### Development Mode (with hot reload)
```bash
docker-compose -f docker-compose.yml -f docker-compose.override.yml up -d
```

### 4. Access the Application

- **API**: http://localhost:3000
- **External Database**: Configured via DATABASE_URL in .env

## Docker Commands

### Build Images
```bash
# Build production image
docker build -t auth-nest-prod .

# Build development image
docker build -f Dockerfile.dev -t auth-nest-dev .
```

### Run Individual Services
```bash
# Run only the app
docker-compose up app

# Run in development mode
docker-compose -f docker-compose.yml -f docker-compose.override.yml up app
```

### View Logs
```bash
# View all logs
docker-compose logs

# View specific service logs
docker-compose logs app

# Follow logs in real-time
docker-compose logs -f app
```

### Stop Services
```bash
# Stop all services
docker-compose down

# Stop and remove volumes
docker-compose down -v
```

### Database Operations
```bash
# Run Prisma migrations
docker-compose exec app npx prisma migrate deploy

# Generate Prisma client
docker-compose exec app npx prisma generate

# Reset database
docker-compose exec app npx prisma migrate reset

# Open Prisma Studio
docker-compose exec app npx prisma studio
```

## Development Workflow

### 1. Start Development Environment
```bash
docker-compose -f docker-compose.yml -f docker-compose.override.yml up -d
```

### 2. Make Code Changes
Your code changes in the `src/` directory will automatically reload thanks to volume mounting.

### 3. Database Migrations
```bash
# Create a new migration
docker-compose exec app npx prisma migrate dev --name your_migration_name

# Apply migrations
docker-compose exec app npx prisma migrate deploy
```

### 4. View Prisma Studio
```bash
docker-compose exec app npx prisma studio
```

## Production Deployment

### 1. Build Production Image
```bash
docker build -t auth-nest-prod .
```

### 2. Run Production Stack
```bash
docker-compose up -d
```

### 3. Environment Variables for Production
Make sure to set proper environment variables for production:

- Strong JWT secret
- Proper email configuration
- Secure database credentials
- HTTPS configuration

## External Database Setup

### Requirements
- MySQL 8.0 or higher
- Database accessible from Docker containers
- Proper user permissions

### Database Configuration
```sql
-- Create database
CREATE DATABASE auth_nest_db;

-- Create user (optional)
CREATE USER 'nestuser'@'%' IDENTIFIED BY 'nestpassword';
GRANT ALL PRIVILEGES ON auth_nest_db.* TO 'nestuser'@'%';
FLUSH PRIVILEGES;
```

### Connection String Format
```
DATABASE_URL="mysql://username:password@hostname:port/database_name"
```

Examples:
- Local MySQL: `mysql://root:password@localhost:3306/auth_nest_db`
- Cloud MySQL: `mysql://user:pass@mysql.example.com:3306/auth_nest_db`
- Docker host: `mysql://user:pass@host.docker.internal:3306/auth_nest_db`

## Troubleshooting

### Common Issues

1. **Port Already in Use**
   ```bash
   # Check what's using the port
   lsof -i :3000
   
   # Kill the process or change ports in docker-compose.yml
   ```

2. **Database Connection Issues**
   ```bash
   # Test database connection
   make test-db
   
   # Check if database is accessible from Docker
   docker run --rm mysql:8.0 mysql -h your-host -P 3306 -u your-user -p your-password -e "SELECT 1;"
   ```

3. **Permission Issues**
   ```bash
   # Fix file permissions
   sudo chown -R $USER:$USER .
   ```

4. **Prisma Issues**
   ```bash
   # Regenerate Prisma client
   docker-compose exec app npx prisma generate
   
   # Reset database
   docker-compose exec app npx prisma migrate reset
   ```

5. **External Database Not Accessible**
   ```bash
   # For local MySQL, make sure it's accessible from Docker
   # Edit MySQL configuration to bind to 0.0.0.0 instead of 127.0.0.1
   # Or use host.docker.internal for Docker Desktop
   ```

### Reset Everything
```bash
# Stop all containers and remove volumes
docker-compose down -v

# Remove all images
docker rmi $(docker images -q)

# Start fresh
docker-compose up -d
```

## File Structure

```
auth-nest-js/
├── Dockerfile              # Production Docker image
├── Dockerfile.dev          # Development Docker image
├── docker-compose.yml      # Main Docker Compose configuration
├── docker-compose.override.yml # Development overrides
├── .dockerignore           # Files to exclude from Docker build
├── env.example             # Environment variables template
└── README-Docker.md        # This file
```

## Security Notes

1. **Never commit `.env` files** - They contain sensitive information
2. **Use strong passwords** for database and JWT secrets
3. **Enable HTTPS** in production
4. **Regularly update** Docker images and dependencies
5. **Use secrets management** for production deployments
6. **Secure external database** with proper firewall rules

## Performance Optimization

1. **Use multi-stage builds** (already implemented)
2. **Optimize Docker layers** by grouping related commands
3. **Use `.dockerignore`** to exclude unnecessary files
4. **Consider using Alpine Linux** for smaller images
5. **Use volume mounts** for development to avoid rebuilding

## Monitoring

### Health Checks
The application includes basic health checks to ensure it's running properly.

### Logs
```bash
# View application logs
docker-compose logs app

# Follow logs in real-time
docker-compose logs -f
```

### Resource Usage
```bash
# Check container resource usage
docker stats

# Check disk usage
docker system df
```

## Database Management

### Using External Database Tools
Since we're using an external database, you can use your preferred database management tools:

- **MySQL Workbench**
- **phpMyAdmin**
- **DBeaver**
- **Command line**: `mysql -u username -p -h hostname database_name`

### Prisma Studio
Access Prisma Studio through Docker:
```bash
docker-compose exec app npx prisma studio
```

### Migrations
```bash
# Create new migration
docker-compose exec app npx prisma migrate dev --name migration_name

# Apply migrations
docker-compose exec app npx prisma migrate deploy

# Reset database
docker-compose exec app npx prisma migrate reset
``` 