import express from "express";
import cors from "cors";
import errorHandler from "./middleware/errorHandler.js";
import dotenv from "dotenv";
import { userRoutes } from "./routes/user.js";

const app = express();

app.use(
    cors({
        origin: "*",
        credentials: true,
    })
);
app.use(express.json());
app.use(errorHandler);
app.use("/api/v1", userRoutes);

app.get("/", (req, res) => {
    res.send("Welcome to the Library Seat Booking System");
});

export default app;
