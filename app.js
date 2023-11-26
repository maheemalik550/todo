
const firebaseConfig = {
  apiKey: "AIzaSyCSVJ7gQ-h04h7AIAta-xi7BekpSqq8YFE",
  authDomain: "todo-cb890.firebaseapp.com",
  databaseURL: "https://todo-cb890-default-rtdb.firebaseio.com",
  projectId: "todo-cb890",
  storageBucket: "todo-cb890.appspot.com",
  messagingSenderId: "955060285894",
  appId: "1:955060285894:web:fd30d51cc9efdf87cc82c7"
};

// Initialize Firebase
var app = firebase.initializeApp(firebaseConfig);
console.log(app.database)


firebase.database().ref("todos").on("child_added",function(data){
   
    var input = document.getElementById("input");
    var liElement = document.createElement("li");
    var liText = document.createTextNode(data.val().input);
    liElement.appendChild(liText);
    
    // ***********************delete btn***********************************
    var Deletebtn = document.createElement("button");
    var DeleteText = document.createTextNode("button")
    Deletebtn.appendChild(DeleteText);
    Deletebtn.setAttribute("id",data.val().key)
    liElement.appendChild(Deletebtn);
    Deletebtn.setAttribute("onclick","delet(this)");
    // ***********************edit btn***********************************
    var editbtn = document.createElement("button");
    var editbtnText = document.createTextNode("Edit");
    editbtn.appendChild(editbtnText);
    editbtn.setAttribute("id",data.val().key)
    liElement.appendChild(editbtn);
    editbtn.setAttribute("onclick","edit(this)");
    var list = document.getElementById("list");
list.appendChild(liElement);
})



function addtodo(){

    var input = document.getElementById("input");
    console.log(input.value)
    var key = firebase.database().ref("todos").push().key;
    console.log(key);

var obj ={
    input :input.value,
    key:key

}

firebase.database().ref("todos").child(key).set(obj);


input.value = "";
}
// **************************deleteall********************8
function deleteall(){
    var list = document.getElementById("list");
    firebase.database().ref("todos").remove();
    list.innerHTML = "";
}
// **************************delete todo********************8
function delet(a){
 console.log(a.id)
 firebase.database().ref("todos").child(a.id).remove()
    a.parentNode.remove();
}
// **************************edit********************8
function edit(e){
    var userInput = prompt("enter");

    var editobj ={
        input : userInput,
        key :e.id
    }
firebase.database().ref("todos").child(e.id).set(editobj)

    e.parentNode.firstChild.nodeValue = userInput;
}

