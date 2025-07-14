import dotenv from "dotenv";
import app from "./app.js";
import { connectDb } from "./Db/db.js";

const PORT = process.env.PORT || 8080;

dotenv.config();

connectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
    app.on("error", (error) => {
      console.log("Error in starting server", error);
    });
  })
  .catch((error) => {
    console.log("Error in connecting to database", error);
    process.exit(1);
  });

