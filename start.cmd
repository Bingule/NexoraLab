@echo off
setlocal
cd /d "%~dp0"
set "taskNode=node"
where node >nul 2>nul
if errorlevel 1 set "taskNode=%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"
if not exist "node_modules\next\dist\bin\next" (
  echo Dependencies are missing. Install Node.js 22.18+ and run npm install first.
  pause
  exit /b 1
)
"%taskNode%" node_modules\next\dist\bin\next dev --hostname 127.0.0.1
