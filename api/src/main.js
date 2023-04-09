import app from './configuration/init.js';
import OpenAIRouter from './routes/OpenAIRoutes.js';
import { PORT } from './configuration/constants.js';
import AuthenticationRouter from './routes/AuthenticationRoutes.js';

app.use('/openai', OpenAIRouter);
app.use('/authentication', AuthenticationRouter);

app.listen(PORT, () => {
  console.debug(`[SERVER] Listening on port ${PORT}`);
});
