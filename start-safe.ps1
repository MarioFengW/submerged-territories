# Script de inicio para el Museo Virtual del Agua
# Versión compatible con políticas de ejecución restringidas

Write-Host ""
Write-Host "=================================" -ForegroundColor Cyan
Write-Host "🌊 MUSEO VIRTUAL DEL AGUA 🌊" -ForegroundColor Cyan
Write-Host "=================================" -ForegroundColor Cyan
Write-Host ""

# Verificar que Node.js esté instalado
Write-Host "Verificando Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js detectado: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ ERROR: Node.js no está instalado" -ForegroundColor Red
    Write-Host "Por favor instala Node.js desde https://nodejs.org/" -ForegroundColor Yellow
    Read-Host "Presiona Enter para salir"
    exit
}

Write-Host ""

# Verificar si las dependencias están instaladas
Write-Host "Verificando dependencias..." -ForegroundColor Yellow

$backendModules = Test-Path "backend\node_modules"
$frontendModules = Test-Path "frontend\node_modules"

if (-not $backendModules) {
    Write-Host "⚠️  Dependencias del backend no encontradas. Instalando..." -ForegroundColor Yellow
    Set-Location backend
    node (Get-Command npm).Source install
    Set-Location ..
    Write-Host "✅ Dependencias del backend instaladas" -ForegroundColor Green
}

if (-not $frontendModules) {
    Write-Host "⚠️  Dependencias del frontend no encontradas. Instalando..." -ForegroundColor Yellow
    Set-Location frontend
    node (Get-Command npm).Source install
    Set-Location ..
    Write-Host "✅ Dependencias del frontend instaladas" -ForegroundColor Green
}

Write-Host ""
Write-Host "🚀 Iniciando servidores..." -ForegroundColor Cyan
Write-Host ""

# Iniciar Backend en una nueva ventana usando node directamente
Write-Host "📡 Iniciando Backend (puerto 3000)..." -ForegroundColor Yellow
$backendPath = Join-Path $PWD "backend"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$backendPath'; Write-Host '🌊 BACKEND - Museo Virtual del Agua' -ForegroundColor Cyan; node node_modules/nodemon/bin/nodemon.js server.js"

# Esperar 3 segundos para que el backend inicie
Start-Sleep -Seconds 3

# Iniciar Frontend en una nueva ventana usando node directamente
Write-Host "🎨 Iniciando Frontend (puerto 5173)..." -ForegroundColor Yellow
$frontendPath = Join-Path $PWD "frontend"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$frontendPath'; Write-Host '🎨 FRONTEND - Museo Virtual del Agua' -ForegroundColor Cyan; node node_modules/vite/bin/vite.js"

# Esperar 2 segundos
Start-Sleep -Seconds 2

Write-Host ""
Write-Host "=================================" -ForegroundColor Green
Write-Host "✅ APLICACIÓN INICIADA" -ForegroundColor Green
Write-Host "=================================" -ForegroundColor Green
Write-Host ""
Write-Host "📱 Frontend: " -NoNewline -ForegroundColor White
Write-Host "http://localhost:5173" -ForegroundColor Yellow
Write-Host "📡 Backend:  " -NoNewline -ForegroundColor White
Write-Host "http://localhost:3000" -ForegroundColor Yellow
Write-Host ""
Write-Host "💡 Abre tu navegador y visita http://localhost:5173" -ForegroundColor Cyan
Write-Host ""
Write-Host "Para detener los servidores, cierra las ventanas de PowerShell" -ForegroundColor Gray
Write-Host "o presiona Ctrl+C en cada una." -ForegroundColor Gray
Write-Host ""

# Opcionalmente, abrir el navegador automáticamente
$openBrowser = Read-Host "¿Deseas abrir el navegador automáticamente? (s/n)"
if ($openBrowser -eq "s" -or $openBrowser -eq "S") {
    Start-Sleep -Seconds 3
    Start-Process "http://localhost:5173"
    Write-Host "🌐 Navegador abierto" -ForegroundColor Green
}

Write-Host ""
Write-Host "Presiona Enter para cerrar esta ventana..." -ForegroundColor Gray
Read-Host
