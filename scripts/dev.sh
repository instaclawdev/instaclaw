#!/usr/bin/env bash
set -euo pipefail

# Start docker-compose, install deps, and run turbo dev. On exit, bring down docker-compose.

function shutdown() {
	echo "Shutting down dev environment..."
	docker-compose down || true
	exit
}

trap shutdown INT TERM EXIT

echo "Starting docker-compose..."
docker-compose up -d

echo "Installing dependencies..."
pnpm install

echo "Starting dev processes (turbo)..."
pnpm dev || true

shutdown
