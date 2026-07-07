# How to make your very own LucheShell Plugin Repository

>[!IMPORTANT]
>You can either use the automatic script I made or follow the manual install steps below. Automatic script is easier and recommended.
>
>## Installation script
>
>```bash
>curl -fsSL https://lucheshidi.github.io/cdn/install_webserver.sh | bash
>```

## 0. Preparation

### Here are what you **NEED** for a LucheShell repo:

1. A server that runs for 24 hours.
2. A domain that will not oftenly change, or a static IP. The former is recommended.
3. Some basic computer knowledge.

### Here are the **RECOMMENDED** settings

1. A server runs Debian-based Linux system, architectures are fine.
2. DDNS or static domain(if you have a static IP, if you don't use a DDNS domain).

## 1. Setup the environment

### 1.1. Preparing for the server

1. **Update the system:**

```bash
# On Debian-based systems:
sudo apt update
sudo apt full-upgrade

# On RHEL-based systems:
sudo dnf update
sudo dnf upgrade
```

2. **Install necessary software:**

You can either choose NGINX or Apache as your web server. Here, I'll demonstrate how to set up Apache.

```bash
# Link for the latest tarball: https://dlcdn.apache.org/httpd/httpd-2.4.68.tar.bz2
# 1. Download & Extract the tarball
sudo wget https://https://dlcdn.apache.org/httpd/httpd-2.4.68.tar.bz2
sudo tar -xjvf httpd-2.4.68.tar.bz2

# 2. Navigate to the extracted directory
cd httpd-2.4.68

# 3. Configure the installation
./configure --prefix=/usr/local/apache2

# 4. Compile and install
make
sudo make install
```

>[!CAUTION]
>
>## Page under construction!
>