  import express from 'express';
  import cors from "cors";
  import CookieParser from "cookie-parser"
  import connection from './config/db';
  import authRoute from "./routes/authRoute"
  import categoryRoute from "./routes/categoryRoute"
  import googleRoute from "./routes/googleRoute"
  import transactionRoute from "./routes/transactionRoute"
  import limitRoute from "./routes/limitRoute"
  import cookieSession from "cookie-session"
  import passport from "passport"
  import bodyParser from 'body-parser';
  import session from "express-session";
  import  "./passport"
  import "./Scheduler"




  connection();

  const app = express();

  // Body Parser Middleware
  app.use(express.json());
  app.use(bodyParser.json());

  // Cookie Parser Middleware
  app.use(CookieParser());

  app.use(cookieSession({
    name : "session",
    keys : ["ravi"],
    maxAge : 24*60*60*100
  }))

  // app.use(session({
  //   secret: '12345',
  //   resave: false,
  //   saveUninitialized: true
  // }));

  app.use(passport.initialize());
  app.use(passport.session());

  // Use CORS middleware with specific origin allowed
  app.use(cors({
      origin: 'http://localhost:3000',
      credentials: true,
      methods:"GET,POST,PUT,DELETE" // Enable credentials (cookies, authorization headers, etc.)
    }));

  app.use('/api/v1' , authRoute);
  app.use('/api/v1' , categoryRoute)
  app.use("/api/v1" , transactionRoute)
  app.use("/auth" , googleRoute)
  app.use("/api/v1", limitRoute)

  const PORT = 5000;

  app.listen(PORT , ()=>{
      console.log("Server is running on 5000")
  })