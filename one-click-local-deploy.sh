#!/bin/bash

# Function to get local IP address
get_local_ip() {
    hostname -I | awk '{print $1}'
}

# Stop MySQL service if it's running
echo "Stopping mysql running on machine"
service mysql stop

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "Docker is not installed. Installing now..."

    # Install required packages to use HTTPS
    sudo apt update && sudo apt install -y apt-transport-https ca-certificates curl gnupg-agent software-properties-common

    # Add Docker's official GPG key
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

    # Add Docker repository to apt sources
    sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"

    # Update package index again and install Docker
    sudo apt update && sudo apt install -y docker-ce docker-ce-cli containerd.io

    echo "Docker has been installed successfully."
else
    echo "Docker is already installed."
fi

# Get local IP
LOCAL_IP=$(get_local_ip)

# Start Docker compose
sudo -E LOCAL_IP=$LOCAL_IP docker compose up -d

# Check if Docker compose started successfully
if [ $? -eq 0 ]; then
    echo "   ┌───────────────────────────────────────────┐"
    echo "   │                                           │"
    echo "   │   Serving!                                │"
    echo "   │                                           │"
    echo "   │   - Local:    http://localhost:3000       │"
    echo "   │   - Network:  http://$LOCAL_IP:3000   │"
    echo "   │                                           │"
    echo "   │                                           │"
    echo "   └───────────────────────────────────────────┘"
    echo " Plese enter sudo docker compose down to stop   "
else
    echo "Failed to start the service."
    exit 1
fi