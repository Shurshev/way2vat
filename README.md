# CSV Expenses Parser - Proof of Concept

This repository provides a **Proof of Concept** for a CSV-based expense processing system. 
It demonstrates an efficient way to parse and process large CSV files using **Node.js** and **MongoDB**

## 🚀 Getting Started

### 1️⃣ Install Dependencies
Before you begin, install the required dependencies by running:

```bash
npm install
```

### 2️⃣ Set Up Environment Variables
Create a `.env` file from `.env.example` and add your MongoDB connection string:

```bash
cp .env.example .env
# Then edit .env and add your MongoDB URI
```

### 3️⃣ Generate Sample CSV File
Before starting the server, generate a sample CSV file:

```bash
npm run generate_example
```

This will create a file named **`large_file.csv`** in the `assets` folder at the project root.  
The data is written to the file as a stream, allowing the server to be started almost immediately.

### 4️⃣ Run the Server
Start the server in **development mode**:

```bash
npm run dev
```

## 📡 API Endpoints
The system exposes the following API endpoints via an **Express.js** server:

| Method | Endpoint       | Description |
|--------|----------------|-------------|
| `POST` | `/processFile` | Initiates processing of the CSV file |
| `GET`  | `/summary`     | Retrieves a real-time summary of expenses and reports |
| `GET`  | `/expense/:id` | Fetches details of a specific expense |


