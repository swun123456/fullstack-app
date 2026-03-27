# merge.ps1 (終極防護版)

# 1. 加入「秒數 (ss)」，保證連續點擊也不會覆蓋之前的備份！
$timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
$baseDir = (Get-Location).Path
$backupDir = Join-Path $baseDir "backups"

if (-not (Test-Path $backupDir)) { New-Item -ItemType Directory -Path $backupDir | Out-Null }

$outputTxt = Join-Path $backupDir "summary_$timestamp.txt"
$outputZip = Join-Path $backupDir "code_backup_$timestamp.zip"
$tempStageDir = Join-Path $backupDir "temp_$timestamp"

New-Item -ItemType Directory -Path $tempStageDir | Out-Null

# 2. 精確排除資料夾
$includeExt = @("*.ts", "*.tsx", "*.js", "*.jsx", "*.css", "*.html", "*.json")
$excludePattern = '\\node_modules\\|\\dist\\|\\build\\|\\.git\\|\\.next\\|package-lock|\\backups\\'

$files = Get-ChildItem -Path $baseDir -Recurse -Include $includeExt | Where-Object { $_.FullName -notmatch $excludePattern }

"PROJECT STAGE SAVE - $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')`n" | Out-File $outputTxt -Encoding utf8

foreach ($file in $files) {
    # --- 計算絕對精準的相對路徑 (例如 client\src\App.jsx) ---
    $relPath = $file.FullName.Substring($baseDir.Length).TrimStart('\')
    
    # 寫入 AI TXT
    "====================" | Out-File $outputTxt -Append -Encoding utf8
    "FILE: $relPath" | Out-File $outputTxt -Append -Encoding utf8
    "====================" | Out-File $outputTxt -Append -Encoding utf8
    Get-Content $file.FullName -Raw -Encoding utf8 | Out-File $outputTxt -Append -Encoding utf8
    "`n" | Out-File $outputTxt -Append -Encoding utf8
    
    # --- 實體複製檔案 (自動建立對應的子資料夾) ---
    $targetPath = Join-Path $tempStageDir $relPath
    $targetFolder = Split-Path $targetPath -Parent
    
    if (-not (Test-Path $targetFolder)) { New-Item -ItemType Directory -Path $targetFolder -Force | Out-Null }
    Copy-Item -Path $file.FullName -Destination $targetPath -Force
}

# 3. 壓縮並清理
# 壓縮 temp 資料夾內的「所有內容」，完美保留 client 和 server 資料夾
Compress-Archive -Path "$tempStageDir\*" -DestinationPath $outputZip -Force
Remove-Item -Recurse -Force $tempStageDir

Write-Host "✅ 備份成功！結構已保留且不會覆蓋舊檔。" -ForegroundColor Green
Write-Host "TXT: $outputTxt"
Write-Host "ZIP: $outputZip"