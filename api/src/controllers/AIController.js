import {sessionClient, projectId} from '../configuration/dialogflow.js';

const AIController = async (req, res) => {
  const sessionPath = sessionClient.projectAgentSessionPath(projectId, req.body.sessionId);
  const request = {
      session: sessionPath,
      queryInput: {
          text: {
              text: req.body.message,
              languageCode: 'pl',
          },
      },
  };


  try {
    const responses = await sessionClient.detectIntent(request);
    
    res.json({message: responses[0].queryResult.fulfillmentText ?? 'Sorry, something went wrong'})

  } catch (error) {
    console.error('Failed to communicate with Dialogflow API', error);
  }
};

export default AIController;
