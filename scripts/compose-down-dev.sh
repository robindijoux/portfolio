#!/bin/sh

# This script is used to compose the development environment.

echo "Composing development environment..."

# Compose the development environment.
docker compose -f docker-compose.dev.yml down