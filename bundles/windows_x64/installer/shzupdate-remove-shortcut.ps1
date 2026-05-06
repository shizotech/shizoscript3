# Path to the shortcut
$shortcutPath = "$env:APPDATA\Microsoft\Windows\Start Menu\Programs\Shizoscript\Shizoscript Updater.lnk"

# Check if it exists and remove it
if (Test-Path $shortcutPath) {
    Remove-Item $shortcutPath
    Write-Host "Shortcut removed: $shortcutPath"
} else {
    Write-Host "Shortcut not found: $shortcutPath"
}
