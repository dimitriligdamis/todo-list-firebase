import { TodoList } from "./components/TodoList";
import { TodoSubject } from "./components/TodoSubject";

function App() {
  return (
    <div className="bg-[#79d4e7] min-h-screen md:py-20">
      <div className="container mx-auto max-w-2xl bg-[#dfdedd] p-7 rounded">
        <TodoSubject />
        <TodoList />
      </div>
    </div>
  );
}

export default App;
