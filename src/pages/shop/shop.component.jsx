
import React from 'react';
import './shop.styles.scss';
import CollectionOverview from '../../components/collection-overview/collection-overview.component';

import {Route} from 'react-router-dom';
import CollectionPage from '../collection/collection.component';

const ShopPage  = ({match,location,history}) => {
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

export default ShopPage;

