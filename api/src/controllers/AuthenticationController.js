import { firebase } from '../configuration/database.js';
import { validateRequestData } from '../helpers/authentication.js';

const RegisterController = async (req, res) => {
  const { email, password, displayName } = validateRequestData(req);

  await firebase
    .auth()
    .createUser({ email, password, displayName })
    .then((userData) => {
      console.info(`[SERVER] Successfully created user with uid: ${userData.uid}!`);

      res.redirect('/authentication/login');
    })
    .catch((error) => {
      console.error(`[SERVER] Error creating user: ${error}`);

      res.redirect('/authentication/register');
    });
};

const LoginController = async (req, res) => {
  const idToken = req.body.idToken.toString();

  // 5 days period
  const expiresIn = 60 * 60 * 24 * 5 * 1000;

  firebase
    .auth()
    .createSessionCookie(idToken, { expiresIn })
    .then(
      (sessionCookie) => {
        console.log('[SERVER] User logged in!');

        res.json({ sessionCookie });
      },
      (error) => {
        res.status(401).send(`[SERVER] Unauthorized: ${error}`);
      }
    );
};

// eslint-disable-next-line no-unused-vars
const SignOutController = async (_req, _res) => {
  console.log('[SERVER] User logged out!');
};

// eslint-disable-next-line no-unused-vars
const ChangePasswordController = async (_req, _res) => {
  console.log(`[SERVER] Change password email sent!`);
};

export { RegisterController, LoginController, SignOutController, ChangePasswordController };
