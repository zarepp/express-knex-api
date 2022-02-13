const packageJson = require('../package.json')
const express = require("express");
const app = express();
const config = require('./config');

app.use(express.json());

const PostRoute = require("./routes/post")

app.use("/posts", PostRoute);


app.get("/health", (req, res) => {
  res.json({
    success: 'OK',
    version: packageJson.version,
  })
})

// Default error handler
app.use((err, req, res, next) => {
  const errorContent = {
    status: err.status || 'Error',
    message: err.message || 'Error',
  };

  const errorCode = err.code || 500;

  return res
    .status(errorCode)
    .json(errorContent);
})

app.listen(config.PORT, function () {
  console.log(`Server start at port ${config.PORT}`);
  console.log(`Connected to Database: ${config.DB_HOST}:${config.DB_PORT} with username : ${config.DB_USER}`);
});
