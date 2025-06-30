#!/bin/bash

# Docker Test Script for Auth NestJS
# This script tests if the Docker setup is working correctly

set -e

echo "🧪 Testing Docker setup for Auth NestJS..."

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

# Test counter
tests_passed=0
tests_failed=0

# Function to run a test
run_test() {
    local test_name="$1"
    local test_command="$2"
    
    print_status "Running test: $test_name"
    
    if eval "$test_command" > /dev/null 2>&1; then
        print_success "✓ $test_name passed"
        ((tests_passed++))
    else
        print_error "✗ $test_name failed"
        ((tests_failed++))
    fi
}

# Test 1: Check if Docker is installed
test_docker_installation() {
    run_test "Docker installation" "command -v docker"
}

# Test 2: Check if Docker Compose is installed
test_docker_compose_installation() {
    run_test "Docker Compose installation" "command -v docker-compose"
}

# Test 3: Check if Docker daemon is running
test_docker_daemon() {
    run_test "Docker daemon running" "docker info > /dev/null 2>&1"
}

# Test 4: Check if .env file exists
test_env_file() {
    run_test ".env file exists" "[ -f .env ]"
}

# Test 5: Check if Docker images can be built
test_docker_build() {
    run_test "Docker build" "docker-compose build --no-cache > /dev/null 2>&1"
}

# Test 6: Check if services can start
test_services_start() {
    run_test "Services start" "docker-compose up -d > /dev/null 2>&1"
}

# Test 7: Check if database is accessible
test_database_connection() {
    # Wait a bit for database to start
    sleep 10
    
    run_test "Database connection" "docker-compose exec mysql mysqladmin ping -h localhost -u nestuser -pnestpassword --silent"
}

# Test 8: Check if application is responding
test_application_response() {
    # Wait a bit for application to start
    sleep 15
    
    run_test "Application response" "curl -f http://localhost:3000 > /dev/null 2>&1"
}

# Test 9: Check if Prisma client can be generated
test_prisma_generate() {
    run_test "Prisma client generation" "docker-compose exec app npx prisma generate > /dev/null 2>&1"
}

# Test 10: Check if migrations can run
test_migrations() {
    run_test "Database migrations" "docker-compose exec app npx prisma migrate deploy > /dev/null 2>&1"
}

# Cleanup function
cleanup() {
    print_status "Cleaning up test environment..."
    docker-compose down > /dev/null 2>&1 || true
}

# Main test execution
main() {
    echo "Starting Docker setup tests..."
    echo ""
    
    # Run tests
    test_docker_installation
    test_docker_compose_installation
    test_docker_daemon
    test_env_file
    test_docker_build
    test_services_start
    test_database_connection
    test_application_response
    test_prisma_generate
    test_migrations
    
    echo ""
    echo "📊 Test Results:"
    echo "   Tests passed: $tests_passed"
    echo "   Tests failed: $tests_failed"
    echo "   Total tests: $((tests_passed + tests_failed))"
    echo ""
    
    if [ $tests_failed -eq 0 ]; then
        print_success "🎉 All tests passed! Docker setup is working correctly."
        echo ""
        echo "📋 Service Information:"
        echo "   API: http://localhost:3000"
        echo "   Database: localhost:3306"
        echo ""
        echo "🔧 Next steps:"
        echo "   - View logs: docker-compose logs -f"
        echo "   - Stop services: docker-compose down"
        echo "   - Access database: docker-compose exec mysql mysql -u nestuser -p auth_nest_db"
    else
        print_error "❌ Some tests failed. Please check the errors above."
        echo ""
        echo "🔧 Troubleshooting:"
        echo "   - Check Docker installation: docker --version"
        echo "   - Check Docker Compose: docker-compose --version"
        echo "   - Check Docker daemon: docker info"
        echo "   - Check .env file exists and is configured"
        echo "   - Check port availability: lsof -i :3000, lsof -i :3306"
    fi
    
    # Cleanup
    cleanup
}

# Handle script interruption
trap cleanup EXIT

# Run main function
main "$@" 