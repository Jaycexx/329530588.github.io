@echo off
set "NODE=C:\Program Files\nodejs\node.exe"
if not exist "%NODE%" (
  echo Node.js not found: %NODE%
  exit /b 1
)
"%NODE%" "%~dp0serve.js" %*
