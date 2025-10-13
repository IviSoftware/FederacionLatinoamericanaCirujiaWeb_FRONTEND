#!/bin/bash
# service.sh – Configuración del servicio usando un ciclo

# Declarar un array asociativo con la configuración
declare -A config=(
  ["SERVICE_NAME"]="" # Nombre Del Servicio Ejemplo: amg-frontend
  ["SERVICE_TYPE"]=""    # "frontend" o "backend"
  ["PROJECT_SRC"]="./desarrollo"
  ["BUILD_DIR"]="./desarrollo/dist" # Directorio de build (si no se especifica, se asume "desarrollo")
  ["DEV_SERVICE_URL"]="" # URL del servicio en desarrollo
  ["PROD_SERVICE_URL"]="" # URL del servicio en producción
  ["FRAMEWORK"]="" # Framework de desarrollo (react, vue, laravel, astro, etc.)
)

# Iterar sobre el array y exportar cada variable al entorno de GitHub Actions
for key in "${!config[@]}"; do
  export "$key"="${config[$key]}"
  echo "$key=${config[$key]}" >> "$GITHUB_ENV"
done
