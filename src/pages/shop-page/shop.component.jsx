import React from 'react';
import CollectionOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from "../collection/collection.component";
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { convertCollectionsSnapshot, firestore } from "../../firebase/firebase.util";
import updateCollections from "../../redux/shop/shop.actions";

class ShopPage extends React.Component {

    unsubscribeFromSnapshot = null;

    componentDidMount() {
        const collectionRef = firestore.collection('collections');
        const { updateCollections } = this.props;
        this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
            updateCollections(await convertCollectionsSnapshot(snapshot));
        });
    }
    render() {
        const { match } = this.props;
        return (
            <div className='shop-page'>
                <Route exact path={`${match.path}`} component={CollectionOverview}/>
                <Route exact path={`${match.path}/:collectionId`} component={CollectionPage}/>
            </div>
        )
    }
};
const mapDispatchToProps = dispatch => ({
    updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
});
export default connect(null, mapDispatchToProps)(ShopPage);