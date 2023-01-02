import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { CreateTodo } from "./CreateTodo";
import { MdEdit } from "react-icons/md";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { IoMdTrash } from "react-icons/io";

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
          <li
            className="flex justify-between font-bold rounded my-4 p-3 bg-white"
            key={todo.id}
          >
            <p className="text-lg">{todo.Subject}</p>
            <div className="flex items-center gap-5 text-2xl">
              <BsFillCheckCircleFill className="text-[#5EFE9D]" />
              <MdEdit className="text-[#10DDF3]" />
              <IoMdTrash className="text-[#EE5557]" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
