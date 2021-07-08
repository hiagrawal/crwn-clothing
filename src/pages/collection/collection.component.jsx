import React from 'react';
import './collection.styles.scss';

const CollectionPage = ({match}) => {
    console.log(match);
    return(
        <div className="collection-page">
            <h2>Collection Page</h2>
        </div>
)}

export default CollectionPage;

//ownProps is an optional second parameter which gives us the access to all the 'own props' of the component on which it is called