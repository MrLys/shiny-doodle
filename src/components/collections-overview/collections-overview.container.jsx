import React from "react";
import WithSpinner from "../with-spinner/with-spinner.component";
import CollectionOverview from "./collections-overview.component";
import { selectIsCollectionFetching } from "../../redux/shop/shop.selector";
import {createStructuredSelector} from "reselect";
import {connect} from "react-redux";
import {compose} from "redux";

const mapStateToProps = createStructuredSelector({
    isLoading: selectIsCollectionFetching
});

const CollectionsOverviewContainer = compose(connect(mapStateToProps), WithSpinner)(CollectionOverview);

export default CollectionsOverviewContainer;
