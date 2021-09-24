
import React, {useEffect} from 'react';
import './shop.styles.scss';
import {Route} from 'react-router-dom';

// import WithSpinner from '../../components/with-spinner/with-spinner.component';

// import CollectionOverview from '../../components/collection-overview/collection-overview.component';
// import CollectionPage from '../collection/collection.component';

import CollectionOverviewContainer from '../../components/collection-overview/collection-overview.container';
import CollectionPageContainer from '../collection/collection.container';

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
// import {firestore,convertCollectionsSnapshotToMap,} from '../../firebase/firebase.utils.js';
//import { updateCollections } from '../../redux/shop/shop.actions';
//import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions';
import {fetchCollectionsStart} from '../../redux/shop/shop.actions';
// import {selectIsCollectionFetching, selectIsCollectionLoaded} from '../../redux/shop/shop.selector';
// import { createStructuredSelector } from 'reselect';


// const CollectionOverviewWithSpinner = WithSpinner(CollectionOverview); 
// const CollectionPageWithSpinner = WithSpinner(CollectionPage); 
//WithSpinner is a higher order compoennt that takes a component 
//and returns a new component(CollectionOverviewWithSpinner, CollectionPageWithSpinner) 
//which is returning either a Spinner component or passed component depending on the isLoading paramter

//converting class component to function component using useEffect for lifecycle method
//class ShopPage extends React.Component {
const ShopPage = ({fetchCollectionsStart,match}) => {
  //  state = {
  //    isLoading:true
  //  }
   //This is new introduced in React updated versions that no need to give constructor super and then state
   //Just can give state directly, and it will implement super under the hood now

    //unsubscribeFromSnapshot = null;

    useEffect(()=>{
      fetchCollectionsStart();
    },[fetchCollectionsStart])
    //componentDidMount() {
      // const { updateCollections } = this.props;
      // const collectionRef = firestore.collection('collections');

      //Promise pattern
      // collectionRef.get().then((snapshot) => {
      //   const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
      //   updateCollections(collectionsMap);
      //   this.setState({isLoading:false}); 
      //   //setting isLoading to false that is no need to show spinner when data has been fetched
      // });

        // REST API
        // fetch(
        //     'https://firestore.googleapis.com/v1/projects/crwn-db-90478/databases/(default)/documents/collections'
        // ).then(response => response.json())
        // .then(collections => console.log("collections", collections))

        //Observable pattern
        // collectionRef.onSnapshot(async snapshot => {
        //     const collectionsMap = convertCollectionsSnapshotToMap(snapshot);    
        //     updateCollections(collectionsMap);
        //     this.setState({ loading : false});
        // })

        //we will get collection values set in redux "collections" only when
        //this component will execute, if we have some component that needs
        //this collection data and have no dependency on this component then
        //we have to repeat the same code over there also, to avoid it we can
        //move this "collections" load to redux
        
        //this.props.fetchCollectionsStartAsync();
        //this.props.fetchCollectionsStart();
    //}
  
    //render() {
      //const { match, isLoading ,isCollectionLoaded } = this.props;
      //const {isLoading} = this.state;
      //const { match } = this.props;
      return (
        <div className='shop-page'>
          {/* <Route exact path={`${match.path}`} component={CollectionOverview} />
          <Route path={`${match.path}/:collectionId`} component={CollectionPage}/> */}

          {/* When we give component then component automatically gets access to all the history, match etc props 
          so using render, we need to pass props so it still has access to all those props 
          render is a function which gives access to the same props 
          and will have to use render since have to pass extra parameter also (isLoading) along with it's own props*/}
          
          {/* <Route exact path={`${match.path}`} render={(props) => <CollectionOverviewWithSpinner isLoading={isLoading} {...props}/>} />
          <Route path={`${match.path}/:collectionId`} render={(props) => <CollectionPageWithSpinner isLoading={!isCollectionLoaded} {...props}/>} /> */}

          <Route exact path={`${match.path}`} component={CollectionOverviewContainer} />
          <Route path={`${match.path}/:collectionId`} component={CollectionPageContainer}/>

        </div>
      );
    }
  //}
  
  // const mapStateToProps = createStructuredSelector({
  //   isLoading: selectIsCollectionFetching,
  //   isCollectionLoaded : selectIsCollectionLoaded
  // })

  const mapDispatchToProps = (dispatch) => ({
    //updateCollections: (collectionsMap) => dispatch(updateCollections(collectionsMap)),
    //fetchCollectionsStartAsync : () => dispatch(fetchCollectionsStartAsync())
    fetchCollectionsStart: ()=> dispatch(fetchCollectionsStart())
  });
  
  //export default connect(null, mapDispatchToProps)(ShopPage);
  //export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);
  export default connect(null, mapDispatchToProps)(ShopPage);

