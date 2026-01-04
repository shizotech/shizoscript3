# Create Start Menu shortcut for Shizoscript Updater

# Path to the executable
$target = "$env:LOCALAPPDATA\Shizoscript\shzupdate.exe"

# Start Menu folder for this shortcut
$folder = "$env:APPDATA\Microsoft\Windows\Start Menu\Programs\Shizoscript"

# Ensure the folder exists
New-Item -ItemType Directory -Force -Path $folder | Out-Null

# Shortcut file path
$shortcutPath = "$folder\Shizoscript Updater.lnk"

# Create the shortcut
$wsh = New-Object -ComObject WScript.Shell
$shortcut = $wsh.CreateShortcut($shortcutPath)

# Set shortcut properties
$shortcut.TargetPath = $target
$shortcut.WorkingDirectory = "$env:LOCALAPPDATA\Shizoscript"
$shortcut.IconLocation = "$target,0"
$shortcut.Description = "Shizoscript Updater"

# Save the shortcut
$shortcut.Save()

Write-Host "Shortcut created at $shortcutPath"
