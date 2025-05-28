import "./App.css";
import Header from "./components/Header";
import ToDoList from "./components/ToDoList";

function App() {
  return (
    <>
      <div className="min-h-screen bg-radial from-[#BBFBFF] from-40% to-[#5409DA] font-mono">
        {/* For rendering all the components */}
        <Header />
        <ToDoList />
      </div>
    </>
  );
}

export default App;
