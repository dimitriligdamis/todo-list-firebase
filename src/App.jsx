import { CreateTodo } from "./components/CreateTodo";
import { TodoSubject } from "./components/TodoSubject";

function App() {
  return (
    <div className="App">
      <TodoSubject />
      <CreateTodo />
    </div>
  );
}

export default App;
