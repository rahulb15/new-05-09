import express from 'express';
import cors from 'cors';
import router from "./routes/userRoutes.js";
import connectDB from "./config/connectDB.js";
// import cookieSession from 'cookie-session';
import './passport.js';
import passport from 'passport';
import dotenv from 'dotenv';
dotenv.config({ path: "./routes/.env" });
import session from 'express-session';
import { default as connectMongoDBSession} from 'connect-mongodb-session';
const MongoDBStore = connectMongoDBSession(session);


const app = express();
const port = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;

//Cookies session
// app.use(cookieSession({
//     name: 'my-session',
//     keys: ['key'],
//     maxAge: 24 * 60 * 60 * 1000
// }));


//Session
const store = new MongoDBStore({
    uri: DATABASE_URL + '/usersDB',
    collection: 'sessions'
});




app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    store: store,
}));



//Passport middleware
app.use(passport.initialize());
app.use(passport.session());


//CORS Policy
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}));


//JSON
app.use(express.json());


//Connect to Database
connectDB(DATABASE_URL);



//Routes
app.use("/api/user", router);


app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
