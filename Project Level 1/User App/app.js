
// step: 8 = get addUser button, get username text field in JS
const addUserBtn = document.getElementById("addUser");
const addUserBtnAfterEdit = addUserBtn.innerText; //step:30
const usernameTextField = document.getElementById("username");

//step:19 = getElementById of tbody form index.html
const recordsDisplay = document.getElementById('records');


//setp:26 = define edit_id variable
let edit_id = null;


let userArray = []; //step 11 >>> It happens only after click addUserBtn >>>got to step9 field and place userArray.push()


//step:15 = to save data in local storage permanently ------[get previously added data >> add new data >> save total data]
let objStr = localStorage.getItem('users');






// step: 16 //convert obj string into object[key:value] format >>> and again place in to userArray
if (objStr != null && objStr != undefined) { // it is because blank object or null-JSON or Undefined-JSON can not be parsed
    userArray = JSON.parse(objStr)
}






displayInfo() //step:21 // call the displayInfo

//step:9 = click event on addUser button ==> while click, value comes from usernameTExtField
addUserBtn.addEventListener("click", function () {
    const name = usernameTextField.value.trim();

    if (name === "") {
        alert("Username cannot be blank!"); // Prevent blank entry
        return;
    }


    if (edit_id !== null && name !== "") { //step:32 = Prevent edited text from being saved as a new item
        //edit
        userArray.splice(edit_id, 1, { 'name': name }); //step: 33 = first delete the clicked item then add new item
        edit_id = null; //step: 34 = to prevent re-update on previously edited item
    } else {
        //insert
        userArray.push({ 'name': name });
    }


    saveInfo(userArray); //Save the data entered [ie: userArray] [to be saved in array format containing object] [{Key:value}]
    usernameTextField.value = ''; //Clear the text field after click on "add-User" button
    // displayInfo() //step:22
    addUserBtn.innerText = addUserBtnAfterEdit //step:31 = As it was, button text after edit

});






//step:10: Create 4 functions => saveInfo, displayInfo, editInfo, deleteInfo
function saveInfo(userArray) {

    let strValue = JSON.stringify(userArray) //step: 14 // to save userArray's obj-value as string >>> in step13's value
    localStorage.setItem('users', strValue) //step: 13 // key=>string, val=>string

    displayInfo() //step:35
}






//step:17 = to display stored data from localStorage [display userArray]
function displayInfo() {
    let statement = '';

    userArray.forEach((everyone, i) => { //step:18 = display each item as html: set html table-row element
        //step:23 = make the table-row dynamic [update each item as entered in text area]
        statement += `<tr>
            <th scope="row">${i + 1}</th> 
            <td>${everyone.name}</td>
            <td><i class="btn text-white fa fa-edit btn-info mx-3" onclick='editInfo(${i})'></i><i class=" btn btn-danger fa fa-trash-o" onclick='deleteInfo(${i})'></i></td>
        </tr>`;
    })


    recordsDisplay.innerHTML = statement; //step:20 => each table(statement variable) will be placed on recordsDisplay(ie. tdody in index.html)
}






//step:27
function editInfo(id) {

    edit_id = id;
    usernameTextField.value = userArray[id].name;  //step: 28

    addUserBtn.innerText = "Save Changes" //step:29 = while editing >>> button text  

}





//step:25 remove items from 'userArray'
function deleteInfo(id) {
    if (confirm("Are you sure you want to delete this user?")) {
        userArray.splice(id, 1);   // delete from 'id' and 1 item
        saveInfo(userArray);  // after delete, need to save remaining records
        // displayInfo();  // after save, need to display reamining records
    }
}










