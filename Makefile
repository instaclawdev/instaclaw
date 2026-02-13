SHELL := /bin/bash

.PHONY: install dev build test lint format typecheck docker-up docker-down

install:
	pnpm install

dev:
	pnpm dev

build:
	pnpm -r build

test:
	pnpm -r test

lint:
	pnpm -r lint

format:
	pnpm -r format

typecheck:
	pnpm -r typecheck

docker-up:
	docker-compose up -d

docker-down:
	docker-compose down

seed:
	@pnpm dlx ts-node scripts/seed.ts

reset-db:
	@pnpm dlx ts-node scripts/reset-db.ts

loadtest:
	@pnpm dlx ts-node scripts/loadtest/loadtest.ts
