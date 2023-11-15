import { pool } from "../config/database.js";

const createUser = async (req, res) => {
  try {
    const { name, email, avatar_url, id, bio } = req.body;
    const check = await pool.query("SELECT * FROM users WHERE id = $1", [id]);

    if (check.rows.length === 0) {
      const results = await pool.query(
        `INSERT INTO users (name, email, avatar_url, id, bio)
      VALUES($1, $2, $3, $4, $5)
      RETURNING *`,
        [name, email, avatar_url, id, bio],
      );
      res.status(201).json(results.rows[0]);
    } else {
      res.status(200).json(check.rows[0]);
    }
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

const getUsersByEmail = async (req, res) => {
  const { email } = req.params;
  console.log("email", email);
  try {
    const results = await pool.query(
      "SELECT * FROM users WHERE email LIKE $1",
      [`%${email}%`],
    );
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const results = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

const updateUserbyId = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { name, avatar_url, bio } = req.body;
    const results = await pool.query(
      `UPDATE users
      SET name = $1,
      avatar_url = $2,
      bio = $3
      WHERE id = $4`,
      [name, avatar_url, bio, id],
    );
    res.status(200).json(results.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

const deleteUserById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const results = await pool.query("DELETE FROM users WHERE id = $1", [id]);
    res.status(200).json(results.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};
const getUsers = async (req, res) => {
  try {
    const results = await pool.query("SELECT * FROM users");
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

export default {
  createUser,
  getUsersByEmail,
  getUserById,
  updateUserbyId,
  deleteUserById,
  getUsers,
};
