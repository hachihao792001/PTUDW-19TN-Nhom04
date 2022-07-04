require("dotenv").config();

const path = require("path");

const { engine } = require("express-handlebars");
const methodOverride = require("method-override");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT || 3000;

const route = require("./routes");
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());
// DATABASE
const db = require("./config/db");

// CONNECT TO DATABASE
db.connect();

// HTTP LOGGER
// pp.use(morgan("combined"));

app.set("views", path.join(__dirname, "resourses", "views"));

// TEMPLATE ENGINE
app.engine(
    "hbs",
    engine({
        extname: "hbs",
        helpers: {
            timeToString: (time) => {
                return time ? new Date(time).toLocaleString() : "";
            },
            booleanToPayment: (value) =>
                value == true ? "Tiền mặt" : "Chuyển khoản",
            intToMoney: (total) => {
                return total + ".000";
            },
            stringToStatus: (status) => {
                switch (status) {
                    case "new":
                        return "Mới";
                    case "confirmed":
                        return "Đã xác nhận";
                    case "delivering":
                        return "Đang giao";
                    case "delivered":
                        return "Đã giao";
                }
            },
            getClassByStatus: (status) => (status ? "status_on" : "status_off"),

            getStatusName: (status) => (status ? "Active" : "Inactive"),

            json: (context) => JSON.stringify(context),
        },
    })
);
app.set("view engine", "hbs");

// MIDDLEWARE
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(cookieParser());

// STATIC FILES
app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT);

// ROUTING
route(app);
