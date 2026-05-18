# EmpFlow — Viva Voce Preparation Guide (Q&A)

Prepare for your project presentation or defense with these common viva questions and detailed answers.

---

## 1. Frontend & Visual Styling Questions

### Q1: What is "Glassmorphism" and how did you implement it?
> **Answer:** Glassmorphism is a design style characterized by frosted-glass effects, subtle border highlights, and colorful floating background layers. We built it using a combination of Tailwind CSS classes and custom styles:
> 1. `backdrop-blur-md` for the frosted-glass blur.
> 2. Semi-transparent background colors like `rgba(255, 255, 255, 0.05)`.
> 3. Thin, semi-transparent borders using `rgba(255, 255, 255, 0.1)`.
> 4. Colorful, blurry background circles animated with Framer Motion to create depth.

### Q2: Why did you use Framer Motion instead of basic CSS transitions?
> **Answer:** Framer Motion offers a more powerful way to handle complex UI animations. It allows us to animate elements as they enter or leave the page (`AnimatePresence`), coordinate multiple animations, and scale elements smoothly on hover. This gives the app a premium, high-quality feel that is difficult to achieve with standard CSS alone.

### Q3: Explain how React Router protects private dashboard routes from unauthorized access.
> **Answer:** We created a `<ProtectedRoute>` component that wraps the dashboard page. It checks the global `AuthContext` to see if a user is logged in. If it finds a valid session, it renders the dashboard page. If not, it uses React Router's `<Navigate to="/login" replace />` to redirect the visitor to the login page, protecting the dashboard from unauthorized access.

---

## 2. Backend & Database Integration Questions

### Q4: What is the benefit of using `mysql2/promise` over the standard `mysql` package?
> **Answer:** The `mysql2/promise` package supports modern JavaScript Promises, allowing us to write cleaner asynchronous code using `async/await` instead of nested callback functions. It also includes built-in support for connection pooling, which keeps database connections active and reuses them to improve application performance.

### Q5: How are admin passwords stored securely in the database?
> **Answer:** Admin passwords are never saved in plain text. When an admin is registered, their password is encrypted using the `bcryptjs` library. Bcrypt applies a secure hashing algorithm with a custom "salt" factor. During login, the server hashes the incoming password and compares it to the stored hash using `bcrypt.compare()`, keeping the original password safe.

### Q6: How does the backend handle file uploads without overloading the EC2 server?
> **Answer:** We used `multer` along with the `multer-s3` middleware. When an employee avatar is uploaded, the file is streamed directly to our Amazon S3 bucket instead of being saved to the local EC2 disk. This keeps our EC2 server lightweight, prevents disk space issues, and makes sure files are stored securely in the cloud.

---

## 3. AWS Infrastructure & Network Questions

### Q7: Why is it bad practice to hardcode AWS Access Keys in the backend config files? How did you solve this?
> **Answer:** Hardcoding credentials is a major security risk, as anyone with access to the source code (like on GitHub) can steal the keys and access your AWS account. We solved this by creating an **IAM Instance Profile** with S3 access permissions and attaching it directly to the EC2 instance. The AWS SDK automatically retrieves temporary access tokens from the instance metadata, removing the need for plaintext keys in our code.

### Q8: Explain the difference between Public Subnets and Private Subnets in a VPC.
> **Answer:** 
> - **Public Subnets:** Connected directly to the Internet Gateway, making them accessible from the outside internet. We use them for things like Nginx web proxies and Load Balancers.
> - **Private Subnets:** Have no direct route to the Internet Gateway, making them invisible and inaccessible from the outside world. We use them to isolate backend servers and databases, keeping them safe from direct internet attacks.

### Q9: Why is the RDS database placed in a Private Subnet and how does the backend access it?
> **Answer:** The RDS database is placed in a private subnet to shield it from internet threats. The backend EC2 server (which is allowed to talk to the internet) resides in a subnet that shares the same virtual network (VPC). We configured the database's security group to only accept incoming traffic on port `3306` from the EC2 server, keeping the database fully protected.

### Q10: What is the role of Nginx in this deployment?
> **Answer:** Nginx acts as our front-facing web server and reverse proxy:
> 1. It serves the compiled React static files (HTML, CSS, JS) directly to users.
> 2. It intercepts any requests starting with `/api` and forwards them to our Express backend running locally on port `5000`. This allows us to run both the frontend and backend on the same machine under a single domain or IP address.
