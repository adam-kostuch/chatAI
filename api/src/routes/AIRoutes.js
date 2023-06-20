import { Router } from 'express';
import AIController from '../controllers/AIController.js';

const AIRouter = Router();

AIRouter.post('/', AIController);

export default AIRouter;
