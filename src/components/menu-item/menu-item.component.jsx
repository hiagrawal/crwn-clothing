
import React from 'react';
import './menu-item.styles.scss';
import {withRouter} from 'react-router-dom';

// withRouter is a Higher Order Component. Higer Order Component is a function that takes component 
// as an argument and returns a new modified component. 


const MenuItem = ({title, imageUrl, size, history, match, linkUrl}) => (
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

export default withRouter(MenuItem); 
//by wrapping like this, it wil have access to all history, location and match props
//otherwise only homepage component (or any component in which route is being called - component name given in Route in App.js for specific route) 
//has ideally access to these router props (history, location and match) and to access the same in other 
//components , will have to pass the same as props in all child components (from home, home to directory, directory to menu-item)
//which is called props drilling or props tunneling. To avoid this, HOC (Higher Order Components) are being used