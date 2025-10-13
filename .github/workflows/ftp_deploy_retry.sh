#!/bin/bash
set +e  # Desactiva la salida inmediata ante error

max_attempts=10
attempt=1

while [ $attempt -le $max_attempts ]; do
  echo "Intento $attempt/$max_attempts: Sincronizando archivos vía FTP..."
  
  # Se invoca el script Node y se captura la salida y el código de retorno
  output=$(node .github/workflows/ftp_deploy_node.js 2>&1)
  exit_code=$?

  if [ $exit_code -eq 0 ]; then
    echo "Sincronización completada exitosamente en el intento $attempt."
    exit 0
  else
    echo "Error en el intento $attempt: $output"
    # Si el error contiene "ECONNRESET", se notifica y se reintenta
    if echo "$output" | grep -q "ECONNRESET"; then
      ./.github/workflows/send_slack_message.sh "Error en Sincronización de archivos para $SERVICE_NAME en intento $attempt/$max_attempts. Se reintentará." "danger" "*Error en Sincronización de archivos para $SERVICE_NAME en intento $attempt/$max_attempts: Reintentando.*" "$SLACK_WEBHOOK_URL"
    else
      echo "Error no relacionado con ECONNRESET detectado. Abortando."
      exit $exit_code
    fi
  fi

  attempt=$((attempt + 1))
  sleep 5  # Pausa antes del siguiente intento
done

echo "Se alcanzó el máximo de intentos ($max_attempts) sin lograr la sincronización."
exit 1
