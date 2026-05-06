@echo off
REM Call shzupdate.exe from local app data

set "SHIZO_PATH=%LOCALAPPDATA%\Shizoscript\shzupdate.exe"

REM Check if the executable exists
if exist "%SHIZO_PATH%" (
    echo Running shzupdate.exe...
    "%SHIZO_PATH%"
) else (
    echo ERROR: shzupdate.exe not found at %SHIZO_PATH%
)

pause
