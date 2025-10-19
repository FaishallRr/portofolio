import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';
import serviceAccountJson from '../../serviceAccountKey.json';

const serviceAccount = serviceAccountJson as ServiceAccount;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://portofolio-6b4fb-default-rtdb.firebaseio.com/',
});

export const db = admin.database();
export default admin;
