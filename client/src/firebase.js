import firebase from '@firebase/app';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCEGigFaWL_nayXPlD_xDwNs95SKkiEgGc',
  authDomain: 'shop-advanced-c6026.firebaseapp.com',
  projectId: 'shop-advanced-c6026',
  storageBucket: 'shop-advanced-c6026.appspot.com',
  messagingSenderId: '956236548225',
  appId: '1:956236548225:web:c9e8c6ed9c6cc47c91a580',
  measurementId: 'G-RDYCKZE1D0',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// export
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
