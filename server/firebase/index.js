var admin = require('firebase-admin');

var serviceAccount = require('../configdb/shop-advanced-key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://shop-advanced-c6026.iam.gserviceaccount.com',
});

module.exports = admin