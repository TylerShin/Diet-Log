import React, { Component } from 'react';
import { Provider } from 'react-redux';
import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseui from 'firebaseui';
// import logo from './logo.svg';
import './App.css';
import 'firebaseui/dist/firebaseui.css';
import { store } from './store';

class App extends Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(
      function(user) {
        if (user) {
          // // User is signed in.
          // var displayName = user.displayName;
          // var email = user.email;
          // var emailVerified = user.emailVerified;
          // var photoURL = user.photoURL;
          // var uid = user.uid;
          // var phoneNumber = user.phoneNumber;
          // var providerData = user.providerData;
          console.log(user);
          user.getIdToken().then(function(_accessToken) {});
        } else {
          console.log('SIGN OUT');
        }
      },
      function(error) {
        console.log(error);
      }
    );

    const ui = new firebaseui.auth.AuthUI(firebase.auth());

    // Initialize the FirebaseUI Widget using Firebase.
    if (ui.isPendingRedirect()) {
      ui.start('#google-oauth-button', {
        signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
        callbacks: {
          signInSuccessWithAuthResult: function(authResult, redirectUrl) {
            const user = authResult.user;
            console.log(user);
            return true;
          },
        },
      });
    }
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <header className="App-header">{/* <img src={logo} className="App-logo" alt="logo" /> */}</header>
          <div id="google-oauth-button" />
        </div>
      </Provider>
    );
  }
}

export default App;
