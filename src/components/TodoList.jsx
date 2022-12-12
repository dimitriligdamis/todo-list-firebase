import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { CreateTodo } from "./CreateTodo";

export const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [reRender, setReRender] = useState(false);

  const fetchPost = async () => {
    await getDocs(collection(db, "todos")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setTodos(newData);
      console.log(todos, newData);
    });
  };
  useEffect(() => {
    fetchPost();
  }, [reRender]);

  return (
    <>
      <CreateTodo reRender={reRender} setReRender={setReRender} />
      <ul>
        {todos?.map((todo) => (
          <li key={todo.id}>{todo.Subject}</li>
        ))}
      </ul>
    </>
  );
};