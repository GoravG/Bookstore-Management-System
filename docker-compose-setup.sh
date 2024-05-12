LOCAL_IP=$(hostname -I | cut -d' ' -f1)

# Inject the local IP address into the Docker Compose file
export LOCAL_IP=$(hostname -I | cut -d' ' -f1)

# Start Docker Compose
docker compose up