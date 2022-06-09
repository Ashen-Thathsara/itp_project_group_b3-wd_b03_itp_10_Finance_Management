const express = require ("express");
const mongoose = require ("mongoose");
const bodyParser = require("body-parser");
const dotenv = require ("dotenv");
const cors = require("cors");
const app = express();

const PORT = process.env.PORT||8000


//app middleware
dotenv.config();
app.use(cors());
app.use(bodyParser.json());


mongoose.connect(process.env.DB_URL, {
    //useCreateIndex: true, 
    //useFindAndModify: false, 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
  });

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("🚀 DB connected successfully");
});


//import routes
const financeRouter = require("./routes/payments.js");
const salaryRouter = require("./routes/salary.js");

//ERROR
//http://localhost:8000/payment

app.use("/payment",financeRouter);
app.use("/salary", salaryRouter);


app.listen(PORT,() => {
  console.log(`Server is started on port ${PORT}`);
});
