

const http = require('http');
const port = 3000;
const { serviceGetList, serviceAddItem, serviceEditItem, serviceDeleteItem, noAPI} = require('../src/service.js');


//creates the web server 
const server = http.createServer((req,res)  => {
    //http methods contained in the call back function
    
    //Get method to return grocery list 
    // specify http request to be used and the url of the request
    if (req.method === 'GET' && req.url === '/api/groceryList'){
        serviceGetList(res,req);
    }
    else if(req.method === 'POST' && req.url === '/api/addItem'){
        
        serviceAddItem(res,req);
    }
    else if(req.method === "PUT" && req.url === '/api/editItem'){
        serviceEditItem(res,req);
    }
    else if(req.method === "DELETE"){
        serviceDeleteItem(res,req);
    }
    else{
        noAPI(res,req);
    }
})


//use the port
server.listen(port, () => {
    console.log(`Server is listening on port http://localhost:${port}`);
})