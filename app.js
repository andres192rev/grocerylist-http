

const http = require('http');
const url = require('node:url');
const port = 3000;




const { createLogger, transports, format} = require('winston');

// create the logger
const logger = createLogger({
    level: 'info', // this will log only messages with the level 'info' and above
    format: format.combine(
        format.timestamp(),
        format.printf(({timestamp, level, message}) => {
            return `${timestamp} [${level}]: ${message}`;
        })
    ),
    transports: [
        new transports.Console(), // log to the console
        new transports.File({ filename: 'app.log'}), // log to a file
    ]
})


process.on('uncaughtException', (error) => {
    logger.error('Uncaught Exception:', error);
    // perform some kind of cleanup if needed
    logger.on('finish', () => {
        process.exit(1);
    })
})


//Our grocery list to be modifying 
const groceryList = [];




//creates the web server 
const server = http.createServer((req,res)  => {

    //http methods contained in the call back function
    
    //Get method to return grocery list 
    // specify http request to be used and the url of the request

    if (req.method === 'GET' && req.url === '/api/groceryList'){
        //our response code and content type in the header 
        res.writeHead(200, { 'Content-Type': 'application/json'});
        //our data to send in response in a format json can understand
        data = groceryList;
        //convert to json object and send as http response
        
        res.end(JSON.stringify(data));
        // using the logger
        logger.info("Getting Grocery List: " + JSON.stringify(data));


    
    }
    //add item to list
    //POST 
    else if(req.method === 'POST' && req.url === '/api/addItem'){

        
        let body = '';
        req.on('data', (chunk) => {
            body+= chunk;
        });

        

        req.on('end', () =>{
            const groceryItem  = JSON.parse(body);
            
            // using the logger
            logger.info("Adding grocery item: " + JSON.stringify(groceryItem));

            //ADD DATA ITEM TO ARAY
            groceryList.push(groceryItem);

            res.writeHead(201, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({message: 'resource created successfully'}));
        });

    }
    //Edit an existing grocery item in the list
    else if(req.method === "PUT" && req.url === '/api/editItem'){
        
        //the body that we will recieve from the request
        let body = '';
        req.on('data', (chunk) => {
            body += chunk;
        });

        req.on('end', () => {
            const groceryItem = JSON.parse(body);
          
            groceryList[groceryItem.id] = groceryItem;

            logger.info("new item updated" + JSON.stringify(groceryItem));
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({message: 'Resource Created Successfully!'}));
        });
    }

    else if(req.method === "DELETE"){
        const requestUrl = url.parse(req.url).query;
        // request url contains index
        logger.info("deleting item at index: " + requestUrl);
        
        //splice from list
        const removedItem = groceryList.splice(requestUrl,1);
       
        logger.info(JSON.stringify(removedItem[0]) + " has been removed");

        res.writeHead(201, {'Content-Type': 'application/json'});
        
        res.end(JSON.stringify({message: 'Resource Deleted Successfully!'}));
    }
    else{
        res.writeHead(404, {'Content-Type': 'text/plain'});
         // using the logger
         logger.error("something went wrong idk");

        res.end('Not Found');
    }
        

        



})


//use the port
server.listen(port, () => {
    console.log(`Server is listening on port http://localhost:${port}`);
})