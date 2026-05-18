# EmpFlow — Step-by-Step EC2 Deployment Guide

Follow these sequential instructions to deploy both the React frontend and Node.js backend onto a single Amazon EC2 instance using Nginx and PM2.

---

## Step 1: Initialize EC2 Instance
1. Log into your **AWS Management Console**.
2. Navigate to **EC2 Dashboard** → click **Launch Instance**.
3. Configure settings:
   - **Name:** `emp-management-server`
   - **OS Image:** `Amazon Linux 2023 AMI` (Free Tier eligible)
   - **Instance Type:** `t2.micro`
   - **Key Pair:** Create or select an existing `.pem` SSH key file.
4. **Network Settings:**
   - Enable **Allow SSH traffic** (from your IP or Anywhere).
   - Enable **Allow HTTP traffic from the internet**.
   - Enable **Allow HTTPS traffic from the internet**.
5. Click **Launch Instance**.

---

## Step 2: Establish Remote SSH Link
Connect to your running EC2 machine via your local shell terminal:
```bash
# Secure SSH command (replace path/to/key.pem and ec2-ip-address)
chmod 400 path/to/key.pem
ssh -i path/to/key.pem ec2-user@your-ec2-public-ip
```

---

## Step 3: Install Node.js & System Dependencies
Once logged inside your EC2 console, update packages and install core runtimes:
```bash
# Update system repositories
sudo dnf update -y

# Install Node.js v20 runtime
curl -sL https://rpm.nodesource.com/setup_20.x | sudo bash -
sudo dnf install -y nodejs

# Verify runtimes
node -v
npm -v

# Install Git & Nginx
sudo dnf install -y git nginx
```

---

## Step 4: Clone Codebase & Install Dependencies
1. Clone your project code into `/var/www/`:
   ```bash
   sudo mkdir -p /var/www/empflow
   sudo chown -R ec2-user:ec2-user /var/www/empflow
   cd /var/www/empflow
   git clone <YOUR_GIT_REPOSITORY_URL> .
   ```
2. Configure **Backend Server**:
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env variables with nano to insert database and S3 keys
   nano .env
   ```
3. Configure **Frontend Server**:
   ```bash
   cd ../frontend
   npm install
   # Compile static React distribution assets
   npm run build
   ```

---

## Step 5: Configure Nginx Static Serves & Proxy Reverse
Nginx acts as our primary web server. It serves compiled frontend assets directly, while forwarding `/api` calls straight to our Node.js background process.

1. Open Nginx default configuration:
   ```bash
   sudo nano /etc/nginx/nginx.conf
   ```
2. Replace or update the default `server` block with the following config block:
   ```nginx
   server {
       listen       80;
       listen       [::]:80;
       server_name  _;

       # Serve compiled React static distribution assets
       location / {
           root         /var/www/empflow/frontend/dist;
           index        index.html index.htm;
           try_files    $uri $uri/ /index.html;
       }

       # Route all api calls directly to Express backend
       location /api/ {
           proxy_pass http://localhost:5000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```
3. Test and restart Nginx:
   ```bash
   sudo nginx -t
   sudo systemctl start nginx
   sudo systemctl enable nginx
   ```

---

## Step 6: Spawn Backend Daemon with PM2
Utilize the PM2 process manager to run the Node.js API server continuously in the background.

```bash
# Install PM2 globally
sudo npm install -g pm2

# Start backend server under PM2 process monitor
cd /var/www/empflow/backend
pm2 start src/app.js --name "empflow-api"

# Configure PM2 to auto-start on system boot
pm2 startup
pm2 save
```

Your modern application is now fully deployed and accessible via your EC2 public IP address!
