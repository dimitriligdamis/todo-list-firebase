import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { CreateTodo } from "./CreateTodo";

// import icon check / edit / delete
import { MdEdit } from "react-icons/md";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { IoMdTrash } from "react-icons/io";
import { async } from "@firebase/util";

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
    });
  };
  useEffect(() => {
    fetchPost();
  }, [reRender]);

  const handleClickCheckIn = async (item) => {
    try {
      await setDoc(doc(db, "todos", item.id), {
        ...item,
        completed: !item.completed,
      });
      setReRender(!reRender);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <CreateTodo reRender={reRender} setReRender={setReRender} />
      <ul className="w-3/4">
        {todos?.map((todo) => (
          <li
            className="flex justify-between font-bold rounded my-4 p-3 bg-white"
            key={todo.id}
          >
            <p className={todo.completed ? "line-through text-lg" : "text-lg"}>
              {todo.Subject}
            </p>
            <div className="flex items-center gap-5 text-2xl">
              <BsFillCheckCircleFill
                className="text-[#5EFE9D] hover:cursor-pointer"
                onClick={() => {
                  handleClickCheckIn(todo);
                }}
              />
              <MdEdit className="text-[#10DDF3] hover:cursor-pointer" />
              <IoMdTrash className="text-[#EE5557] hover:cursor-pointer" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
