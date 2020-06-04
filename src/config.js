const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY || 'api-key-not-set',
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN || 'env-not-set',
  databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL || 'env-not-set',
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID || 'env-not-set',
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET || 'env-not-set',
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID || 'env-not-set',
}

module.exports = {
  firebaseConfig
}
