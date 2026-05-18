# AWS Services Setup & Security Group Blueprint

Step-by-step console configurations for cloud storage, databases, permissions, and network safety rules.

---

## 1. Amazon RDS (MySQL Database) Setup
1. Open the **Amazon RDS Console**.
2. Click **Create database** with standard settings:
   - **Engine:** `MySQL` (version `8.0.x`)
   - **Templates:** `Free Tier` (automatically restricts configuration to `db.t3.micro` and 20GB SSD storage)
   - **DB Instance Identifier:** `empflow-db`
   - **Credentials:** Set master username to `admin` and generate a secure password.
3. **Connectivity:**
   - Select your target **VPC**.
   - Set **Public Access** to **No** (fully isolates the database within private subnets).
   - Create a new DB Security Group: `empflow-rds-sg`.
4. Click **Create Database**.
5. Once running, copy the **Endpoint url** from the database dashboard. This will populate your `DB_HOST` env variable.

---

## 2. Amazon S3 Cloud Bucket Setup
S3 stores user profile avatars and automated database backup archives.

1. Open the **Amazon S3 Console** → click **Create bucket**.
2. **Bucket name:** `emp-management-bucket` (names must be globally unique).
3. **Block Public Access:**
   - For simple training/coursework environments, uncheck **Block all public access** to allow direct avatar image lookups.
   - *Production alternative:* Leave blocked and serve assets securely using an **Amazon CloudFront** distribution.
4. **Configure CORS Policy:** Add the following JSON rule block to the bucket **Permissions** tab, allowing image requests from your frontend:
   ```json
   [
     {
       "AllowedHeaders": ["*"],
       "AllowedMethods": ["GET", "PUT", "POST", "DELETE"],
       "AllowedOrigins": ["*"],
       "ExposeHeaders": []
     }
   ]
   ```

### Daily Database Backup Integration Script
To schedule automatic database dumps straight to your S3 bucket, configure a daily cron utility script on your EC2 application instance:

Create file `/var/www/empflow/backup.sh`:
```bash
#!/bin/bash
# Telemetry daily backup script
BACKUP_NAME="emp_db_backup_$(date +%F_%H%M%S).sql"
TEMP_FILE="/tmp/$BACKUP_NAME"

# Perform local MySQL dump
mysqldump -h $DB_HOST -u $DB_USER -p$DB_PASSWORD emp_db > $TEMP_FILE

# Stream dump archive into S3 bucket
aws s3 cp $TEMP_FILE s3://emp-management-bucket/backups/$BACKUP_NAME

# Remove local temp dump file
rm $TEMP_FILE
```
Add to user system cron (`crontab -e`) to execute daily at midnight:
```cron
0 0 * * * /bin/bash /var/www/empflow/backup.sh
```

---

## 3. AWS IAM Secure Role Configuration
Instead of hardcoding AWS secret keys in raw text configuration files, attach specific system permissions directly to the EC2 instances.

1. Open the **IAM Console** → select **Roles** → click **Create role**.
2. **Trusted Entity:** Select **AWS Service** → click **EC2**.
3. **Attach Permissions:** Search and check the following permission policies:
   - `AmazonS3FullAccess` (Or custom policy limiting actions solely to `emp-management-bucket`)
4. **Role Name:** `empflow-ec2-role` → click **Create**.
5. Return to the **EC2 Console**, check your instance, then click **Actions** → **Security** → **Modify IAM role**.
6. Select `empflow-ec2-role` and click **Save**.

---

## 4. Security Group Configurations (Network Ports)

To maintain a secure setup, restrict open network ports using AWS Security Groups:

### Web Tier Group: `empflow-web-sg`
Attach this to the EC2 instance or Load Balancer.
| Protocol | Port Range | Source | Purpose |
|---|---|---|---|
| TCP | `22` | `My IP` (or `0.0.0.0/0`) | Secure Remote SSH Terminal Access |
| TCP | `80` | `0.0.0.0/0` | Standard HTTP client request traffic |
| TCP | `443` | `0.0.0.0/0` | Secure HTTPS client request traffic |

### Database Tier Group: `empflow-rds-sg`
Attach this to your RDS database instance.
| Protocol | Port Range | Source | Purpose |
|---|---|---|---|
| TCP | `3306` | Custom → Select `empflow-web-sg` ID | Restricts all database queries strictly to the EC2 server |
