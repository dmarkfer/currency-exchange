PUBLIC_PORT ?= 80

MODE ?= dev

POSTGRES_USER ?= postgres
POSTGRES_PASSWORD ?= rootpassword
POSTGRES_DB ?= currency_exchange_db
POSTGRES_PORT ?= 5432

REDIS_PORT ?= 6379

BACKEND_API_PORT ?= 80
BACKEND_SCALE_SIZE ?= +1


env:
	@echo PUBLIC_PORT=$(PUBLIC_PORT)> .env
	
	@echo MODE=$(MODE)>> .env

	@echo POSTGRES_USER=$(POSTGRES_USER)>> .env
	@echo POSTGRES_PASSWORD=$(POSTGRES_PASSWORD)>> .env
	@echo POSTGRES_DB=$(POSTGRES_DB)>> .env
	@echo POSTGRES_PORT=$(POSTGRES_PORT)>> .env
	
	@echo REDIS_PORT=$(REDIS_PORT)>> .env

	@echo BACKEND_API_PORT=$(BACKEND_API_PORT)>> .env
	@echo BACKEND_SCALE_SIZE=$(BACKEND_SCALE_SIZE)>> .env


build: env
	docker-compose build

dev: env
	docker-compose up

start: env build
	docker-compose up -d

down:
	docker-compose down

test: env
	docker-compose run --rm backend npm run test