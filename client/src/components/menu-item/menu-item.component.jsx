
import React from 'react';
import './menu-item.styles.scss';
import {withRouter} from 'react-router-dom';

// withRouter is a Higher Order Component. Higer Order Component is a function that takes component 
// as an argument and returns a new modified component. 


const MenuItem = ({title, imageUrl, size, history, match, linkUrl, location}) => {
    // console.log('history',history);
    // console.log('match',match);
    // console.log('location',location);
    return(
        <div className={`menu-item ${size}`} onClick={()=>history.push(`${match.url}${linkUrl}`)}>
        <div className="background-image" style={{
            backgroundImage: `url(${imageUrl})`
        }}/>
        <div className="content">
            <h1 className="title">{title.toUpperCase()}</h1>
            <span className="subtitle">SHOP NOW</span>
        </div>
    </div>
    )
}

export default withRouter(MenuItem); 
//by wrapping like this, it wil have access to all history, location and match props
//otherwise only homepage component (or any component in which route is being called - component name given in Route in App.js for specific route) 
//has ideally access to these router props (history, location and match) and to access the same in other 
//components , will have to pass the same as props in all child components (from home, home to directory, directory to menu-item)
//which is called props drilling or props tunneling. To avoid this, HOC (Higher Order Components) are being used

//history has method 'push(path)' which takes path as an argument. This method is used to redirect to specific path

//match has 'url' and 'path' paramter which returns the current url, path, we are on, which in this is '/'. 
//'path' is the path given while redirecting in App.js and 'url' is final url that builds up. 
//Like path is '/shop/:collectionId' and url is '/shop/hats' , '/shop/jackets'
//path and url is same if it does not have dynamic paramter passed
//match has also the 'params' paramter which is an object and has values passed as param while redirecting like passed in shop page  <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
//so params will have the collectionId passed in paramter in params object (params: {collectionId: "hats"}) so can access the same using: match.params.collectionId

//location has also the 'pathname' paramter which is the current url like '/shop/hats'. Location is usually not used much