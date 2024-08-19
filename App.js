import "dotenv/config";
import session from "express-session";
import express from "express";
import Hello from "./hello.js";
import cors from "cors";
import mongoose from "mongoose";
import UserRoutes from "./Stroll/Users/routes.js";
import LocationRoutes from "./Stroll/Location/routes.js";

const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/stroll"
mongoose.connect(CONNECTION_STRING);


const app = express();
app.use(
    cors({
        credentials: true,
        origin: process.env.NETLIFY_URL || "http://localhost:3000",
    })
);
const sessionOptions = {
    secret: process.env.SESSION_SECRET || "kanbas",
    resave: false,
    saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: "none",
        secure: true,
        domain: process.env.NODE_SERVER_DOMAIN,
    };
}
app.use(session(sessionOptions));

app.use(express.json());


UserRoutes(app);
LocationRoutes(app);
Hello(app);

app.listen(4000);
