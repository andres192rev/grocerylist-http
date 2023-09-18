//Our grocery list to be modifying 
const groceryList = [];

var logger=require('../src/logger.js');

//returns a json object of the crrent list
function getGroceryList(){
    //our data to send in response in a format json can understand
    let data = groceryList;
    
    return data;
}

//takes an grocery item as a json obect and adds it to the  and returns the json object back
function addGroceryItem(groceryItem){
    groceryList.push(groceryItem);
}

function editGroceryItem(groceryItem){
    groceryList[groceryItem.id] = groceryItem;
}

function deleteGroceryItem(index){
    //splice from list
    const removedItem = groceryList.splice(index,1);
    return removedItem[0];
}

function resetList(){
    groceryList.length =0;
}

module.exports = {getGroceryList, addGroceryItem, editGroceryItem, deleteGroceryItem, resetList};