
const url = require('node:url');
const port = 3000;
const { getGroceryList, editGroceryItem, addGroceryItem, deleteGroceryItem} = require('../src/groceryCommands');
var logger=require('../src/logger.js'); 
//res is the response



function serviceGetList(res,req) {
    //our response code and content type in the header 
    res.writeHead(200, { 'Content-Type': 'application/json'});
    //groceryDAO to get list
    let data = getGroceryList();
    //convert to json string to send as http response
    data = (JSON.stringify(data));
    //send as http response String
    res.end(data);
    logger.info("retrieved grocery list: " + data);
    
}

function serviceAddItem(res,req){

    let body = '';
        req.on('data', (chunk) => {
            body+= chunk;
        });

        req.on('end', () =>{
            const groceryItem  = JSON.parse(body);
            
            // using the logger
            logger.info("Adding grocery item: " + JSON.stringify(groceryItem));

            //ADD DATA ITEM TO ARAY
            addGroceryItem(groceryItem);

            res.writeHead(201, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({message: 'resource created successfully'}));
        });
}

function serviceEditItem(res,req){
    //the body that we will recieve from the request
    let body = '';
    req.on('data', (chunk) => {
        body += chunk;
    });

    req.on('end', () => {
        const groceryItem = JSON.parse(body);
        editGroceryItem(groceryItem);
        
        logger.info("new item updated: " + JSON.stringify(groceryItem));
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({message: 'Resource Created Successfully!'}));
    });        
}

function serviceDeleteItem(res,req){
    const requestUrl = url.parse(req.url).query;
        // request url contains index
        logger.info("deleting item at index: " + requestUrl);
        
        removedItem = deleteGroceryItem(requestUrl);
       
        logger.info(JSON.stringify(removedItem) + " has been removed");
        res.writeHead(201, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({message: 'Resource Deleted Successfully!'}));
    
}

function noAPI(res,req){
    res.writeHead(404, {'Content-Type': 'text/plain'});
        logger.error("NOT A FUNCTION");
        res.end('Not Found');
    
}
function resetList(){
    groceryList.length =0;
}

module.exports = {serviceGetList, serviceAddItem, serviceEditItem, serviceDeleteItem, resetList, noAPI};


