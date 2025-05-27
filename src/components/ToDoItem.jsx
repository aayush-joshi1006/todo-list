// componet for each individual item in the todo list
function ToDoItem(props) {
  return (
    <>
      <div>
        {/* span for displaying the todo */}
        <span>{props.listItem.task}</span>
        {/* button for changing the status of todo  */}
        <button onClick={() => props.isCompletedTodo(props.listItem.id)}>
          {props.listItem.completed ? "completed" : "pending"}
        </button>

        {/* buttons for editing and deleting the todo from the todo list */}
        <div>
          <button onClick={() => props.editTodo(props.listItem)}>Edit</button>
          <button onClick={() => props.deleteTodo(props.listItem.id)}>
            Delete
          </button>
        </div>
      </div>
    </>
  );
}

export default ToDoItem;
