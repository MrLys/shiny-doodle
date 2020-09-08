import ShopActionTypes from "./shop.types";
import {convertCollectionsSnapshot, firestore} from "../../firebase/firebase.util";

export const fetchCollectionStart = () => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_START,
});

export const fetchCollectionSuccess = collectionMap => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collectionMap
});

export const fetchCollectionFailure = errorMessage => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
  payload: errorMessage
});

export const fetchCollectionStartAsync = () => {
  return dispatch => {
    const collectionRef = firestore.collection("collections");
    dispatch(fetchCollectionStart());

    collectionRef.get().then(snapshot => {
      const collectionMap = convertCollectionsSnapshot(snapshot);
      dispatch(fetchCollectionSuccess(collectionMap));
    }).catch( error => dispatch(fetchCollectionFailure(error.message)));

  }
}

