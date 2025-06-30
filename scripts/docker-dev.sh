#!/bin/bash

# Docker Development Script for Auth NestJS (External Database)
# This script helps run the application in development mode with hot reload

set -e

echo "🔧 Starting development environment for Auth NestJS with external database..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Docker is installed
check_docker() {
    if ! command -v docker &> /dev/null; then
        print_error "Docker is not installed. Please install Docker first."
        exit 1
    fi
    
    if ! command -v docker-compose &> /dev/null; then
        print_error "Docker Compose is not installed. Please install Docker Compose first."
        exit 1
    fi
    
    print_success "Docker and Docker Compose are installed"
}

# Check if .env file exists and has DATABASE_URL
check_env() {
    if [ ! -f .env ]; then
        print_warning ".env file not found. Creating from template..."
        if [ -f env.example ]; then
            cp env.example .env
            print_warning "Please edit .env file with your actual configuration values"
            print_warning "Make sure to set DATABASE_URL to your external database"
        else
            print_error "env.example file not found"
            exit 1
        fi
    fi
    
    # Check if DATABASE_URL is set
    if ! grep -q "DATABASE_URL=" .env || grep -q "DATABASE_URL=\"mysql://username:password@hostname:3306/database_name\"" .env; then
        print_error "Please configure DATABASE_URL in your .env file"
        print_status "Example: DATABASE_URL=\"mysql://root:mypassword@localhost:3306/auth_nest_db\""
        exit 1
    fi
    
    print_success "DATABASE_URL is configured"
}

# Stop existing containers
stop_existing() {
    print_status "Stopping existing containers..."
    docker-compose down
    print_success "Existing containers stopped"
}

# Start development environment
start_dev() {
    print_status "Starting development environment with hot reload..."
    docker-compose -f docker-compose.yml -f docker-compose.override.yml up -d
    print_success "Development environment started"
}

# Test database connection
test_database_connection() {
    print_status "Testing database connection..."
    
    # Extract database info from DATABASE_URL
    DATABASE_URL=$(grep "DATABASE_URL=" .env | cut -d '=' -f2 | tr -d '"')
    
    if [ -z "$DATABASE_URL" ]; then
        print_error "DATABASE_URL not found in .env file"
        exit 1
    fi
    
    # Test connection using a temporary container
    if docker run --rm --network auth-nest-js_auth-network mysql:8.0 mysql -h $(echo $DATABASE_URL | sed 's/.*@\([^:]*\).*/\1/') -P $(echo $DATABASE_URL | sed 's/.*:\([0-9]*\)\/.*/\1/') -u $(echo $DATABASE_URL | sed 's/.*:\/\/\([^:]*\):.*/\1/') -p$(echo $DATABASE_URL | sed 's/.*:\([^@]*\)@.*/\1/') -e "SELECT 1;" > /dev/null 2>&1; then
        print_success "Database connection successful"
    else
        print_warning "Could not test database connection from container"
        print_status "Make sure your external database is accessible from Docker"
    fi
}

# Run database migrations
run_migrations() {
    print_status "Running database migrations..."
    docker-compose exec app npx prisma migrate deploy
    print_success "Database migrations completed"
}

# Show status and logs
show_status() {
    print_status "Checking service status..."
    docker-compose ps
    
    echo ""
    print_success "Development environment is ready!"
    echo ""
    echo "📋 Service Information:"
    echo "   API: http://localhost:3000"
    echo "   External Database: Configured via DATABASE_URL"
    echo "   Hot Reload: Enabled"
    echo ""
    echo "🔧 Useful Commands:"
    echo "   View logs: docker-compose logs -f app"
    echo "   View all logs: docker-compose logs -f"
    echo "   Stop services: docker-compose down"
    echo "   Restart app: docker-compose restart app"
    echo "   Run migrations: docker-compose exec app npx prisma migrate dev"
    echo "   Prisma Studio: docker-compose exec app npx prisma studio"
    echo ""
    echo "📝 Development Notes:"
    echo "   - Code changes in src/ will automatically reload"
    echo "   - Database changes require migration: docker-compose exec app npx prisma migrate dev"
    echo "   - Check logs for any errors: docker-compose logs -f app"
    echo ""
}

# Follow logs
follow_logs() {
    print_status "Following application logs (Ctrl+C to stop)..."
    docker-compose logs -f app
}

# Main execution
main() {
    check_docker
    check_env
    stop_existing
    start_dev
    test_database_connection
    run_migrations
    show_status
    
    # Ask if user wants to follow logs
    echo -n "Do you want to follow the application logs? (y/n): "
    read -r follow_logs_choice
    
    if [[ $follow_logs_choice =~ ^[Yy]$ ]]; then
        follow_logs
    fi
}

# Run main function
main "$@" 
 