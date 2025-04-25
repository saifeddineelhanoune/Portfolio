# Makefile for Portfolio project

# Variables
PYTHON = python3
PIP = pip
NPM = npm
MANAGE_PY = backend/manage.py
BACKEND_PORT = 8000

.PHONY: all setup migrate compile-frontend run-backend run-frontend dev clean help

all: help

setup:
	@echo "Setting up project..."
	$(PIP) install -r backend/requirements.txt
	cd frontend && $(NPM) install
migrate:
	@echo "Running database migrations..."
	$(PYTHON) $(MANAGE_PY) makemigrations
	$(PYTHON) $(MANAGE_PY) migrate 

compile-frontend:
	@echo "Compiling frontend assets..."
	cd frontend && $(NPM) run build

run-backend:
	@echo "Starting backend server..."
	$(PYTHON) $(MANAGE_PY) runserver $(BACKEND_PORT)

run-frontend:
	@echo "Starting frontend in development mode..."
	cd frontend && $(NPM) run dev

dev: migrate
	@echo "Please run backend and frontend in separate terminals using:"
	@echo "  make run-backend"
	@echo "  make run-frontend"

clean:
	@echo "Cleaning generated files..."
	rm -rf frontend/dist
	rm -rf backend/__pycache__
	find . -name '*.pyc' -delete
	find . -name '__pycache__' -delete

help:
	@echo "Available targets:"
	@echo "  setup            : Create virtual environment and install dependencies"
	@echo "  migrate          : Run database migrations"
	@echo "  compile-frontend : Compile frontend assets for production"
	@echo "  run-backend      : Run backend development server"
	@echo "  run-frontend     : Run frontend in development mode"
	@echo "  dev              : Run migrations and setup for development"
	@echo "  clean            : Remove generated files and directories"
	@echo "  help             : Show this help message"