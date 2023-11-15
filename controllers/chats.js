import { pool } from "../config/database.js";

//? Get all the chats associated by the user
const getChatsbyUserID = async (req, res) => {
  const id = req.params.id;
  try {
    const results = await pool.query(
      "SELECT * FROM chats WHERE sender_id = $1 ORDER BY created_at",
      [id],
    );
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

//? Create a chat if it doesn't exist else it does nothing
const putChat = async (req, res) => {
  const {
    sender_id,
    recepient_id,
    chat_id,
    recepient_name,
    recepient_email,
    recepient_avatar_url,
  } = req.body;

  try {
    // Check for chats where either sender_id or recipient_id matches the provided id
    const results = await pool.query(
      "SELECT * FROM chats WHERE sender_id = $1 AND recepient_id = $2",
      [sender_id, recepient_id],
    );

    if (results.rows.length > 0) {
      res.status(200).json(results.rows[0]);
    } else {
      // If the chat doesn't exist, you can create it, assuming the 'created_at' column is automatically generated.
      // Replace 'your_sender_id' and 'your_recipient_id' with the appropriate values.
      const insertResult = await pool.query(
        "INSERT INTO chats ( sender_id, recepient_id, chat_id, recepient_name, recepient_email, recepient_avatar_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
        [
          sender_id,
          recepient_id,
          chat_id,
          recepient_name,
          recepient_email,
          recepient_avatar_url,
        ],
      );

      res.status(201).json(insertResult.rows[0]);
    }
  } catch (error) {
    res.status(409).json({ error: error.message });
    console.log("Unable to get or create chat");
    console.log("Error:", error.message);
  }
};
const getChatsbyID = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const results = await pool.query(
      "SELECT * FROM chats WHERE chat_id = $1 ",
      [id],
    );
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

export default {
  getChatsbyUserID,
  putChat,
  getChatsbyID,
};
