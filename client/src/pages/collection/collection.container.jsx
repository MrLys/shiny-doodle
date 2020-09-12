import {compose} from "redux"
import WithSpinner from "../../components/with-spinner/with-spinner.component";
import CollectionPage from "./collection.component";
import { selectIsCollectionLoaded } from "../../redux/shop/shop.selector";
import {createStructuredSelector} from "reselect";
import {connect} from "react-redux";

const mapStateToProps = createStructuredSelector({
    isLoading: state => !selectIsCollectionLoaded(state)
});


const CollectionPageContainer = compose(connect(mapStateToProps), WithSpinner)(CollectionPage);

export default CollectionPageContainer;