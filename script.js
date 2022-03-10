// Empty list to stored into the localStorage after adding
let itemsList = []

// Class to define an item
// method to get item, and set item

class ITEMS {
    constructor(){
        this.id = 0;
        this.itemName = "---";
        this.quantity = 0;
        this.purPrice = 0;
        this.sellPrice = 0;
        this.purDate = "--/--/--";
        this.sellDate = "--/--/--"
    }
// getItem will return an object 
// which will be later transformed into a JSON object

    getItem(itemsList, itemId){
        for(let i=0; i<itemsList.length; i++){
        if(itemsList[i].ID==itemId){
            return {
                ID: itemsList[i].ID,
                NAME: itemsList[i].NAME,
                QTY: itemsList[i].QUANTITY, 
                PURCHASE_PRICE: itemsList[i].PURCHASE_PRICE,
                PURCHASE_DATE: itemsList[i].PURCHASE_DATE
            }
        }
    }
        return "ID is incorrect/does not exist"
        }
//setItem is for adding and updating a new item
    setItem(id, itemName, quantity, purPrice, purDate){
    
        const itemObject = { 
            ID: id,
            NAME: itemName,
            QUANTITY: quantity,
            PURCHASE_PRICE: purPrice,
            SELLING_PRICE: 0,
            PURCHASE_DATE: purDate,
            SELL_DATE: "n.a"
        }
        return itemObject
}
}
// All DOM definitions 
let newItem = new ITEMS()

const lookupDiv = document.getElementById("lookup")
const container = document.getElementById("cont");
const IdLookup = document.getElementById("lookup-id")
const getItem = document.getElementById("get-item")
const getItemBtn = document.getElementById("get-item-div") 
const setItem = document.getElementById("set-item")
const setItemBtn = document.getElementById("set-item-div") 
const btnContainer = document.getElementById("btn-container")
const containerDiv = document.getElementById("form-render")
const msgContainer = document.getElementById("message")
msgContainer.style.display = "none";

 





//Dynamically generating a FORM

// Event listener for click on the LOOKUP ITEM button
getItem.addEventListener("click", function(){
    // fetch input ID
    itemsList = JSON.parse(localStorage.getItem("items-list"))
    let lookupInputId = IdLookup.value
    let ItemDet = newItem.getItem(itemsList, lookupInputId) 
    msgContainer.style.display = "block"
    // if item ID is not undefined then...
    if(ItemDet.ID && itemsList!=[]){
    
    msgContainer.innerHTML = `ITEM ID: ${ItemDet.ID} </br>  ITEM NAME: ${ItemDet.NAME} </br> ITEM QUANTITY: ${ItemDet.QTY} </br> PURCHASE DATE: ${ItemDet.PURCHASE_DATE}`;
    return true
} else {
    msgContainer.style.background = "brown";
    msgContainer.innerHTML = "Incorrect ID or Item does not exist";
    return false
}
})

// Hiding elements which are not necessary
function hideElementAddItemMode(){
    lookupDiv.style.display = "none";
    getItemBtn.style.display = "none";
    setItemBtn.style.display = "none";
    container.style.display = "none"
}




// Rendering the Add Item Form
function renderForm(){
    msgContainer.style.display = "none";
    containerDiv.innerHTML  = `
    <h1>ENTER ITEM DETAILS</h1>
    <form action="submission.html" autocomplete="off">
    <label for="item-id">ITEM ID:</label><input type="number" class="form-input" name="itemID" id="item-id" required><br/>
    <label for="item-name">ITEM NAME:</label><input type="text" class="form-input" name="itemName" id="item-name" required><br/>
    <label for="item-qty">QUANTITY:</label> <input type="number" class="form-input" name="quantity" id="item-qty" required><br/>
    <label for="purchase-price">PURCHASE PRICE PER UNIT:</label><input type="number" name="purPrice"  class="form-input" id="purchase-price" required><br/>
    <label for="purchase-date">PURCHASE DATE:</label><input type="date" class="form-input" name="purchDate" id="purchase-date" required><br/>
    <input id="confirm-item" class="form-btn" name="confirm" value="CONFIRM ITEM DETAILS" type="submit">
    <button id="back-btn" class="form-btn" onclick="unhideElements()">GO BACK</button>
    </br></br><div id="display-after-add"></div>
    </form>`
}

// Unhiding Elements 
function unhideElements(){
    let leavePageConfirm = confirm("ALL FORM DATA WILL BE DELETED")
    if(leavePageConfirm==false){
        return 
    }
    lookupDiv.style.display = "block";
    getItemBtn.style.display = "block";
    setItemBtn.style.display = "block";
    containerDiv.innerHTML = "";
    container.style.display = "block"
}





// Adding an event listener to the ADD ITEM button
setItem.addEventListener("click", function(){
    
    hideElementAddItemMode() //hides the other buttons 
    renderForm() // Renders the form
    document.getElementById("confirm-item").disabled = true;
    const inputFields = document.querySelectorAll("input");
    const validInputs = Array.from(inputFields)
    
    for(let i=0; i<validInputs.length; i++){
        if(validInputs[i]!==""){
            document.getElementById("confirm-item").disabled = false;
        }
    }
    

    document.getElementById("confirm-item").addEventListener("click", function(){

        
        // Set all values
        const itemId = document.getElementById("item-id").value
        const itemName = document.getElementById("item-name").value
        const quantity = document.getElementById("item-qty").value
        const purPrice = document.getElementById("purchase-price").value
        const purDate = document.getElementById("purchase-date").value
        const displayAfterAdd = document.getElementById("display-after-add")


        // Set the globally assigned newItem object
        const itemObject = newItem.setItem(itemId, itemName, quantity, purPrice, purDate)

        // Running a loop to check for duplicate IDs and Names before pushing item.
        let i = 0;
        while(itemsList!==[] && i<itemsList.length){
            if(itemsList[i].ID===itemObject.ID | itemsList.NAME===itemObject.NAME){
                console.log("Item already exists")
                return undefined }
            i++}


        
        // Display the object data. 
        displayAfterAdd.innerHTML = `RECENTLY ADDED ITEM:- </br></br>ITEM ID: ${itemObject.ID} </br>  ITEM NAME: ${itemObject.NAME} </br> ITEM QUANTITY: ${itemObject.QUANTITY} </br> PURCHASE DATE: ${itemObject.PURCHASE_DATE} </br> PURCHASE PRICE: ${itemObject.PURCHASE_PRICE}`;
        // Option to Delete the object.

        // Pushing Item into the global itemsList and logging out to check.    
        itemsList.push(itemObject)
        // Storing list in local storage
        localStorage.setItem("items-list",JSON.stringify(itemsList))


        console.log(itemObject)
        console.log(JSON.parse(localStorage.getItem("items-list")))
        
})
    
})

document.getElementById("list").innerHTML = localStorage.getItem("items-list")
