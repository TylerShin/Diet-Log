import React, { Dispatch } from 'react';
import { connect, DispatchProp } from 'react-redux';
import firebase from 'firebase/app';
import firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
import { ACTION_TYPES } from '../actions/actionTypes';

interface StateProps {
  currentUser: User | null;
}
interface DispatchProps {
  checkSignIn: (username: string) => void;
}

type Props = StateProps & DispatchProps;

class AuthContainer extends React.PureComponent<Props> {
  componentDidMount() {
    const { checkSignIn } = this.props;

    firebase.auth().onAuthStateChanged(
      function(user) {
        if (user) {
          // var displayName = user.displayName;
          // var email = user.email;
          // var emailVerified = user.emailVerified;
          // var photoURL = user.photoURL;
          // var uid = user.uid;
          // var phoneNumber = user.phoneNumber;
          // var providerData = user.providerData;
          checkSignIn((user as any).displayName);
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
            checkSignIn(user);
            return true;
          },
        },
      });
    }
  }

  render() {
    return <div id="google-oauth-button" />;
  }
}

function mapStateToProps(state: AuthState) {
  return {
    currentUser: state.currentUser,
  };
}

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchProps => {
  return {
    checkSignIn: (username: string) =>
      dispatch({ type: ACTION_TYPES.SUCCESS_TO_SIGN_IN, payload: { username: username } }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthContainer);
