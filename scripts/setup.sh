#!/bin/sh

echo "[SERVER] Starting up to setup project"

echo "[SERVER] Moving to /api directory"
cd api
echo "[SERVER] Installing dependencies"
npm install
echo "[SERVER] Creating blank `.env` file, please remember to fill it with the provided inforation"
touch .env

echo "[SERVER] Moving to /client directory" 
cd ../client
echo "[SERVER] Installing dependencies"
npm install
echo "[SERVER] Creating blank `.env` file, please remember to fill it with the provided inforation"
touch .env

echo "[SERVER] Eveything works flawlessly, have a good time chatting!"