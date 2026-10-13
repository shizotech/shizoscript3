cd C:\Users\neu\source\repos\shizoscript3\release
dir /s /b *.shio 2>nul | findstr /I /V "\\runtime\\\.shz_cmd" | more
