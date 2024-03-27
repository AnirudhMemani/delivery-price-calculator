import { QueryResult } from "pg";
import pool from "./src/config/database.js";

interface TableExistsResult {
    to_regclass: string | null;
}

async function initializeDatabase() {
    try {
        // check if table organization exists in public schema
        const result: QueryResult<TableExistsResult> = await pool.query(
            "SELECT to_regclass('public.organization')"
        );

        if (!result.rows[0].to_regclass) {
            const setupQuery = `
        CREATE TABLE organization (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL
        );

        CREATE TABLE item (
          id SERIAL PRIMARY KEY,
          type VARCHAR(50) NOT NULL CHECK (type IN ('perishable', 'non-perishable')),
          description TEXT
        );

        CREATE TABLE pricing (
          id SERIAL PRIMARY KEY,
          organization_id INTEGER REFERENCES organization(id) ON DELETE CASCADE,
          item_id INTEGER REFERENCES item(id) ON DELETE CASCADE,
          zone VARCHAR(50) NOT NULL,
          base_distance_in_km INTEGER NOT NULL,
          km_price INTEGER NOT NULL, 
          fix_price INTEGER NOT NULL
        );
      `;

            await pool.query(setupQuery);
            console.log("Database tables created successfully!");
        } else {
            console.log("Database tables already exist.");
        }
    } catch (error) {
        console.error("Error setting up database tables:", error);
    }
}

initializeDatabase();
