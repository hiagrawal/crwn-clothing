import React from 'react';
import './collection.styles.scss';

import {connect} from 'react-redux';
import { selectCollection } from '../../redux/shop/shop.selector';

const CollectionPage = ({match,collection}) => {
    console.log(match.params.collectionId);
    console.log(collection);
    return(
        <div className="collection-page">
            <h2>Collection Page</h2>
        </div>
)}

const mapStateToProps = (state, ownProps) => ({
    collection: selectCollection(ownProps.match.params.collectionId)(state)
})
//ownProps is an optional second parameter which gives us the access to all the 'own props'(here match) of the component on which it is called(here CollectionPage)

export default connect(mapStateToProps)(CollectionPage);