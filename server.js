import express from "express";
import authRouter from "./routes/auth-routes.js";
import dotenv from "dotenv"
import mongoose from "mongoose";
import { MongoClient, ServerApiVersion } from "mongodb";
import { createPayment } from "./controllers/payment-controller.js";
import paymentRouter from "./routes/payment-routes.js"


dotenv.config()
const PORT = process.env.PORT;

const connectDB = async () => {
    try {
      await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
  
      console.log("MongoDB connected successfully");
    } catch (error) {
      console.error("MongoDB connection error:", error.message);
      process.exit(1); // stop server if DB fails
    }
};

await connectDB()


const app = express();

app.use(express.json()); // for application/json
app.use(express.urlencoded({ extended: true })); // for form-data or URL-encoded

app.get("/", (req, res) => {
  try {
    res.send("Server working correctly")
  } catch (error) {
    console.log(error.message)
  }
})
app.use('/api/auth', authRouter);
app.use('/api/payment', paymentRouter)


app.listen(PORT,   () => {
    console.log("Server has started on port", PORT)
})