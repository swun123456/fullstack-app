@echo off
echo Starting Fullstack App...

:: 啟動 Backend
start "Backend Server" cmd /k "cd server && npm run dev"

:: 啟動 Frontend
start "Frontend Client" cmd /k "cd client && npm run dev"

echo Both services are starting!