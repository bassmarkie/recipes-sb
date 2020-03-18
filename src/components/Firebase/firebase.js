import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

const prodConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID
}
const devConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID
}
const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig
class Firebase {
  constructor() {
    app.initializeApp(config)

    this.auth = app.auth()
    this.db = app.database()
  }

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password)
  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password)

  doSignOut = () => this.auth.signOut()
  doPasswordReset = email => this.auth.sendPasswordResetEmail(email)
  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password)

  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.user(authUser.uid)
          .once('value')
          .then(snapshot => {
            const dbUser = snapshot.val()

            if (!dbUser.roles) {
              dbUser.roles = {}
            }

            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              ...dbUser
            }
            next(authUser)
          })
      } else {
        fallback()
      }
    })
  // *** User API ***

  user = uid => this.db.ref(`users/${uid}`)
  users = () => this.db.ref('users')

  // *** Recipes API ***
  recipe = rid => this.db.ref(`recipes/${rid}`)
  recipes = () => this.deb.ref('recipes')

  ingredient = iid => this.deb.ref(`ingredients/${iid}`)
  ingredients = () => this.deb.ref('ingredients')
}
export default Firebase
