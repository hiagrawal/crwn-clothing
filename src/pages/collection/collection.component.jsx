import React from 'react';
import './collection.styles.scss';

import {connect} from 'react-redux';
import { selectCollection } from '../../redux/shop/shop.selector';

import CollectionItem from '../../components/collection-item/collection-item.component';

const CollectionPage = ({match,location,collection}) => {
    // console.log(match);
    // console.log(location);
    // console.log(match.params.collectionId);
    // console.log(collection);

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