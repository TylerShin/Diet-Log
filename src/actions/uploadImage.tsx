import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/database';
import { take, call, put } from 'redux-saga/effects';
import { ACTION_TYPES } from './actionTypes';

async function uploadToFirebase(files: FileList): Promise<string[]> {
  const storageRef = firebase.storage().ref();

  const fileList = Array.from(files);
  const res: string[] = await Promise.all(
    fileList.map(async file => {
      const ref = storageRef.child(`diet-log/${file.name}`);
      await ref.put(file);
      const url = await ref.getDownloadURL();
      return url;
    })
  );
  return res;
}

export function* uploadImages(files: FileList) {
  yield put({ type: ACTION_TYPES.START_TO_UPLOAD_IMAGES });
  try {
    const downloadUrls = yield call(uploadToFirebase, files);
    yield put({ type: ACTION_TYPES.SUCCEED_TO_UPLOAD_IMAGES });
    return downloadUrls;
  } catch (err) {
    yield put({ type: ACTION_TYPES.FAIL_TO_UPLOAD_IMAGES });
  }
}

async function saveToFirebaseDB(downloadUrls: string[]) {
  const database = firebase.database();
  await Promise.all(
    downloadUrls.map(async url => {
      const newPostKey = database
        .ref()
        .child('images')
        .push().key;
      await database.ref().update({
        [`/images/${newPostKey}`]: {
          downloadURL: url,
          created_at: Date.now(),
        },
      });
    })
  );
}

export function* uploadImagesFlow() {
  while (true) {
    const action = yield take(ACTION_TYPES.UPLOAD_IMAGES);
    const downloadUrls = yield call(uploadImages, action.payload.files);
    yield put({ type: ACTION_TYPES.START_TO_UPDATE_DB });

    try {
      yield call(saveToFirebaseDB, downloadUrls);
      yield put({ type: ACTION_TYPES.SUCCEED_TO_UPDATE_DB });
    } catch (err) {
      console.error(err);
      yield put({ type: ACTION_TYPES.FAIL_TO_UPDATE_DB });
    }
  }
}
