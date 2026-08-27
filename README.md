# CRUD REST API Documentation

A lightweight Node.js + Express REST API that persists data in a `data.json` file.

---

## 🚀 How to Run the Server

1. **Install Dependencies**:
   ```bash
   npm install
   ```
2. **Start the Express Server**:
   ```bash
   node express-server.js
   ```
   *(Or run with watch mode: `node --watch express-server.js`)*

The server will run at `http://localhost:3000`.

---

## 📋 API Endpoints

### 1. Home Page
* **Method**: `GET`
* **Path**: `/`
* **Description**: Returns a plain text welcome message.
* **Request Body**: None
* **Example Response**:
  ```text
  This is the home page
  ```

---

### 2. Get All Items
* **Method**: `GET`
* **Path**: `/data`
* **Description**: Retrieves all items stored in `data.json`.
* **Request Body**: None
* **Example Response** (`200 OK`):
  ```json
  [
    {
      "uuid": "550e8400-e29b-41d4-a716-446655440001",
      "name": "Waitomo Glowworm Caves",
      "location": "Waitomo",
      "country": "New Zealand",
      "continent": "Oceania",
      "is_open_to_public": true,
      "details": [
        {
          "fun_fact": "The glowworms create a star-like effect on the cave ceiling using bioluminescence."
        },
        {
          "description": "A subterranean network of limestone caverns famous for its magical boat rides under twinkling glowworm-lit ceilings."
        }
      ]
    }
  ]
  ```

---

### 3. Create a New Item
* **Method**: `POST`
* **Path**: `/data`
* **Description**: Adds a new item to `data.json`.
* **Example Request Body**:
  ```json
  {
    "uuid": "550e8400-e29b-41d4-a716-446655440020",
    "name": "Grand Canyon",
    "location": "Arizona",
    "country": "USA",
    "continent": "North America",
    "is_open_to_public": true
  }
  ```
* **Example Response** (`201 Created`):
  ```json
  {
    "message": "Data saved successfully",
    "item": {
      "uuid": "550e8400-e29b-41d4-a716-446655440020",
      "name": "Grand Canyon",
      "location": "Arizona",
      "country": "USA",
      "continent": "North America",
      "is_open_to_public": true
    }
  }
  ```

---

### 4. Update an Existing Item
* **Method**: `PUT`
* **Path**: `/data/:uuid`
* **Description**: Updates an existing item matching the `uuid` in `data.json`.
* **Example Request Path**: `/data/550e8400-e29b-41d4-a716-446655440001`
* **Example Request Body**:
  ```json
  {
    "is_open_to_public": false
  }
  ```
* **Example Response** (`200 OK`):
  ```json
  {
    "message": "Data updated successfully",
    "updatedItem": {
      "name": "Waitomo Glowworm Caves",
      "location": "Waitomo",
      "country": "New Zealand",
      "continent": "Oceania",
      "is_open_to_public": false,
      "details": [...],
      "uuid": "550e8400-e29b-41d4-a716-446655440001"
    }
  }
  ```
* **Error Response** (`404 Not Found`):
  ```json
  {
    "message": "Item not found"
  }
  ```

---

### 5. Delete an Item
* **Method**: `DELETE`
* **Path**: `/data/:uuid`
* **Description**: Deletes an item matching the specified `uuid` from `data.json`.
* **Example Request Path**: `/data/550e8400-e29b-41d4-a716-446655440001`
* **Request Body**: None
* **Example Response** (`200 OK`):
  ```json
  {
    "message": "Item deleted successfully"
  }
  ```
* **Error Response** (`404 Not Found`):
  ```json
  {
    "message": "Item not found"
  }
  ```

---

## 🛠️ Features & Middleware
* **Express.js Framework**
* **`express.json()`** for parsing JSON request bodies.
* **`cors`** middleware for enabling Cross-Origin Resource Sharing.
* **File Persistence** using `node:fs/promises` writing to `data.json`.
