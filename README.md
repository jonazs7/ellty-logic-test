# Ellty Logic Test - Calculation Tree Application

A full-stack web application that allows users to communicate through numbers in a hierarchical "tree" structure. Users can start a discussion with a number, and others can reply by performing mathematical operations (+, -, *, /) on that number, creating a chain of calculations.

## 🚀 Features

- **Public Access**: Unregistered users can view the entire calculation tree.
- **User Authentication**: Secure Registration and Login system.
- **Calculation Tree**: 
  - Authenticated users can start a new calculation chain (Root Node).
  - Authenticated users can respond to any existing calculation with a new operator and value.
- **Real-time Logic**: Mathematical operations are calculated on the server-side to ensure accuracy.
- **Responsive UI**: Built with a component-based approach using React and TypeScript.

## 🛠 Tech Stack

- **Frontend**: React.js, TypeScript, Vite, Axios, Lucide React.
- **Backend**: Node.js, Express, TypeScript, Prisma ORM.
- **Database**: PostgreSQL.
- **Containerization**: Docker & Docker Compose.
- **Testing**: Vitest.

## ⚙️ How to Run

Ensure you have **Docker** and **Docker Compose** installed on your machine.

1. **Clone the Repository**:
    ```bash
    git clone <https://github.com/jonazs7/ellty-logic-test.git>
    cd ellty-logic-test
2. **Run with Docker Compose: This command will build the images and start the database, backend, and frontend services.**
    ```bash
    docker compose up --build
3. **Access the Application:**
    Frontend: http://localhost:5173
    Backend API: http://localhost:3000
    Prisma Studio (Database GUI): http://localhost:5555
4. **To show proficiency with testing tools, unit tests have been implemented for the core calculation logic.**
    To run the tests locally:
    1. Navigate to the backend folder: cd backend
    2. Install dependencies (if not already): npm install
    3. Execute tests:
       ```bash
       npm test
5. **Project Structure**
ellty-logic-test/
├── backend/            # Express API with TypeScript & Prisma
│   ├── src/
│   │   ├── calculations.ts      # Core calculation logic
│   │   ├── calculations.test.ts # Unit tests
│   │   └── index.ts             # Server entry point
│   └── prisma/                  # Database schema
├── frontend/           # React Application
│   ├── src/
│   │   ├── CalculationTree.tsx  # Recursive tree component
│   │   ├── Login.tsx            # Auth components
│   │   └── App.tsx              # Main logic
└── docker-compose.yml  # Orchestration