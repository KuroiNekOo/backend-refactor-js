FROM node:slim

WORKDIR /usr/src/app

# Installer les dépendances de l'application pour node:alpine
# RUN apk add --no-cache mariadb-client

# Installer les dépendances de l'application pour node:slim
RUN apt-get update && apt-get install -y mariadb-client netcat-openbsd && rm -rf /var/lib/apt/lists/*

# Copier le fichier init.sh dans le conteneur pour y avoir accès au moment du build
COPY init.sh ./init.sh

# Ajouter cette ligne pour s'assurer que init.sh est exécutable
RUN chmod +x ./init.sh

EXPOSE 4300

CMD ["sh", "./init.sh"]

# Faire tourner le container a l'infini car il se stop s'il n'y a rien dedans
# ENTRYPOINT [ "tail", "-f", "/dev/null" ]