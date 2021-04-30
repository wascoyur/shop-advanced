var admin = require('firebase-admin');

var serviceAccount = require('../configdb/key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'shop-advanced-c6026.firebaseapp.com',
});

module.exports = admin