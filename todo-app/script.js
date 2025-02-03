//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.

var taskInput=document.getElementById("new-task");//Add a new task.
var addButton=document.querySelector(".add-button");//first button
var incompleteTaskHolder=document.getElementById("incomplete-tasks");//ul of #incompleteTasks
var completedTasksHolder=document.getElementById("completed-tasks");//completed-tasks


//New task list item
var createNewTaskElement=function(taskString){

    var listItem=document.createElement("li");
    listItem.className = "task-list__item";
    //input (checkbox)
    var checkBox=document.createElement("input");//checkbx
    checkBox.type = "checkbox";
    //label
    var label=document.createElement("label");//label
    label.innerText = taskString;
  label.className = "task-list__label";
    //input (text)
    var editInput=document.createElement("input");//text
    editInput.type = "text";
  editInput.className = "task-list__input";
    //button.edit
    var editButton=document.createElement("button");//edit button
    editButton.innerText = "Edit"; //innerText encodes special characters, HTML does not.
    editButton.className = "task-list__edit-button";
    //button.delete
    var deleteButton=document.createElement("button");//delete button
    deleteButton.className = "task-list__delete-button";
    var deleteButtonImg=document.createElement("img");//delete button image
    deleteButtonImg.src = "./assets/images/remove.svg";
  deleteButtonImg.alt = "Delete";
  deleteButtonImg.className = "task-list__delete-icon";
  deleteButton.appendChild(deleteButtonImg);

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
};


  


var addTask=function(){
    //Create a new list item with the text from the #new-task:
    if (!taskInput.value) return;
    var listItem=createNewTaskElement(taskInput.value.trim());

    //Append listItem to incompleteTaskHolder
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value="";

}

//Edit an existing task.

var editTask=function(){


    var listItem=this.parentNode;

    var editInput=listItem.querySelector('input[type=text]');
    var label=listItem.querySelector(".task-list__label");
    var editButton=listItem.querySelector(".task-list__edit-button");
    var isEditMode =listItem.classList.contains("edit-mode");
    //If class of the parent is .editmode
    if(isEditMode){

        //switch to .editmode
        //label becomes the inputs value.
        label.innerText=editInput.value;
        editBtn.innerText="Edit";
    }else{
        editInput.value=label.innerText;
        editButton.innerText="Save";
    }

    //toggle .edit-mode on the parent.
    listItem.classList.toggle("edit-mode");
};


//Delete task.
var deleteTask=function(){
    var listItem=this.parentNode;
    var ul=listItem.parentNode;
    //Remove the parent list item from the ul.
    ul.removeChild(listItem);

}


//Mark task completed
var taskCompleted=function(){
    //Append the task list item to the #completed-tasks
    var listItem=this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);

}


var taskIncomplete=function(){
//Mark task as incomplete.
    //When the checkbox is unchecked
    //Append the task list item to the #incompleteTasks.
    var listItem=this.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem,taskCompleted);
}




var bindTaskEvents=function(taskListItem,checkBoxEventHandler){
    var checkBox=taskListItem.querySelector("input[type=checkbox]");
    var editButton=taskListItem.querySelector(".task-list__edit-button");
    var deleteButton=taskListItem.querySelector(".task-list__delete-button");


    //Bind editTask to edit button.
    editButton.addEventListener("click", editTask);
    //Bind deleteTask to delete button.
    deleteButton.addEventListener("click", deleteTask);
    //Bind taskCompleted to checkBoxEventHandler.
    checkBox.addEventListener("change", checkBoxEventHandler);
}

addButton.addEventListener("click", addTask);
//cycle over incompleteTaskHolder ul list items
//for each list item
for (var i=0; i<incompleteTaskHolder.children.length;i++){

    //bind events to list items children(tasksCompleted)
    bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}




//cycle over completedTasksHolder ul list items
for (var i=0; i<completedTasksHolder.children.length;i++){
    //bind events to list items children(tasksIncompleted)
    bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}




// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.