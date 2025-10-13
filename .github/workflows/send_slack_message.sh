#!/bin/bash
# send_slack_message.sh
#
# Uso (en el directorio del proyecto):
#   ./send_slack_message.sh "<fallback>" "<color>" "<text>" "<webhook_url>"
#
# Ejemplo:
#   ./send_slack_message.sh "Inicio de despliegue" "#439FE0" "*Inicio de despliegue para MiServicio*" "https://hooks.slack.com/services/XXXX/XXXX/XXXX"
#
# Descripción:
#   Este script construye un payload JSON con los parámetros proporcionados y lo envía a la URL del webhook mediante curl.

if [ "$#" -ne 4 ]; then
  echo "Uso: $0 <fallback> <color> <text> <webhook_url>"
  exit 1
fi

FALLBACK="$1"
COLOR="$2"
TEXT="$3"
WEBHOOK_URL="$4"

# Construir el payload JSON
PAYLOAD=$(cat <<EOF
{
  "attachments": [
    {
      "fallback": "$FALLBACK",
      "color": "$COLOR",
      "text": "$TEXT",
      "mrkdwn_in": ["text"]
    }
  ]
}
EOF
)

# Enviar el mensaje a Slack usando curl
curl -X POST -H 'Content-type: application/json' --data "$PAYLOAD" "$WEBHOOK_URL"
