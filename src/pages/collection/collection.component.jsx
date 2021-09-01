import React, {useEffect} from 'react';
import './collection.styles.scss';

import {connect} from 'react-redux';
import { selectCollection } from '../../redux/shop/shop.selector';

import CollectionItem from '../../components/collection-item/collection-item.component';

import { firestore } from '../../firebase/firebase.utils';

const CollectionPage = ({match,location,collection}) => {
    // console.log(match);
    // console.log(location);
    // console.log(match.params.collectionId);
    // console.log(collection);

    //an example of componentWillMount feature with useEffect (Just for reference, we dont need this functioanlity here)
    //if we return another function from useEffect function then that function is called cleanup function. 
    //and Cleanup function gets called when component will unmount.
    //(Just for reference, we dont need this functioanlity here)
    // useEffect(() => {
    //     console.log("I am subscribing");
    //     const unsubscribeFromCollections = firestore.collection("collections").onSnapshot(snapshot =>console.log(snapshot));
    //     return () => {
    //         console.log("I am subscribing");
    //         unsubscribeFromCollections();
    //     };
    // },[])

    const {title, items} = collection;
    return(
        <div className="collection-page">
            <div className="title">{title}</div>
            <div className="items">
                {
                    items.map((item) => (
                        <CollectionItem key={item.id} item={item}/>
                    ))
                }
            </div>
        </div>
)}

const mapStateToProps = (state, ownProps) => ({
    collection: selectCollection(ownProps.match.params.collectionId)(state)
})
//ownProps is an optional second parameter which gives us the access to all the 'own props'(here match) of the component on which it is called(here CollectionPage)

export default connect(mapStateToProps)(CollectionPage);