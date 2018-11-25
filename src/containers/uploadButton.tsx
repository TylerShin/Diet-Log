import React, { Dispatch } from 'react';
import { connect } from 'react-redux';
import { ACTION_TYPES } from '../actions/actionTypes';

interface StateProps {
  currentUser: AuthState;
}

interface DispatchProps {
  uploadImages: (files: FileList) => void;
}

type Props = StateProps & DispatchProps;

class UploadButtonContainer extends React.PureComponent<Props> {
  render() {
    if (!this.props.currentUser) {
      return null;
    }

    return (
      <div>
        <input type="file" multiple onChange={this.handleChangeFileInput} />
      </div>
    );
  }

  private handleChangeFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { uploadImages } = this.props;

    const files = e.target.files;
    if (files && files.length > 0) {
      uploadImages(files);
    }
  };

  private handleClickUploadButton = () => {
    console.log('FIRED');
  };
}

function mapStateToProps(state: AppState) {
  return {
    currentUser: state.auth,
  };
}

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchProps => {
  return {
    uploadImages: (files: FileList) => {
      dispatch({
        type: ACTION_TYPES.UPLOAD_IMAGES,
        payload: {
          files,
        },
      });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadButtonContainer);
