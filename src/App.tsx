import React, { Component } from 'react';
import { Provider } from 'react-redux';
import AuthContainer from './containers/auth';
// import logo from './logo.svg';
import './App.css';
import { store } from './store';
import UploadButton from './containers/uploadButton';
import ImageList from './containers/imageList';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <AuthContainer />
          <UploadButton />
          <ImageList />
        </div>
      </Provider>
    );
  }
}

export default App;
