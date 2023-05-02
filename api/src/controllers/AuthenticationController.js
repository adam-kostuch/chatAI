import { firebase } from '../configuration/database.js';
import { validateRequestData } from '../helpers/authentication.js';

const RegisterController = async (req, res) => {
  const { email, password, displayName } = validateRequestData(req);

  await firebase
    .auth()
    .createUser({ email, password, displayName })
    .then((userData) => {
      res.status(200).json({uuid: userData.uid}).send(`[SERVER] Successfully created user with uid: ${userData.uid}!`);
    })
    .catch((error) => {
      res.status(500).send(`[SERVER] Error creating user: ${error}`);
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
        res.status(200).send('[SERVER] User logged in!').json({ sessionCookie }).end();
      },
      (error) => {
        res.status(401).send(`[SERVER] Unauthorized: ${error}`);
      }
    );
};

const SignOutController = async (_req, _res) => {
  console.log('[SERVER] User logged out!');
};

const ChangePasswordController = async (_req, _res) => {
  console.log(`[SERVER] Change password email sent!`);
};

export { RegisterController, LoginController, SignOutController, ChangePasswordController };
