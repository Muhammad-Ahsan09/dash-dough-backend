import express from "express";
import authRouter from "./routes/auth-routes.js";
import dotenv from "dotenv"
import mongoose from "mongoose";
import paymentRouter from "./routes/payment-routes.js"
import {createPayment} from "./controllers/payment-controller.js"
import cookieParser from "cookie-parser";


dotenv.config()
const PORT = process.env.PORT;

const connectDB = async () => {
    try {
      await mongoose.connect(process.env.MONGODB_URI);
  
      console.log("MongoDB connected successfully");
    } catch (error) {
      console.error("MongoDB connection error:", error.message);
      process.exit(1); // stop server if DB fails
    }
};

await connectDB()


const app = express();

app.use(cookieParser())
app.use(express.json()); // for application/json
app.use(express.urlencoded({ extended: true })); // for form-data or URL-encoded

app.get("/", (req, res) => {
  try {
    res.send("<h1>Server working correctly</h1>")
  } catch (error) {
    console.log(error.message)
  }
})
app.use('/api/auth', authRouter);
app.use('/api/payment', paymentRouter)

app.post("/create-payment1", (req, res) => {
  const paymentData = createPayment();

  let form = `
    <form id="jazzcashForm" method="POST"
      action="https://sandbox.jazzcash.com.pk/CustomerPortal/transactionmanagement/merchantform/">
  `;

  Object.keys(paymentData).forEach(key => {
    form += `<input type="hidden" name="${key}" value="${paymentData[key]}" />`;
  });

  form += `
    </form>
    <script>document.getElementById("jazzcashForm").submit();</script>
  `;

  res.send(form);
});

app.listen(PORT,   () => {
    console.log("Server has started on port", PORT)
})