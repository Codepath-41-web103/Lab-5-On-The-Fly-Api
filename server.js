import express from "express";
import cors from "cors";
import chatRoutes from "./routes/chats.js";
import userRoutes from "./routes/users.js";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res
    .status(200)
    .send(
      '<h1 style="text-align: center; margin-top: 50px;">💬 Chatat API</h1>',
    );
});

app.use("/api/chats", chatRoutes);
app.use("/api/users", userRoutes);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
