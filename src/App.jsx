import { TodoList } from "./components/TodoList";
import { TodoSubject } from "./components/TodoSubject";

function App() {
  return (
    <div className="App">
      <TodoSubject />
      <TodoList />
    </div>
  );
}

export default App;
