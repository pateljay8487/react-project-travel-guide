const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const database = require("./config/database");
const UserRouter = require("./routes/UserRouter");
const WeatherData = require("./routes/WeatherData");
const locationRoute = require("./routes/locationRoute");

const app = express();

const port = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// const originList = [
//   "http://localhost:3000",
  
// ];

// const corsOptions = {
//   origin: (origin, callback) => {
//     if (originList.includes(origin)) {
//       callback(null, true);
//     } else {
//       console.log(origin);
//       callback(new Error("not allowed by cors"));
//     }
//   },
//   optionsSuccessStatus: 200,
// };

app.use(cors());
//app.use(cors(corsOptions));

app.use(UserRouter);
app.use('/api/login/weatherData', WeatherData);
//app.use(PropertiesRouter);
app.use('/api/login/locations', locationRoute)

try {
  mongoose.connect(database.url)
  .then(() => {
    console.log("Connected to MongoDB!");
    app.listen(port, () => {
      console.log(`App listening on port: ${port}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

} catch (err) {
  console.log(err);
}