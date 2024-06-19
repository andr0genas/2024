import { pool } from "../db/postgresConnection.mjs";

const userModel = {
  // Registers new user.
  createUser: async (newUser) => {
    try {
      const { username, email, password, role = "user", registered_on } = newUser;

      const result = await pool.query(
        "INSERT INTO users (username, email, password, role, registered_on) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [username, email, password, role, registered_on]
      );
      return result.rows[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  login: async ({ email }) => {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    console.log(result);
    if (result.rows.length === 0) {
      throw new Error("User not found");
    }
    const user = result.rows[0];
    return user;
  },
  getUserByEmail: async ({ email }) => {
    try {
      const result = await pool.query("SELECT * FROM users WHERE email = $1", [
        email,
      ]);
      return result.rows[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};

export default userModel;