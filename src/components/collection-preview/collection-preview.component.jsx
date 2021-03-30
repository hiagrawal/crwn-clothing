
import React from 'react';
import './collection-preview.styles.scss';
import CollectionItem from '../collection-item/collection-item.component';

const CollectionPreview = ({title, items}) => (
  <div className="collection-preview">
      <div className="title">{title.toUpperCase()}</div>
      <div className="preview">
        {
            items.filter((item, id) => id<4).map(({id, ...otherItemProps}) => (
                <CollectionItem key={id} {...otherItemProps}/>
            ))
        }
      </div>
  </div>
)

export default CollectionPreview;