import app from './configuration/init.js';
import OpenAIRouter from './routes/OpenAIRoutes.js';
import { PORT } from './configuration/constants.js';

app.use('/openai', OpenAIRouter)

app.listen(PORT, () => {
  console.debug(`[SERVER] Listening on port ${PORT}`);
});
