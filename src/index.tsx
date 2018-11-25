import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase/app';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const config = {
  apiKey: 'AIzaSyDmHJo3DyVFk0Q4cvOVvXfYFGKUxKoHbx4',
  authDomain: 'pengyou-826b9.firebaseapp.com',
  databaseURL: 'https://pengyou-826b9.firebaseio.com',
  projectId: 'pengyou-826b9',
  storageBucket: 'pengyou-826b9.appspot.com',
  messagingSenderId: '664072786636',
};

firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
