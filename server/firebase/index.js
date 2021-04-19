var admin = require('firebase-admin');

var serviceAccount = require('../configdb/shop-advanced-key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin