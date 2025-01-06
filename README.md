## requirement 
Node -v : v22.3.0

# Installation
## Environment Variables for Your Project

This document outlines the purpose and usage of each environment variable used in the project configuration. The `.env` file contains sensitive information, such as database URIs, JWT secrets, and email credentials.

### 1. `PORT`
- **Description**: The port number on which your application will run.
- **Example**: `PORT=2917`

### 2. `ENVIRONMENT`
- **Description**: Specifies the environment in which the application is running (e.g., development, production).
- **Example**: `ENVIRONMENT=development`

### 3. `MONGODB_URI_DEV`
- **Description**: URI for connecting to the MongoDB database in the development environment.
- **Example**: `MONGODB_URI_DEV=mongodb://0.0.0.0:27017`

### 4. `MONGODB_URI`
- **Description**: URI for connecting to the MongoDB database (used in other environments such as production).
- **Example**: `MONGODB_URI=mongodb://0.0.0.0:27017`

### 5. `JWT_VERIFY_SECRET`
- **Description**: Secret key used for signing and verifying JWT authentication tokens.
- **Example**: `JWT_VERIFY_SECRET=23l4k2l3k4j2o039lk24lj`

### 6. `JWT_ACCESS_SECRET`
- **Description**: Secret key used for signing and verifying JWT access tokens.
- **Example**: `JWT_ACCESS_SECRET=kljlk2j43lkjl4098f989`

### 7. `JWT_ADMIN_SECRET`
- **Description**: Secret key used for Admin and verifying JWT access tokens.
- **Example**: `JWT_ADMIN_SECRET=kljlk2j43lkjl4098f989`

### 8. `GMAIL_USER`
- **Description**: Gmail username used for email communication (e.g., sending emails via SMTP).
- **Example**: `GMAIL_USER=kshatriyakabawat@gmail.com`

### 9. `GMAIL_PASS`
- **Description**: Password for the Gmail account used for sending emails.
- **Example**: `GMAIL_PASS=pepbkaouuyhdmyim`

---

**Important Notes:**
- **Security**: Ensure that `.env` files are not committed to version control (e.g., Git). Use `.gitignore` to prevent this.
- **Sensitive Data**: Treat values like `JWT_VERIFY_SECRET` and `GMAIL_PASS` as sensitive and keep them private.

### **Sample `.env` file:**
```bash
PORT=2917
ENVIRONMENT=development
MONGODB_URI_DEV=mongodb://0.0.0.0:27017
MONGODB_URI=mongodb://0.0.0.0:27017

JWT_VERIFY_SECRET=23l4k2l3k4j2o039lk24lj
JWT_ACCESS_SECRET=kljlk2j43lkjl4098f989
JWT_ADMIN_SECRET=3242343lkjl4098f9dfg

GMAIL_USER=user-email-id
GMAIL_PASS=user-app-password(email)
```

# run project 

```base
yarn install
yarn dev
```
# Directory Uses

This project uses custom path aliases defined in `jsconfig.json` to simplify module imports.

## Usage Instructions

In this project, you can use the `#src/` alias to refer to files in the `src/` directory, instead of using relative paths. This makes imports cleaner and easier to manage.


### Example
1. **Database Configuration**:
   ```javascript
   const connectDB = require('#src/config/db.config')
   ```
   Instead of writing:
   ```javascript
   const connectDB = require('../../src/config/db.config.js');
   ```
