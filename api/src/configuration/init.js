import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

const app = express();

// `helmet` is a collection of 14 small middleware functions that set HTTP response headers.
// It allows to well control the requests.
app.use(helmet());
// By mounting the `cors()` we enable CORS requests.
app.use(cors());
// Using `express.json()` by default parses the incoming requests to JSON payloads
app.use(express.json());

export default app;
