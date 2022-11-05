#!/bin/bash

# Build the frontend
cd frontend
npm install
npm run build

# Move the build frontend to the static backend folder
mv build ../backend/client

# Go to home directory
cd ..

# Build the backend
cd backend
npm install
npm run build
npm run start:prod