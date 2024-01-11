//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.

// Event handling, user interaction is what starts the code execution.

var taskInput=document.getElementById("new-task");
var addButton=document.getElementsByTagName("button")[0];
var incompletedTaskHolder=document.getElementById("incompleted-tasks");
var completedTasksHolder=document.getElementById("completed-tasks");


//New task list item
var createNewTaskElement=function(taskString){
  var listItem=document.createElement("li");
  var checkBox=document.createElement("input"); 
  var label=document.createElement("a");
  var editInput=document.createElement("input");
  var editButton=document.createElement("button");
  var deleteButton=document.createElement("button");
  var deleteButtonImg=document.createElement("img");
  
  listItem.className = "tasks-item"
  
  label.innerText=taskString;
  label.className="task";

  //Each elements, needs appending
  checkBox.type="checkbox";
  checkBox.className = "input__checkbox"
  editInput.type="text";
  editInput.className="task input__task";
  editButton.innerText="Edit"; //innerText encodes special characters, HTML does not.
  editButton.className="button__edit";
  deleteButton.className="button__delete";
  deleteButtonImg.src="./remove.svg";
  deleteButton.appendChild(deleteButtonImg);


  //and appending.
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
}

var addTask=function(){
  
  //Create a new list item with the text from the #new-task:
  if (!taskInput.value) return;
  var listItem=createNewTaskElement(taskInput.value);

  //Append listItem to incompleteTaskHolder
  incompletedTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
  taskInput.value="";
}

//Edit an existing task.
var editTask=function(){
  var listItem=this.parentNode;
  var editInput=listItem.querySelector(".input__task");
  var label=listItem.querySelector("a");
  var editBtn=listItem.querySelector("button.button__edit");
  var containsClass=listItem.classList.contains("edit-mode");
  //If class of the parent is .editmode
  if(containsClass){
    //switch to .editmode
    //label becomes the inputs value.
    label.innerText=editInput.value;
    editBtn.innerText="Edit";
  } else {
      editInput.value=label.innerText;
      editBtn.innerText="Save";
    }

  listItem.classList.toggle("edit-mode");
};

//Delete task.
var deleteTask=function(){
  var listItem=this.parentNode;
  var ul=listItem.parentNode;
  ul.removeChild(listItem);   //Remove the parent list item from the ul.
}

//Mark task completed
var taskCompleted=function(){
  //Append the task list item to the #completed-tasks
  var listItem=this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

var taskIncomplete=function(){
console.log("Incomplete Task...");
  //Mark task as incomplete.
  //When the checkbox is unchecked
  //Append the task list item to the #incomplete-tasks.
  var listItem=this.parentNode;
  incompletedTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem,taskCompleted);
}

var ajaxRequest=function(){
  console.log("AJAX Request");
}

//The glue to hold it all together.

//Set the click handler to the addTask function.
addButton.onclick=addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);

var bindTaskEvents=function(taskListItem,checkBoxEventHandler){
  //select ListItems children
  var checkBox=taskListItem.querySelector(".input__checkbox");
  var editButton=taskListItem.querySelector("button.button__edit");
  var deleteButton=taskListItem.querySelector("button.button__delete");

  editButton.onclick=editTask;
  deleteButton.onclick=deleteTask;
  checkBox.onchange=checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
//for each list item
for (var i=0; i<incompletedTaskHolder.children.length;i++)
  bindTaskEvents(incompletedTaskHolder.children[i],taskCompleted);  //bind events to list items chldren(tasksCompleted)

//cycle over completedTasksHolder ul list items
for (var i=0; i<completedTasksHolder.children.length;i++)
  bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);   //bind events to list items chldren(tasksIncompleted)

        //TODO:
// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.