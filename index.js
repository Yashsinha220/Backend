const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan")
require("dotenv").config();
const PORT = process.env.PORT;
const app = express();
const authRoute = require("./routers/AutrhRoute")
const userRoute = require("./routers/UserRoute")
const postRoute = require("./routers/PostRoute")
const passwordresetRoute = require("./routers/ForgotPassword")
app.use(cors());
app.use(morgan("common"))

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ extended: "true", limit: "30mb" }));


// usage of the routes 
app.use("/auth" , authRoute)
app.use("/user", userRoute)
app.use("/post",postRoute);
app.use("/forgotpass", passwordresetRoute)
app.listen(PORT, () => {
  mongoose
    .connect(process.env.MONGOOSE_URL)
    .then(() => {
      console.log(`server listening on port http://localhost:${PORT}`);
    })
    .catch((error) => {
      console.log("connection error: " + error);
    });
});
