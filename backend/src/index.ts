import express from "express";
import { connectDB } from "./config/db";
import userRoutes from "./routes/user.routes";
import restaurantRoutes from "./routes/restaurant.routes";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({
    status: "API is running 🚀"
  });
});

app.use("/api/users", userRoutes);
app.use("/api/restaurants", restaurantRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on http://localhost:${PORT}`);
}); 