import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ToDoList from "./pages/ToDoList";

function App() {
  return (
    <Router basename="/todolist-recoil">
      <Routes>
        <Route path="/" element={<ToDoList />} />
      </Routes>
    </Router>
  );
}

export default App;
