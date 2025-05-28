import { MdEdit } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";
import { IoCheckmarkDoneSharp } from "react-icons/io5";

// componet for each individual item in the todo list
function ToDoItem(props) {
  return (
    <>
      <div
        onClick={(e) => {
          if (e.target.tagName !== "BUTTON") {
            props.isCompletedTodo(props.listItem.id);
          }
        }}
        className="w-full flex justify-between items-center px-5 py-3 rounded-xl bg-[#BBFBFF] my-4 drop-shadow-xl/50 transition duration-500 hover:-translate-y-0.5 gap-2"
      >
        {/* span for displaying the todo */}
        <div className="flex justify-between items-center  w-[90%]">
          <span
            className={
              props.listItem.completed
                ? "text-green-400 line-through text-center"
                : "text-red-700 text-center"
            }
          >
            {props.listItem.task}
          </span>
          {/* button for changing the status of todo  */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              props.isCompletedTodo(props.listItem.id);
            }}
            className={`p-1.5 rounded-full hover:bg-gray-300 ${
              props.listItem.completed ? "text-blue-600" : "text-gray-400"
            }`}
          >
            {/* {props.listItem.completed ? "completed" : "pending"} */}
            <IoCheckmarkDoneSharp />
          </button>
        </div>
        {/* buttons for editing and deleting the todo from the todo list */}
        <div className="flex justify-center items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              props.editTodo(props.listItem);
            }}
            className="red-button"
          >
            <MdEdit />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              props.deleteTodo(props.listItem.id);
            }}
            className="red-button"
          >
            <MdOutlineDelete />
          </button>
        </div>
      </div>
    </>
  );
}

export default ToDoItem;
