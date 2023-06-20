import dialogflow from '@google-cloud/dialogflow';
import { DIALOGFLOW_CREDENTIALS } from './constants.js';

const credentials = JSON.parse(DIALOGFLOW_CREDENTIALS),
  projectId = credentials.project_id,
  configuration = {
    credentials: {
      private_key: credentials['private_key'],
      client_email: credentials['client_email']
    }
  };

const sessionClient = new dialogflow.SessionsClient(configuration);

export { sessionClient, projectId };