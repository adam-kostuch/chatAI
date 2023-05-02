import firebase from 'firebase-admin';
import { FIREBASE_KEY_ID, FIREBASE_KEY } from './constants.js';

const firebaseCert = {
  type: 'service_account',
  project_id: 'chattie-66940',
  private_key_id: FIREBASE_KEY_ID,
  private_key: FIREBASE_KEY,
  client_email: 'firebase-adminsdk-905nn@chattie-66940.iam.gserviceaccount.com',
  client_id: '115641858207014218399',
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url:
    'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-905nn%40chattie-66940.iam.gserviceaccount.com'
};

firebase.initializeApp({
  credential: firebase.credential.cert(firebaseCert)
});

export { firebase };
