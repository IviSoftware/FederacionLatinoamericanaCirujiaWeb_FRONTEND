#!/bin/bash
# build_project.sh – Script flexible para construir el proyecto

export SHELL=/bin/bash

# 1. Cargar configuración base si existe
if [ -f .github/workflows/service.config ]; then
  source .github/workflows/service.config
fi

# 2. Procesar variables de entorno si es proyecto con build
if [ -f "${PROJECT_SRC}/package.json" ] && [ -n "$ENV_CONFIG" ]; then
  echo "=== Procesando variables de entorno ==="
  
  # Determinar entorno (staging/production)
  if [[ "$GITHUB_REF" == *"staging"* ]]; then
    ENV_SECTION="# STAGING"
    echo "Entorno: STAGING"
  else
    ENV_SECTION="# PRODUCTION"
    echo "Entorno: PRODUCTION"
  fi

  # Extraer y exportar variables del entorno correspondiente
  if [ -z "$ENV_CONFIG" ]; then
    echo "Error: ENV_CONFIG está vacío"
    exit 1
  fi

  echo "=== Contenido de ENV_CONFIG ==="
  echo "$ENV_CONFIG"
  echo "=============================="

  echo "$ENV_CONFIG" | 
    awk -v section="$ENV_SECTION" '
      BEGIN {should_print=0}
      $0 ~ section {should_print=1; next}
      /^# PRODUCTION/ {should_print=0}  # Detener al encontrar la siguiente sección
      should_print && match($0, /^[[:space:]]*([A-Z0-9_]+=.*)/, groups) {
        print groups[1]
      }
    ' > /tmp/env_vars || {
      echo "Error al procesar variables de entorno"
      echo "Contenido parcial procesado:"
      cat /tmp/env_vars || true
      exit 1
    }

  echo "=== Variables extraídas ==="
  cat /tmp/env_vars
  echo "=========================="
  
  echo "Variables cargadas:"
  cat /tmp/env_vars
  echo "============================="

  # Exportar todas las variables con validación
  echo "=== Exportando variables ==="
  while read -r line; do
    if [[ "$line" =~ ^[[:alnum:]_]+= ]]; then
      echo "Exportando: $line"
      export "$line"
    else
      echo "Ignorando línea con formato inválido: $line"
    fi
  done < /tmp/env_vars
  echo "==========================="
  
  # Crear archivo .env para Vite con variables VITE_
  echo "=== Creando archivo .env para Vite ==="
  ENV_FILE="${PROJECT_SRC}/.env.production"
  grep '^VITE_' /tmp/env_vars > "$ENV_FILE"
  echo "Archivo .env creado en: $ENV_FILE"
  echo "Contenido:"
  cat "$ENV_FILE"
  echo "======================================"
fi

# Debug: Mostrar variables de entorno importantes
echo "=== Variables de entorno ==="
echo "SERVICE_NAME: $SERVICE_NAME"
echo "PROJECT_SRC: $PROJECT_SRC"
echo "BUILD_DIR: $BUILD_DIR"
echo "FRAMEWORK: $FRAMEWORK"
echo "============================="

# Convertir PROJECT_SRC a ruta absoluta si comienza con './'
if [[ "$PROJECT_SRC" == ./* ]]; then
  echo "Convirtiendo PROJECT_SRC a ruta absoluta..."
  PROJECT_SRC="$(pwd)/${PROJECT_SRC:2}"
fi
echo "Ruta absoluta de PROJECT_SRC: $PROJECT_SRC"

echo "Iniciando proceso de build para el servicio: $SERVICE_NAME"
echo "Código fuente en: $PROJECT_SRC"
echo "Directorio de build: $BUILD_DIR"

# Detectar gestor de paquetes
if [ -f "${PROJECT_SRC}/pnpm-lock.yaml" ]; then
  echo "Se detectó pnpm-lock.yaml, utilizando pnpm para el build"

  # Función para instalar pnpm si no está disponible
  instalar_pnpm() {
    echo "Instalando pnpm..."
    curl -fsSL https://get.pnpm.io/install.sh | sh -
    export PATH="$HOME/.local/share/pnpm:$PATH"
    source /home/runner/.bashrc  # Asegurar que pnpm está disponible en la sesión actual
    echo "pnpm instalado en: $(which pnpm)"
  }

  if ! command -v pnpm &> /dev/null; then
    instalar_pnpm
  fi

  echo "Instalando dependencias con pnpm..."
  pnpm install --prefix "$PROJECT_SRC"
  if [ $? -ne 0 ]; then
    echo "Error en instalación de dependencias con pnpm."
    exit 1
  fi

  echo "Ejecutando build con pnpm..."
  pnpm --prefix "$PROJECT_SRC" run build
  BUILD_EXIT=$?
  if [ $BUILD_EXIT -ne 0 ]; then
    echo "Error durante el build con pnpm. Debugging:"
    echo "Contenido del directorio $PROJECT_SRC:"
    ls -la "$PROJECT_SRC"
    echo "Contenido del package.json:"
    cat "$PROJECT_SRC/package.json"
  fi

elif [ -f "${PROJECT_SRC}/package-lock.json" ]; then
  echo "Se detectó package-lock.json, utilizando npm para el build"

  echo "Instalando dependencias con npm..."
  (cd "$PROJECT_SRC" && npm install)
  if [ $? -ne 0 ]; then
    echo "Error en instalación de dependencias con npm."
    exit 1
  fi

  chmod +x "$PROJECT_SRC/node_modules/.bin/vite"
  
  echo "Ejecutando build con npm..."
  (cd "$PROJECT_SRC" && npm run build)
  BUILD_EXIT=$?
  if [ $BUILD_EXIT -ne 0 ]; then
    echo "Error durante el build con npm. Debugging:"
    echo "Contenido del directorio $PROJECT_SRC:"
    ls -la "$PROJECT_SRC"
    echo "Contenido del package.json:"
    cat "$PROJECT_SRC/package.json"
  fi

else
  echo "No se detectó pnpm-lock.yaml ni package-lock.json. Ejecutando proceso de build por defecto..."
  (cd "$PROJECT_SRC" && echo "Construyendo el proyecto..." && ls -la)
  BUILD_EXIT=$?
fi

exit $BUILD_EXIT
