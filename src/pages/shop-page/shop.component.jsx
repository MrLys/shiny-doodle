import React from "react";
import {Route} from "react-router-dom";
import {connect} from "react-redux";
import {fetchCollectionStart} from "../../redux/shop/shop.actions";
import {selectIsCollectionFetching, selectIsCollectionLoaded} from "../../redux/shop/shop.selector";
import {createStructuredSelector} from "reselect";
import CollectionsOverviewContainer from "../../components/collections-overview/collections-overview.container";
import CollectionPageContainer from "../collection/collection.container";

class ShopPage extends React.Component {

  componentDidMount() {
    const { fetchCollectionStart } = this.props;
    fetchCollectionStart();
  }
  render() {
    const { match } = this.props;
    return (
      <div className="shop-page">
        <Route
          exact
          path={`${match.path}`}
          component={CollectionsOverviewContainer}
        />
        <Route
          exact
          path={`${match.path}/:collectionId`}
          component={CollectionPageContainer}
        />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
    isCollectionLoaded: selectIsCollectionLoaded,
    isCollectionFetching: selectIsCollectionFetching
});
const mapDispatchToProps = (dispatch) => ({
  fetchCollectionStart: () => dispatch(fetchCollectionStart())
});
export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);
