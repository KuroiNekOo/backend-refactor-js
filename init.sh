#!/bin/sh

until nc -z db 3306; do
  echo "⏳ Attente que MySQL soit prêt..."
  sleep 2
done

echo "✅ MySQL est prêt, démarrage du backend..."

npm install
cp .env.example .env
# yes | npm run db:force-reset
# npm run dev

# Garde le conteneur ouvert
tail -f /dev/null