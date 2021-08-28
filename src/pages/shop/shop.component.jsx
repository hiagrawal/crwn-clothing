
import React from 'react';
import './shop.styles.scss';
import CollectionOverview from '../../components/collection-overview/collection-overview.component';

import {Route} from 'react-router-dom';
import CollectionPage from '../collection/collection.component';

//We need to get the shop data from firebase store and push it to redux
//we can get the shop data when component loads that is componentDidMount 
//and for this, we will hav eto convert our function component into class component
//get the data from firebase store and store in into the redux using action method
//and for that, will have to create shop action, shop type files and update the shop reducer also
/*const ShopPage  = ({match,location,history}) => {
    console.log(match);
    console.log(location);
    console.log(history);
    return (
            <div className="shop-page">
                <Route exact path={`${match.path}`} component={CollectionOverview} />
                <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
            </div>
        )
}

export default ShopPage;*/

import { connect } from 'react-redux';
import {firestore,convertCollectionsSnapshotToMap,} from '../../firebase/firebase.utils.js';
import { updateCollections } from '../../redux/shop/shop.actions';
  

class ShopPage extends React.Component {
    unsubscribeFromSnapshot = null;
  
    componentDidMount() {
      const { updateCollections } = this.props;
      const collectionRef = firestore.collection('collections');
  
      collectionRef.get().then((snapshot) => {
        const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
        updateCollections(collectionsMap);
      });
    }
  
    render() {
      const { match } = this.props;
      return (
        <div className='shop-page'>
          <Route exact path={`${match.path}`} component={CollectionOverview} />
          <Route path={`${match.path}/:collectionId`} component={CollectionPage}/>
        </div>
      );
    }
  }
  
  const mapDispatchToProps = (dispatch) => ({
    updateCollections: (collectionsMap) => dispatch(updateCollections(collectionsMap)),
  });
  
  export default connect(null, mapDispatchToProps)(ShopPage);