require("dotenv").config();
const express = require("express");
const cors = require("cors");
const router = require("./routes/invoiceRoute");
const morgan = require("morgan");
const errorMiddleware = require("./middlewares/error-middleware");
const notFound = require("./middlewares/not-found");

const app = express();
app.use(cors());
app.use(morgan("dev"));

app.use(express.json());


app.use("/api", router);

app.use(errorMiddleware);
app.use("*", notFound);

const PORT = 8000;
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
