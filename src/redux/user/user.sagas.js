import { all, call, put, takeLatest } from "redux-saga/effects";
import UserActionTypes from "./user.types";
import {
  auth,
  createUserProfileDocument,
  googleAuthProvider,
} from "../../firebase/firebase.util";
import {
  emailSignInFailure,
  emailSignInSuccess,
  googleSignInFailure,
  googleSignInSUCCESS,
} from "./user.actions";

export function* onGoogleSignInAsync() {
  try {
    const user = yield auth.signInWithPopup(googleAuthProvider);
    const userRef = yield call(createUserProfileDocument, user);
    const userSnapshot = yield userRef.get();
    yield put(
      googleSignInSUCCESS({ id: userSnapshot.id, ...userSnapshot.data() })
    );
  } catch (error) {
    yield put(googleSignInFailure(error));
  }
}

export function* onGoogleSignInStart() {
  yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, onGoogleSignInAsync);
}

export function* onEmailSignInAsync({ payload: { email, password } }) {
  try {
    const user = yield auth.signInWithEmailAndPassword(email, password);
    const userRef = yield call(createUserProfileDocument, user);
    const userSnapshot = yield userRef.get();
    yield put(
      emailSignInSuccess({ id: userSnapshot.id, ...userSnapshot.data() })
    );
  } catch (error) {
    yield put(emailSignInFailure(error));
  }
}

export function* onEmailSignInStart() {
  yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, onEmailSignInAsync);
}

export function* userSagas() {
  yield all([call(onGoogleSignInStart), call(onEmailSignInStart)]);
}
