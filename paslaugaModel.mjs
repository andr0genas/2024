import { pool } from "../db/postgresConnection.mjs";

const paslaugaModel = {
    createPaslauga: async (paslaugaData) => {
        try {
            const { title, image, duration, price, category } = paslaugaData;
            const result = await pool.query(
                "INSERT INTO paslaugas (title, image, duration, price, category) VALUES ($1, $2, $3, $4, $5) RETURNING *",
                [title, image, duration, price, category]
            );
            return result.rows[0];
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    updatePaslauga: async (paslaugaId, updatedFields) => {
        try {
            const setFields = Object.keys(updatedFields)
                .map((key, i) => `${key} = $${i + 1}`)
                .join(", ");

            const values = [...Object.values(updatedFields), paslaugaId];

            const result = await pool.query(
                `UPDATE paslaugas SET ${setFields} WHERE id = $${values.length} RETURNING *`,
                values
            );

            if (result.rowCount === 0) {
                throw new Error("Paslauga not found");
            }

            return result.rows[0];
        } catch (error) {
            console.error("Error in updatePaslauga:", error.message);
            throw error;
        }
    },
    deletePaslauga: async (id) => {
        try {
            const query = "DELETE FROM paslaugas WHERE id = $1";
            const result = await pool.query(query, [id]);
            return result.rows;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    getPaslaugaById: async (paslaugaId) => {
        try {
            const query = "SELECT * FROM paslaugas WHERE id = $1";
            const result = await pool.query(query, [paslaugaId]);
            return result.rows;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    getAllPaslaugas: async () => {
        try {
            const query = "SELECT * FROM paslaugas";
            const result = await pool.query(query);
            return result.rows;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
};

export default paslaugaModel;
