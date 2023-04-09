import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';

const app = express();
const cookieMiddlewareSession = {
  name: 'session', // name of the cookie
  secret: 'MAKE_THIS_SECRET_SECURE', // key to encode session
  maxAge: 24 * 60 * 60 * 1000, // cookie's lifespan
  sameSite: 'lax', // controls when cookies are sent
  path: '/', // explicitly set this for security purposes
  secure: true, // cookie only sent on HTTPS
  httpOnly: true // cookie is not available to JavaScript (client)
};

// `helmet` is a collection of 14 small middleware functions that set HTTP response headers.
// It allows to well control the requests.
app.use(helmet());
// By mounting the `cors()` we enable CORS requests.
app.use(cors());
// Using `express.json()` by default parses the incoming requests to JSON payloads
app.use(express.json());
// Limits the request urls to be sent to only us
app.use(express.urlencoded({ extended: false }));
// The parser helps handling the cookies
app.use(cookieParser());
// Sets  up the cookie for session
app.use(cookieSession(cookieMiddlewareSession));

export default app;
