const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const donationRoutes = require("./routes/donationRoutes");
const cors = require("cors"); // Import cors

dotenv.config();
connectDB();

const app = express();
app.use(cors()); // Enable CORS
app.use(express.json());

// Routes
app.use("/api", donationRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
