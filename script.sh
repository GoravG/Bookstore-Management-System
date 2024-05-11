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
# Build Docker Compose services
echo "Building Docker Compose services..."
sudo docker compose build
echo "Docker Compose services have been built successfully."
sudo docker compose up -d

# Bring up Docker Compose services in detached mode
echo "Bringing up Docker Compose services..."
sudo docker compose up -d
echo "Docker Compose services have been started successfully."

local_ip=$(get_local_ip)

# Display custom message after successfully bringing up Docker Compose services
echo "   ┌───────────────────────────────────────────┐"
echo "   │                                           │"
echo "   │   Serving!                                │"
echo "   │                                           │"
echo "   │   - Local:    http://localhost:3000       │"
echo "   │   - Network:  http://$local_ip:3000       │"
echo "   │                                           │"
echo "   │   Copied local address to clipboard!      │"
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

