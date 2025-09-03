const express = require("express");
const helmet = require("helmet");
const compression = require("compression");
const rateLimit = require("express-rate-limit");
const app = express();
const PORT = process.env.PORT || 8080
const cors = require("cors");
const db = require("./Config/db");
const authRoutes = require("./routes/authRoute");
const userRoutes = require("./routes/userRoute");
const taskRoutes = require("./routes/taskRoute");

require("dotenv").config();
const errorHandler = require("./middleware/ErrorHandler.middleware");


const allowedOrigin = ["http://localhost:5173",process.env.FRONTEND_URL];

app.use(cors({
    origin:allowedOrigin,
    methods: ["GET","POST","PATCH","PUT","DELETE"]
}))
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use(limiter);
app.use(compression());
app.use(helmet());
app.use(express.json());

app.use("/api/auth",authRoutes);
app.use("/api/user",userRoutes);

app.use("/api/task",taskRoutes);



app.get("/",(_,res) => {
    res.send("sserver is healthy")
})


// Error handler should be last   global 
app.use(errorHandler);

app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`);
})
