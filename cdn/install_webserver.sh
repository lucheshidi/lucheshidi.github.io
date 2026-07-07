#!/bin/bash

# --- Color and Symbol Definitions ---
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

TICK="${GREEN}✔${NC}"
CROSS="${RED}✖${NC}"
INFO="${BLUE}ℹ${NC}"
ARROW="${CYAN}❯${NC}"

# --- OS Detection ---
detect_os() {
    if [ -f /etc/os-release ]; then
        . /etc/os-release
        if [[ "$ID" == "debian" || "$ID_LIKE" == *"debian"* || "$ID" == "ubuntu" ]]; then
            OS_FAMILY="debian"
        elif [[ "$ID" == "rhel" || "$ID_LIKE" == *"rhel"* || "$ID" == "centos" || "$ID" == "rocky" || "$ID" == "almalinux" ]]; then
            OS_FAMILY="rhel"
        else
            echo -e "${CROSS} Unsupported Linux distribution."
            exit 1
        fi
    else
        echo -e "${CROSS} Cannot determine OS type (/etc/os-release missing)."
        exit 1
    fi
}

# --- Check Sudo Privileges ---
# The script runs as non-root, but needs sudo access to install packages
check_sudo() {
    if [ "$EUID" -eq 0 ]; then
        echo -e "${YELLOW}${INFO} Running as root directly is fine, but this script is optimized for non-root users with sudo.${NC}\n"
    else
        echo -e "${INFO} Verifying sudo access (non-root execution)..."
        if ! sudo -v &>/dev/null; then
            echo -e "${CROSS} Error: You need sudo privileges to install software."
            exit 1
        fi
    fi
}

# --- Arrow Key Menu Logic ---
interactive_menu() {
    local options=("Apache HTTP Server" "Nginx Server" "Exit")
    local selected=0

    # Hide terminal cursor
    tput civis
    trap "tput cnorm; exit 1" SIGINT SIGTERM

    while true; do
        clear
        echo -e "${BLUE}=======================================${NC}"
        echo -e "${CYAN}    Web Server Automated Installer     ${NC}"
        echo -e "${BLUE}=======================================${NC}"
        echo -e "Detected OS Family: ${YELLOW}${OS_FAMILY^^}${NC}"
        echo -e "Use ${YELLOW}↑/↓ Arrow Keys${NC} and press ${YELLOW}Enter${NC} to select:\n"

        for i in "${!options[@]}"; do
            if [ "$i" -eq "$selected" ]; then
                echo -e "  ${ARROW} ${GREEN}[*] ${options[$i]}${NC}"
            else
                echo -e "     [ ] ${options[$i]}"
            fi
        done

        echo -e "\n${BLUE}=======================================${NC}"

        # Read 3 characters for arrow escape sequences
        read -rsn3 key
        case "$key" in
            $'\x1b[A') # Up Arrow
                ((selected--))
                [ "$selected" -lt 0 ] && selected=$((${#options[@]} - 1))
                ;;
            $'\x1b[B') # Down Arrow
                ((selected++))
                [ "$selected" -ge "${#options[@]}" ] && selected=0
                ;;
            "") # Enter key
                break
                ;;
        esac
    done

    # Restore terminal cursor
    tput cnorm
    return "$selected"
}

# --- Installer Core ---
install_package() {
    local service_name=$1
    local debian_pkg=$2
    local rhel_pkg=$3
    local target_pkg=""

    if [ "$OS_FAMILY" == "debian" ]; then
        target_pkg=$debian_pkg
        echo -e "\n${INFO} Updating package index..."
        sudo apt-get update -y
        echo -e "${INFO} Installing ${service_name}..."
        sudo apt-get install -y "$target_pkg"
    elif [ "$OS_FAMILY" == "rhel" ]; then
        target_pkg=$rhel_pkg
        echo -e "\n${INFO} Installing EPEL repository (required for Nginx if not present)..."
        sudo dnf install -y epel-release
        echo -e "${INFO} Installing ${service_name}..."
        sudo dnf install -y "$target_pkg"
    fi

    # Verify installation and manage systemd service
    if systemctl list-unit-files | grep -q "${service_name}.service"; then
        echo -e "${INFO} Starting and enabling service..."
        sudo systemctl start "$service_name"
        sudo systemctl enable "$service_name"
        echo -e "\n${TICK} ${GREEN}${service_name} installed and started successfully!${NC}"
    else
        echo -e "\n${CROSS} ${RED}Installation failed or service not found.${NC}"
        exit 1
    fi
}

# --- Main Execution Flow ---
detect_os
check_sudo
interactive_menu
choice=$?

case "$choice" in
    0)
        # Apache is named 'apache2' in Debian/Ubuntu but 'httpd' in RHEL
        install_package "apache2" "apache2" "httpd"
        ;;
    1)
        # Nginx uses the same name in both systems
        install_package "nginx" "nginx" "nginx"
        ;;
    2)
        echo -e "\n${INFO} Installation cancelled. Exiting..."
        exit 0
        ;;
esac
