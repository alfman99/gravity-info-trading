#!/bin/bash

# Build the frontend
cd frontend
rm -rf build # Remove the old build
npm install
npm run build

# Remove old client build
rm -rf ../backend/build

# Move the build frontend to the static backend folder
mv build ../backend/.

# Go to home directory
cd ..

# Build the backend
cd backend
npm install
npm run build
npm run start:prod