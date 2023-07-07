const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
const authRouter = require("./routes/authRoute");

app.use(express.json());
app.use(cors());

app.use("/api", authRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});