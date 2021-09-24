
import React from 'react';
import './directory.styles.scss';

import MenuItem from '../menu-item/menu-item.component';

// import SECTIONS_DATA from './sections.data';

import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {selectDirectorySections} from '../../redux/directory/directory.selector'


/*class Directory extends React.Component{
    constructor(){
        super();
        this.state = {
            sections:SECTIONS_DATA
        };
    }  
    
    render(){
        return (
            <div className="directory-menu">
                {
                    this.state.sections.map( ({title, imageUrl,id, size, linkUrl}) => (
                         <MenuItem key={id} title={title} imageUrl={imageUrl} size={size} linkUrl={linkUrl}/>
                    ))
                }   
                
            </div>
        );
        
    }
}

export default Directory;*/

const Directory = ({sections}) => (
    <div className="directory-menu">
        {
            sections.map( ({title, imageUrl,id, size, linkUrl}) => (
                 <MenuItem key={id} title={title} imageUrl={imageUrl} size={size} linkUrl={linkUrl}/>
            ))
        }   
        
    </div>
);

const mapStateToProps = createStructuredSelector({
    sections:selectDirectorySections
})

export default connect(mapStateToProps)(Directory);
