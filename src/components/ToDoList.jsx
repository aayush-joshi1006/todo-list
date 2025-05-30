import ToDoItem from "./ToDoItem";
import { useState } from "react";

// imports of icons from react icon library for different icons
import { IoMdAdd } from "react-icons/io";
import { GrUpdate } from "react-icons/gr";
import { MdOutlineClear } from "react-icons/md";

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
          return { ...todo, task: currentTodo };
        }
        return todo;
      });

      // updating the todo list in the state and in the local storage
      updateTodos(updatedList);

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
      updateTodos(updatedList);
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
    updateTodos(updatedList);

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
    updateTodos(updatedList);
  }

  // function for updating the the state of todo list and updating that list in the local storage
  function updateTodos(todos) {
    setTodoList(todos);
    localStorage.setItem("todo-list", JSON.stringify(todos));
  }

  return (
    <>
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="main-block">
          <div className="w-full flex justify-center items-center gap-3 py-7">
            {/* input field for entering todo task */}
            <input
              type="text"
              value={currentTodo}
              className="input-block"
              onChange={(e) => setCurrentTodo(e.target.value)}
            />
            {/* button for editing or adding a todo task */}
            <button
              onClick={addOrEditTodo}
              disabled={currentTodo === ""}
              className="blue-button"
            >
              {editingId !== null ? <GrUpdate /> : <IoMdAdd />}
            </button>
            {/* button for clearing the input field */}
            <button
              className="blue-button"
              onClick={() => {
                setCurrentTodo("");
                setEditingId(null);
              }}
            >
              <MdOutlineClear />
            </button>
          </div>
          {/* component for rendering all the todo items from the todo list  */}

          <div className="min-h-[45vh] w-full ">
            {todoList.length === 0 && (
              <div className="mt-5 text-2xl font-extrabold text-white text-center">
                No ToDO to Display
              </div>
            )}
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
          </div>
        </div>
      </div>
    </>
  );
}

export default ToDoList;
