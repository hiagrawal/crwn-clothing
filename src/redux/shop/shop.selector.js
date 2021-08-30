
import {createSelector} from 'reselect';

// will not need thi swith data normalization
// const COLLECTION_ID_MAP = {
//     hats: 1,
//     sneakers: 2,
//     jackets : 3,
//     womens : 4,
//     mens : 5
// }

const selectShop = state =>state.shop;

export const selectCollections = createSelector(
    [selectShop],
    (shop)=>shop.collections
)

/*export const selectCollection = collectionUrlParam => createSelector(
    [selectCollections],
    (collections)=>collections.find(collection=> collection.id === COLLECTION_ID_MAP[collectionUrlParam])
)*/
//issue with this selectCollection find operation is in real time when there will be 1000 of records then it will iterate over
//each array element to check if there is id matching so id which it wants is 1000 so it will get iterated 999 times to get that 
//1000th element
//to fix this, instead of array, use an object and can get data directly through collectionUrlParam
//this conversion of array to object is called 'data normalization' that is store list of elements as objects instead of arrays

//now we make collections data (shop data) as objects, we still have items as array only, which is fine till the time we don't 
//have to search for a particular item and iterate over that array.
//If we have, let's say, a product page, where on click on each item, we redirect to particular item/product details, 
//in that case, we had to iterate over the items array to find particular item and show it's details.
// In that case, we would had to normalize array items as well and convert it into object 
//but as of now, as per our application, keeping items as arrays is fine

//converted shop data to object so now instead of finding, directly ggetting the data using key
export const selectCollection = collectionUrlParam => createSelector(
    [selectCollections],
    (collections)=>collections ? collections[collectionUrlParam] : null
)

//we learned about Objects (Hash Table data structure) being better for searching for items than Array. 
//This is a common computing optimization when talking about data structures. 
//If you want to learn more about why this is, 
//this is a great resource for you to use: https://www.kirupa.com/html5/hashtables_vs_arrays.htm

//Now since we converted shop data into objects instaed of arrays so CollectionOverview which was iterating over
//the collections array will now start throwing error. 
//to make it working, we will have to convert collections that we are passing in 'selectCollections' selector to arrays

export const selectCollectionsForPreview = createSelector(
    [selectCollections],
    (collections)=>collections ? Object.keys(collections).map(key => collections[key]) : []
)
//In this, we are getting keys which is ['hats','jackets','sneakers','womens','mens'] and iterating over this array to get hats
//data by getting from collections object and passing hats, jackets etc so returning an array with objects like we had our shop data earlier

export const selectIsCollectionFetching = createSelector(
    [selectShop],
    shop => shop.isFetching
)
