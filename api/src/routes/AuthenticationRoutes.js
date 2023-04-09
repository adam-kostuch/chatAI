import { Router } from 'express';
import {
  RegisterController,
  LoginController,
  SignOutController,
  ChangePasswordController
} from '../controllers/AuthenticationController.js';

const AuthenticationRouter = Router();

AuthenticationRouter.post('/register', RegisterController);
AuthenticationRouter.post('/login', LoginController);
AuthenticationRouter.get('/signOut', SignOutController);
AuthenticationRouter.get('/changePassword', ChangePasswordController);

export default AuthenticationRouter;
