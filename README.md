# Node App that calculates total delivery charges

**Setup Guide**

## Pre-requisites

-   Node.js (version 12 or above, use LTS version)

-   npm (or yarn)

-   PostgreSQL database (local or remote)

## Installation

1.  **Clone the repository:**

```bash

git clone https://github.com/AnirudhMemani/delivery-price-calculator.git

```

2.  **Install dependencies:**

```bash

cd delivery-price-calculator

npm install

```

3.  **Database Setup:**

i. **Create a Database: Create a new PostgreSQL database named 'assignment_postgres_deliveryapp' (or adjust the name as needed).**

ii. **Create a .env file at the root of your project. And add the following variables:**

```

POSTGRES_HOST=<your-database-hostName>

POSTGRES_USER=<your-database-username>

POSTGRES_PASSWORD=<your-database-password>

POSTGRES_DB=<your-database-name>

DATABASE_URL=<your-prisma-url>

```

iii. **Run Seed Scripts:**

Execute the seed scripts (e.g., scripts/seed.js) to populate your database with initial data:

```bash

npx  ts-node  scripts/seed.js

```

5.  **Running the Application**

```bash

npm run dev

```

# API Documentation

**The API documentation is available on SwaggerHub: https://app.swaggerhub.com/apis-docs/NEMANIANIRUDH/DeliveryApp/1.0.0#/# Node App that calculates total delivery charges**
