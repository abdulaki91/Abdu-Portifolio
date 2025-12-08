import express from "express";
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json());

// Now `db` is connection object, no need to call it
// You can pass `db` to routes or models if needed

app.get("/", (req, res) => {
  res.status(404).json({ message: "backend started" });
});
const userRoutes = await import("./routes/userRoute.js");

app.use("/api/users", userRoutes.default);
const port = process.env.port;
app.listen(port, () => {
  console.log(`Server running on PORT :${port}`);
});
