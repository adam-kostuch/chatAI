import { Configuration, OpenAIApi } from 'openai';
import { OPEN_API_KEY } from '../configuration/constants.js';

const configuration = new Configuration({
  organization: "org-LKfp5S6t9L2Fh94ykq63Nfyn",
  apiKey: OPEN_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default openai;