import { pool } from "./database.js";
import "./dotenv.js";
import { fileURLToPath } from "url";

const createChatsTable = async () => {
  const createChatsTableQuery = `
    DROP TABLE IF EXISTS chats;

    CREATE TABLE IF NOT EXISTS chats (
      chat_id TEXT NOT NULL DEFAULT '',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      recepient_id TEXT NOT NULL DEFAULT '',
      recepient_name TEXT NOT NULL DEFAULT '',
      recepient_email TEXT NOT NULL DEFAULT '',
      recepient_avatar_url TEXT NOT NULL DEFAULT '',
      sender_id TEXT NOT NULL DEFAULT ''
    );
  `;

  try {
    await pool.query(createChatsTableQuery);
    console.log("🎉 chat table created successfully");
  } catch (err) {
    console.error("⚠️ error creating trips table", err);
  }
};

const createUsersTable = async () => {
  const createUsersTableQuery = `
    DROP TABLE IF EXISTS users;

    CREATE TABLE IF NOT EXISTS users (
      id TEXT DEFAULT '',
      name TEXT DEFAULT '',
      email TEXT DEFAULT '',
      avatar_url TEXT DEFAULT '',
      bio TEXT DEFAULT ''
    );
  `;

  try {
    await pool.query(createUsersTableQuery);
    console.log("🎉 users table created successfully");
  } catch (err) {
    console.error("⚠️ error creating destinations table", err);
  }
};
pool
  .connect()
  .then(() => {
    console.log("Connected to the database");
    createChatsTable();
    createUsersTable();
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });
