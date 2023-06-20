import app from './configuration/init.js';
import AIRouter from './routes/AIRoutes.js';
import { PORT } from './configuration/constants.js';
import AuthenticationRouter from './routes/AuthenticationRoutes.js';

app.use('/ai', AIRouter);
app.use('/authentication', AuthenticationRouter);

app.listen(PORT, () => {
  console.debug(`[SERVER] Listening on port ${PORT}`);
});
