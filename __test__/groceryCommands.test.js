//tests for grocery api commands: 
// {getGroceryList, addGroceryItem, editGroceryItem, deleteGroceryItem};

const { getGroceryList, addGroceryItem, editGroceryItem, deleteGroceryItem, resetList } = require("../src/groceryCommands");

const mockGetGroceryList = jest.fn();

describe("Grocery Api Tests", () => {
    //Arrange
    let groceryItem0 = { 
        "id": 0,
        "productName": "Cookies",
        "price": 91.99,
        "qty": 5,
        "purchased": false
    };
    let groceryItem1 = {
        "id": 0,
        "productName": "hotdog",
        "price": 9.99,
        "qty": 5,
        "purchased": false
    };
    let groceryItem2 = {
        "id": 2,
        "productName": "banana",
        "price": 9.99,
        "qty": 5,
        "purchased": false
    };

    let expectedGroceryList = [];
    
    afterEach(() => {
        expectedGroceryList.length =0;
        resetList();
        console.log("clearing out list");
    });
    test('getGroceryList should return the groceryList when empty', () => {
        expect(getGroceryList()).toEqual(expectedGroceryList);
    })

    test('getGroceryList should return the list when there are items', () => {
        //const mockAddGroceryItem  = jest.fn(() => groceryList.push(groceryItem0));
        expectedGroceryList.push(groceryItem0);

        addGroceryItem(groceryItem0);
        expect(getGroceryList()).toEqual(expectedGroceryList);
    })

    test('addGroceryItem should add an item to the grocery list', () => {
        expectedGroceryList.push(groceryItem0);
        addGroceryItem(groceryItem0);

        expect(getGroceryList()).toEqual(expectedGroceryList);
    })

    test('editGroceryItem Should edit an existing item to the grocery list', () => {
        expectedGroceryList.push(groceryItem0);
        expectedGroceryList[0] = groceryItem1;
        addGroceryItem(groceryItem0);
        editGroceryItem(groceryItem1);
        expect(getGroceryList()).toEqual(expectedGroceryList);


    })

    test('deleteGroceryItem should delete an existing item using an index', () =>{
        expectedGroceryList.push(groceryItem0);
        let expectedRemoved = expectedGroceryList.pop();

        addGroceryItem(groceryItem0);
        let actualRemoved = deleteGroceryItem(0);

        expect(getGroceryList()).toEqual(expectedGroceryList);
    })

});