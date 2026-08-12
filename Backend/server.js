import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB();
app.get("/", (req, res) => {
    res.json({
        message: "Expense Tracker API is running"
    });
});


app.use("/api/auth", authRoutes);

app.use("/api/expenses", expenseRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});