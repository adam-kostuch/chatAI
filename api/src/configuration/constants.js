// The purpose of the file is to store all the CONST variables in the same
// file so they can be reused and easily configurable from a single file.
import * as dotenv from 'dotenv';

dotenv.config();

// The check is necessary to ensure that the file has all the required variables set.
if (
    !process.env.PORT || 
    !process.env.DIALOGFLOW_CREDENTIALS || 
    !process.env.FIREBASE_KEY_ID || 
    !process.env.FIREBASE_KEY
  ) {
  console.error("ENV variable isn't set properly. Please ensure you have right configuration.");

  process.exit(1);
}

const PORT = parseInt(process.env.PORT, 10);
const DIALOGFLOW_CREDENTIALS = process.env.DIALOGFLOW_CREDENTIALS
const FIREBASE_KEY_ID = process.env.FIREBASE_KEY_ID;
const FIREBASE_KEY = process.env.FIREBASE_KEY;

export { PORT, DIALOGFLOW_CREDENTIALS, FIREBASE_KEY_ID, FIREBASE_KEY };
