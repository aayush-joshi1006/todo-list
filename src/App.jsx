import "./App.css";
import Header from "./components/Header";
import ToDoList from "./components/ToDoList";

function App() {
  return (
    <>
      <div className="min-h-screen">

        {/* For rendering all the components */}
        <Header />
        <ToDoList />
      </div>
    </>
  );
}

export default App;
