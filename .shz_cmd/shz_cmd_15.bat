powershell -NoProfile -Command "$l = Get-Content 'shizotech\system\miniagent\roles\mind\ROLE.shio'; for($i=324; $i -lt 372; $i++){ '{0}| {1}' -f ($i+1), $l[$i] }"
echo ===== mind_run_end / run_failed =====
powershell -NoProfile -Command "$l = Get-Content 'shizotech\system\miniagent\runtime\mind_runtime.shio'; for($i=1339; $i -lt 1400; $i++){ '{0}| {1}' -f ($i+1), $l[$i] }"
