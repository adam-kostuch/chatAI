import { Router } from 'express';
import OpenAIController from '../controllers/OpenAIController.js';

const OpenAIRouter = Router();

OpenAIRouter.post('/', OpenAIController);

export default OpenAIRouter;
