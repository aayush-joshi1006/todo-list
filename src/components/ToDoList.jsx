import ToDoItem from "./ToDoItem";
import { useState } from "react";

function ToDoList() {
  // useState hooks for diffrent variables

  // state for managing the list of todo items
  const [todoList, setTodoList] = useState(
    JSON.parse(localStorage.getItem("todo-list")) || []
  );

  //   state for managing the current todo
  const [currentTodo, setCurrentTodo] = useState("");

  //   state for mamanging the todo in case of editing
  const [editingId, setEditingId] = useState(null);

  // function for editing and adding todo to the list
  function addOrEditTodo() {
    // condition when the input field is empty
    if (currentTodo.trim() === "") return;

    // codition for editing the todo when edit button is clicked
    if (editingId !== null) {
      // updating the todo and setting the completed state as false
      const updatedList = todoList.map((todo) => {
        if (todo.id === editingId) {
          return { ...todo, task: currentTodo, completed: false };
        }
        return todo;
      });

      // updating the todo list in the state and in the local storage
      setTodoList(updatedList);
      localStorage.setItem("todo-list", JSON.stringify(updatedList));

      // clearing the input field
      setCurrentTodo("");

      // setting the state of editing id to null after the action is completed and throwing the alert for completed editing
      setEditingId(null);
      alert("Todo Updated");
    }
    // condition for adding a new todo if editingId is null
    else {
      //creating a todo object for the todo
      let todoObj = {
        id: Date.now(),
        task: currentTodo,
        completed: false,
      };

      // updating the todo list in the state and in the local storage
      const updatedList = [...todoList, todoObj];
      localStorage.setItem("todo-list", JSON.stringify(updatedList));
      setTodoList(updatedList);
      // clearing the input field and throwing the alert for added todo
      setCurrentTodo("");
      alert("Todo Added");
    }
  }

  //function for setting todo for editing
  function editTodo(todo) {

    //seting the state of editing ID and setting the input value as the task 
    setCurrentTodo(todo.task);
    setEditingId(todo.id);
  }

  //function for deleting todo from the todo list
  function deleteTodo(id) {
    // checking the user is sure about deleting the todo
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    // updating the todo list in the state and in the local storage
    let updatedList = todoList.filter((todo) => todo.id !== id);
    localStorage.setItem("todo-list", JSON.stringify(updatedList));
    setTodoList(updatedList);

    // alert for deleting the todo from todo list
    alert("Todo Deleted");
  }

  // function for managing the status of todo if it is completed or pending
  function isCompletedTodo(id) {
    // changing the status of the todo
    let updatedList = todoList.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });

    // updating the todo list in the state and in the local storage
    setTodoList(updatedList);
    localStorage.setItem("todo-list", JSON.stringify(updatedList));

  }

  return (
    <>
      <div>
        {/* input field for entering todo task */}
        <input
          type="text"
          value={currentTodo}
          onChange={(e) => setCurrentTodo(e.target.value)}
        />
        {/* button for editing or adding a todo task */}
        <button onClick={addOrEditTodo} disabled={currentTodo === ""}>
          {editingId !== null ? "Update Todo" : "Add Todo"}
        </button>
        {/* button for clearing the input field */}
        <button
          onClick={() => {
            setCurrentTodo("");
            setEditingId(null);
          }}
        >
          Clear
        </button>
      </div>
      {/* component for rendering all the todo items from the todo list  */}
      {todoList.map((item) => (

        // componet for each todo to be displayed
        <ToDoItem
          key={item.id}
          listItem={item}
          deleteTodo={deleteTodo}
          editTodo={editTodo}
          isCompletedTodo={isCompletedTodo}
        />
      ))}
    </>
  );
}

export default ToDoList;
