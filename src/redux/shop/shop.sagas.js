import ShopActionTypes from "./shop.types";
import {
  convertCollectionsSnapshot,
  firestore,
} from "../../firebase/firebase.util";
import { fetchCollectionFailure, fetchCollectionSuccess } from "./shop.actions";
import { call, put, takeLatest } from "redux-saga/effects";

export function* fetchCollectionAsync() {
  try {
    const collectionRef = firestore.collection("collections");
    const snapshot = yield collectionRef.get();
    const collectionMap = yield call(convertCollectionsSnapshot, snapshot);
    yield put(fetchCollectionSuccess(collectionMap));
  } catch (error) {
    yield put(fetchCollectionFailure(error));
  }
}

export function* fetchCollectionStart() {
  yield takeLatest(
    ShopActionTypes.FETCH_COLLECTIONS_START,
    fetchCollectionAsync
  );
}
