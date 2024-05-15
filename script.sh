#!/bin/bash

# Function to handle cleanup when script is terminated
cleanup() {
    echo "Cleaning up..."
    sudo docker compose down
    echo "Cleanup complete."
    exit 1
}

# Function to get the local IP address
get_local_ip() {
    ip route get 1 | awk '{print $7; exit}'
}

service mysql stop0

# Trap SIGINT signal (Ctrl+C) and call cleanup function
trap cleanup SIGINT

# Trap SIGHUP signal (terminal closed) and call cleanup function
trap cleanup SIGHUP

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "Docker is not installed. Installing now..."

    # Install required packages to use HTTPS
    sudo apt update
    sudo apt install -y apt-transport-https ca-certificates curl gnupg-agent software-properties-common

    # Add Docker's official GPG key
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

    # Add Docker repository to apt sources
    sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"

    # Update package index again and install Docker
    sudo apt update
    sudo apt install -y docker-ce docker-ce-cli containerd.io

    echo "Docker has been installed successfully."
else
    echo "Docker is already installed."
fi

LOCAL_IP=$(hostname -I | awk '{print $1}')

# Inject the local IP address into the Docker Compose file
sudo export LOCAL_IP=$(hostname -I | awk '{print $1}')

echo $LOCAL_IP

sudo -E LOCAL_IP=$LOCAL_IP docker compose up -d

echo "Docker Compose services have been built successfully."

sudo docker compose up -d
echo "Docker Compose services have been started successfully."

# Display custom message after successfully bringing up Docker Compose services
echo "   ┌───────────────────────────────────────────┐"
echo "   │                                           │"
echo "   │   Serving!                                │"
echo "   │                                           │"
echo "   │   - Local:    http://localhost:3000       │"
echo "   │   - Network:  http://$local_ip:3000   │"
echo "   │                                           │"
echo "   │                                           │"
echo "   └───────────────────────────────────────────┘"

# Prompt user to stop Docker Compose services
while true; do
    read -p "Do you want to stop the Docker Compose services (yes/no)? " yn
    case $yn in
        [Yy]* ) 
            # Stop Docker Compose services
            echo "Stopping Docker Compose services..."
            sudo docker compose down
            echo "Docker Compose services have been stopped."
            break;;
        [Nn]* ) 
            echo "Continuing without stopping Docker Compose services."
            break;;
        * ) 
            echo "Please answer yes or no.";;
    esac
done

