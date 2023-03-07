// The purpose of the file is to store all the CONST variables in the same
// file so they can be reused and easily configurable from a single file.
import * as dotenv from 'dotenv';

dotenv.config();

// The check is necessary to ensure that the file has all the required variables set.
if (!process.env.PORT || !process.env.OPEN_API_KEY) {
  console.error("ENV variable isn't set properly. Please ensure you have right configuration.");

  process.exit(1);
}

const PORT = parseInt(process.env.PORT, 10);
const OPEN_API_KEY = process.env.OPEN_API_KEY;

export { PORT, OPEN_API_KEY };
