# 🚀 Product Catalog Backend API

This is the **server-side** component for a simple Product Catalog CRUD application built for the coding challenge.  
The API provides endpoints to manage products, including **Create**, **Read**, **Update**, **Delete (CRUD)** operations, and supports **search** and **filtering** capabilities.

---

## 📋 Table of Contents

- [Setup Instructions](#setup-instructions)
- [Design Decisions and Tradeoffs](#design-decisions-and-tradeoffs)
- [Potential Improvements](#potential-improvements)
- [API Documentation](#api-documentation)
- [Testing Approach](#testing-approach)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Running the Application](#running-the-application)
- [Author](#author)

---

## 🛠 Setup Instructions

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-github-username/your-repo-name.git
   cd your-repo-name/server-side
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Environment Variables**:  
   Create a `.env` file at the root of the `server-side` directory with the following contents:

   ```env
   NODE_ENV=development
   PORT=8080
   ```

4. **Run the application**:

   - For development with hot-reloading:
     ```bash
     npm run dev
     ```
   - For production:
     ```bash
     npm run start
     ```

5. **Run tests**:
   ```bash
   npm run test
   ```

---

## 🎯 High-Level Design Decisions and Tradeoffs

- **Framework Choice**: Used `Express.js` for simplicity, robustness, and middleware support.
- **Database Choice**: Used `lowdb` (lightweight JSON file database) for quick setup and simplicity.
- **Architecture**: Followed **MVC pattern** (models, controllers, routes).
- **Error Handling**:
  - Created custom error classes (`AppError`, `BadRequestError`, `NotFoundError`) for better API responses.
- **Testing Strategy**:
  - Unit tests for model layer.
  - Integration tests for routes.

### ⚖️ Tradeoffs

- Chose `lowdb` instead of full SQL/NoSQL database for lightweight development.
- Focused testing primarily on main CRUD and search/filter functions.
- No authentication (e.g., JWT) to stay within project scope.

---

## 💚 Potential Improvements (If Given More Time)

- Add authentication and authorization.
- Replace `lowdb` with PostgreSQL or MongoDB.
- Implement pagination, sorting, and field selection.
- Add input validation middleware (`express-validator`).
- Better error logging (e.g., `winston`).
- Containerization with Docker.

---

## 📚 API Documentation

### Base URL

```
http://localhost:8080/api/products
```

---

### Endpoints

#### GET /api/products

- Retrieve all products.
- **Optional Query Parameters**:
  - `name` - search by product name (partial match)
  - `cost`, `costOp` (e.g., `gt`, `gte`, `lt`, `lte`)
  - `sales`, `salesOp` (e.g., `gt`, `gte`, `lt`, `lte`)

Example:

```
GET /api/products?cost=1000&costOp=lte
```

#### GET /api/products/:id

- Retrieve a single product by ID.

#### POST /api/products

- Create a new product.
- **Request Body**:
  ```json
  {
    "name": "Sample Product",
    "unitCost": 100,
    "totalSales": 20,
    "inventory": 50
  }
  ```

#### PUT /api/products/:id

- Update an existing product.
- **Request Body** (partial updates allowed):
  ```json
  {
    "inventory": 30
  }
  ```

#### DELETE /api/products/:id

- Delete a product by ID.

---

## 🧪 Testing Approach

- **Unit Tests**:
  - Tested `models/` directly (CRUD on the database).
- **Integration Tests**:
  - Tested `routes/` with API requests using `supertest`.
- **Coverage Focus**:
  - Focused on core functionalities (create, update, delete, search, filter).
- **Tradeoff**:
  - Did not cover exhaustive edge cases to focus on primary feature robustness.

---

## 🛂 Environment Variables

You need a `.env` file containing:

```env
NODE_ENV=development
PORT=8080
```

---

## 🗄️ Project Structure

```
server-side/
├── app.js
├── server.js   # Main server file
├── routes/
│   └── product.route.js
├── controllers/
│   └── product.controller.js
├── models/
│   └── product.model.js
├── db/
│   └── db.json
│   └── index.js
├── utils/
│   └── index.js
├── tests/
│   └── product.model.test.js
│   └── product.routes.test.js
├── .env
├── package.json
└── README.md
```

---

# 🚀 Product Catalog Backend API

This is the **server-side** component for a simple Product Catalog CRUD application built for the coding challenge.  
The API provides endpoints to manage products, including **Create**, **Read**, **Update**, **Delete (CRUD)** operations, and supports **search** and **filtering** capabilities.

---

## 📋 Table of Contents

- [Setup Instructions](#setup-instructions)
- [Design Decisions and Tradeoffs](#design-decisions-and-tradeoffs)
- [Potential Improvements](#potential-improvements)
- [API Documentation](#api-documentation)
- [Testing Approach](#testing-approach)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Use of AI Assistance](#use-of-ai-assistance)
- [Author](#author)

---

## 🛠 Setup Instructions

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-github-username/your-repo-name.git
   cd your-repo-name/server-side
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Environment Variables**:  
   Create a `.env` file at the root of the `server-side` directory with the following contents:

   ```env
   NODE_ENV=development
   PORT=8080
   ```

4. **Run the application**:

   - For development with hot-reloading:
     ```bash
     npm run dev
     ```
   - For production:
     ```bash
     npm run start
     ```

5. **Run tests**:
   ```bash
   npm run test
   ```

---

## 🎯 High-Level Design Decisions and Tradeoffs

- **Framework Choice**: Used `Express.js` for simplicity, robustness, and middleware support.
- **Database Choice**: Used `lowdb` (lightweight JSON file database) for quick setup and simplicity.
- **Architecture**: Followed **MVC pattern** (models, controllers, routes).
- **Error Handling**:
  - Created custom error classes (`AppError`, `BadRequestError`, `NotFoundError`) for better API responses.
- **Testing Strategy**:
  - Unit tests for model layer.
  - Integration tests for routes.

### ⚖️ Tradeoffs

- Chose `lowdb` instead of full SQL/NoSQL database for lightweight development.
- Focused testing primarily on main CRUD and search/filter functions.
- No authentication (e.g., JWT) to stay within project scope.

---

## 💚 Potential Improvements (If Given More Time)

- Add authentication and authorization.
- Replace `lowdb` with PostgreSQL or MongoDB.
- Implement pagination, sorting, and field selection.
- Add input validation middleware (`express-validator`).
- Better error logging (e.g., `winston`).
- Containerization with Docker.

---

## 📚 API Documentation

### Base URL

```
http://localhost:8080/api/products
```

---

### Endpoints

#### GET /api/products

- Retrieve all products.
- **Optional Query Parameters**:
  - `name` - search by product name (partial match)
  - `cost`, `costOp` (e.g., `gt`, `gte`, `lt`, `lte`)
  - `sales`, `salesOp` (e.g., `gt`, `gte`, `lt`, `lte`)

Example:

```
GET /api/products?cost=1000&costOp=lte
```

#### GET /api/products/:id

- Retrieve a single product by ID.

#### POST /api/products

- Create a new product.
- **Request Body**:
  ```json
  {
    "name": "Zero Fanta77",
    "unitCost": 50,
    "totalSales": 400,
    "inventory": 100,
    "description": "Removal of Drainage Device from",
    "imageUrl": "http://dummyimage.com/197x100.png/cc0000/f54654777"
  }
  ```

#### PUT /api/products/:id

- Update an existing product.
- **Request Body** (partial updates allowed):
  ```json
  {
    "inventory": 30
  }
  ```

#### DELETE /api/products/:id

- Delete a product by ID.

---

## 🧪 Testing Approach

- **Unit Tests**:
  - Tested `models/` directly (CRUD on the database).
- **Integration Tests**:
  - Tested `routes/` with API requests using `supertest`.
- **Coverage Focus**:
  - Focused on core functionalities (create, update, delete, search, filter).
- **Tradeoff**:
  - Did not cover exhaustive edge cases to focus on primary feature robustness.

---

## 🛂 Environment Variables

You need a `.env` file containing:

```env
NODE_ENV=development
PORT=8080
```

---

## 🗄️ Project Structure

```
server-side/
├── app.js             # Main server file
├── routes/
│   └── product.route.js
├── controllers/
│   └── product.controller.js
├── models/
│   └── product.model.js
├── db/
│   └── index.js
├── utils/
│   └── errors.js
├── tests/
│   └── product.model.test.js
│   └── product.routes.test.js
├── .env
├── package.json
└── README.md
```

---

## 🤖 Use of AI Assistance

During the development of this project, I utilized AI tools to assist with:

- Generating ideas for writing cleaner and more efficient code.
- Planning and structuring better unit and integration tests.
- Drafting detailed and professional documentation and comments.
- Accelerating development speed by helping brainstorm edge cases and spotting potential improvements.

**Important:**  
All core logic, critical decisions, architectural choices, and testing approaches were **designed, reviewed, and implemented personally** to ensure they matched the challenge requirements and industry best practices.

Using AI thoughtfully allowed me to focus more deeply on solving the real business problems, optimizing the code quality, and delivering the project on time.

---

## 👨‍💻 Author

Built with ❤️ by **Evangel Iheukwumere**  
[GitHub Profile](https://github.com/your-github-username)

---

# 🏁 Summary

This project satisfies the coding challenge's goals by:

- Delivering a fully working CRUD API.
- Using modular MVC architecture.
- Implementing custom error handling.
- Writing comprehensive tests.
- Documenting setup, usage, and design clearly.

Thank you for reviewing this submission!
