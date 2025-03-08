# Claims Management API
A Node.js + Express.js backend API for managing insurance claims, storing data in MongoDB, and exporting claims as an Excel file.

## 📌 Features
✅ CRUD operations for insurance claims  
✅ Real-time MongoDB storage with Mongoose  
✅ Export claims to Excel using ExcelJS  
✅ Validation & Error Handling  
✅ RESTful API Structure  
✅ Logging with Morgan  

## 🚀 Installation & Setup
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/ashu2764/claims-api.git
cd claims-api
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Set Up Environment Variables (.env)
Create a `.env` file in the root directory:
```sh
MONGO_URI=mongodb://localhost:27017/claimsdb
PORT=5000
```

### 4️⃣ Start the Server
```sh
npm run dev  # Starts server with Nodemon
```
✅ Server runs on `http://localhost:5000`

```sh
npm run docs  # Viw Documentation with JsDoc
```

## 📌 API Endpoints
### Claims Management
| Method | Endpoint               | Description       |
|--------|------------------------|-------------------|
| POST   | /api/v1/claims         | Create a new claim |
| GET    | /api/v1/claims         | Get all claims    |
| GET    | /api/v1/claims/:id     | Get claim by ID   |
| PUT    | /api/v1/claims/:id     | Update a claim    |
| DELETE | /api/v1/claims/:id     | Delete a claim    |
| GET | /api/v1/claims/:id     | Delete a claim    |
| DELETE | /api/v1/claims/:id     | Delete a claim    |

### Export & Download
| Method | Endpoint                | Description               |
|--------|-------------------------|---------------------------|
| GET    | /api/v1/claims/export   | Export claims to Excel    |
| GET    | /api/v1/claims/download | Download exported Excel file |

## 📌 Project Structure

```
📂 claims-api
│-- 📂 src
│   ├── 📂 config          # Database connection
│   ├── 📂 controllers     # Business logic (CRUD, export)
│   ├── 📂 models          # Mongoose schemas
│   ├── 📂 routes          # API routes
│   ├── 📂 exports         # Generated Excel files
│   ├── server.js         # Main server entry point
│-- .env                 # Environment variables
│-- package.json         # Project dependencies
│-- README.md            # Documentation
```

## 📌 Technologies Used
- **Node.js** (Backend Server)  
- **Express.js** (REST API Framework)  
- **MongoDB + Mongoose** (Database)  
- **ExcelJS** (Exporting to Excel)  
- **dotenv** (Environment Variables)  
- **morgan** (Logging)  

## 📌 How to Test the API
### Using Postman
1. Import the API into Postman
2. Send requests to `http://localhost:5000/api/v1/claims`

### Using cURL
```sh
curl -X GET http://localhost:5000/api/v1/claims
```

## 📌 Author
**Ashwani Kumar**  
📧 Email: itsashu268@gmail.com & er.ashwani.kumar.2764@gmail.com  
🔗 GitHub: [github.com/ashu2764](https://github.com/ashu2764)
