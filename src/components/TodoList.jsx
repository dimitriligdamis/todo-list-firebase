import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { CreateTodo } from "./CreateTodo";

export const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [reRender, setReRender] = useState(false);

  const fetchPost = async () => {
    await getDocs(collection(db, "todos")).then((querySnapshot) => {
      const newData = querySnapshot.docs
        .map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
        .sort((date1, date2) =>
          date1.date < date2.date ? 1 : date1.date > date2.date ? -1 : 0
        );
      setTodos(newData);
      console.log(todos, newData);
    });
  };
  useEffect(() => {
    fetchPost();
  }, [reRender]);

  return (
    <div className="flex flex-col items-center">
      <CreateTodo reRender={reRender} setReRender={setReRender} />
      <ul className="w-3/4">
        {todos?.map((todo) => (
          <li className="font-bold rounded my-4 p-3 bg-white" key={todo.id}>
            {todo.Subject}
          </li>
        ))}
      </ul>
    </div>
  );
};
