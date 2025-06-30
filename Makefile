# Makefile for Auth NestJS Docker Management (External Database)

.PHONY: help build up down logs clean dev prod migrate studio shell db-shell test-db

# Default target
help:
	@echo "🚀 Auth NestJS Docker Management (External Database)"
	@echo ""
	@echo "Available commands:"
	@echo "  make build     - Build Docker images"
	@echo "  make up        - Start production environment"
	@echo "  make down      - Stop all containers"
	@echo "  make logs      - View application logs"
	@echo "  make clean     - Stop containers and remove volumes"
	@echo "  make dev       - Start development environment with hot reload"
	@echo "  make prod      - Start production environment"
	@echo "  make migrate   - Run database migrations"
	@echo "  make studio    - Open Prisma Studio"
	@echo "  make shell     - Access application container shell"
	@echo "  make status    - Show container status"
	@echo "  make restart   - Restart all services"
	@echo "  make rebuild   - Rebuild and restart services"
	@echo "  make test-db   - Test database connection"

# Build Docker images
build:
	@echo "🔨 Building Docker images..."
	docker-compose build

# Start production environment
up:
	@echo "🚀 Starting production environment..."
	docker-compose up -d

# Stop all containers
down:
	@echo "🛑 Stopping all containers..."
	docker-compose down

# View application logs
logs:
	@echo "📋 Viewing application logs..."
	docker-compose logs -f app

# View all logs
logs-all:
	@echo "📋 Viewing all logs..."
	docker-compose logs -f

# Clean up (stop containers and remove volumes)
clean:
	@echo "🧹 Cleaning up containers and volumes..."
	docker-compose down -v

# Start development environment
dev:
	@echo "🔧 Starting development environment..."
	./scripts/docker-dev.sh

# Start production environment
prod:
	@echo "🚀 Starting production environment..."
	./scripts/docker-setup.sh

# Run database migrations
migrate:
	@echo "🗄️  Running database migrations..."
	docker-compose exec app npx prisma migrate deploy

# Create new migration
migrate-dev:
	@echo "🗄️  Creating new migration..."
	@read -p "Enter migration name: " name; \
	docker-compose exec app npx prisma migrate dev --name $$name

# Open Prisma Studio
studio:
	@echo "🔍 Opening Prisma Studio..."
	docker-compose exec app npx prisma studio

# Access application container shell
shell:
	@echo "🐚 Accessing application container shell..."
	docker-compose exec app sh

# Test database connection
test-db:
	@echo "🧪 Testing database connection..."
	@if [ ! -f .env ]; then \
		echo "❌ .env file not found. Please create it first."; \
		exit 1; \
	fi
	@DATABASE_URL=$$(grep "DATABASE_URL=" .env | cut -d '=' -f2 | tr -d '"'); \
	if [ -z "$$DATABASE_URL" ]; then \
		echo "❌ DATABASE_URL not found in .env file"; \
		exit 1; \
	fi; \
	echo "✅ DATABASE_URL is configured: $$DATABASE_URL"

# Show container status
status:
	@echo "📊 Container status:"
	docker-compose ps

# Restart all services
restart:
	@echo "🔄 Restarting all services..."
	docker-compose restart

# Rebuild and restart services
rebuild:
	@echo "🔨 Rebuilding and restarting services..."
	docker-compose down
	docker-compose build --no-cache
	docker-compose up -d

# Generate Prisma client
prisma-generate:
	@echo "🔧 Generating Prisma client..."
	docker-compose exec app npx prisma generate

# Reset database
db-reset:
	@echo "🔄 Resetting database..."
	docker-compose exec app npx prisma migrate reset

# Show resource usage
stats:
	@echo "📊 Container resource usage:"
	docker stats

# Show disk usage
disk-usage:
	@echo "💾 Docker disk usage:"
	docker system df

# Clean up unused Docker resources
docker-clean:
	@echo "🧹 Cleaning up unused Docker resources..."
	docker system prune -f

# Full reset (nuclear option)
reset-all:
	@echo "⚠️  WARNING: This will remove ALL containers, images, and volumes!"
	@read -p "Are you sure? Type 'yes' to continue: " confirm; \
	if [ "$$confirm" = "yes" ]; then \
		docker-compose down -v; \
		docker system prune -a -f --volumes; \
		echo "✅ All Docker resources removed"; \
	else \
		echo "❌ Operation cancelled"; \
	fi 