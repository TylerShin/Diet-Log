import React, { Dispatch } from 'react';
import firebase from 'firebase/app';
import 'firebase/database';
import { connect } from 'react-redux';
import { ACTION_TYPES } from '../actions/actionTypes';

interface StateProps {
  currentUser: User | null;
  images: Image[];
}

interface DispatchProps {
  fetchImages: (images: Image[]) => void;
}

type Props = StateProps & DispatchProps;

class ImageList extends React.PureComponent<Props> {
  componentDidMount() {
    const { fetchImages } = this.props;

    const ref = firebase.database().ref('images');
    ref.on('value', function(snapshot) {
      if (snapshot) {
        const images: Image[] = [];

        snapshot.forEach(function(childSnapshot) {
          const childKey = childSnapshot.key;
          const childData = childSnapshot.val();
          images.push({
            id: childKey,
            ...childData,
          });
        });

        if (images.length > 0) {
          fetchImages(images);
        }
      } else {
        console.log('NO SNAPSHOT');
      }
    });
  }

  render() {
    const { images } = this.props;

    const photos = images.map(img => {
      return (
        <div key={img.id}>
          <img width={300} height={300} src={img.downloadURL} />
        </div>
      );
    });

    return (
      <div>
        <h1>LIST OF WHAT YOU ATE!</h1>
        <div>{photos}</div>
      </div>
    );
  }
}

function mapStateToProps(state: AppState) {
  return {
    currentUser: state.auth.currentUser,
    images: state.imageState.images,
  };
}

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchProps => {
  return {
    fetchImages: (images: Image[]) => {
      dispatch({
        type: ACTION_TYPES.FETCH_IMAGES,
        payload: {
          images,
        },
      });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ImageList);
