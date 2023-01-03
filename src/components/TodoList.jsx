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

  const fetchPost = async () => {
    try {
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
    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    fetchPost();
  }, []);

  const handleClickCheckIn = async (item) => {
    console.log(item);
    try {
      const newItem = {
        ...item,
        completed: !item.completed,
      };
      await setDoc(doc(db, "todos", item.id), newItem);

      const newArrayTodos = todos.map((obj) => {
        if (obj.id == item.id) {
          return newItem;
        }
        return obj;
      });
      setTodos(newArrayTodos);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <CreateTodo list={todos} setList={setTodos} fetchPost={fetchPost} />
      <ul className="w-3/4">
        {todos?.map((todo) => (
          <li
            className="flex justify-between font-bold rounded my-4 p-3 bg-white"
            key={todo.date}
          >
            <p className={todo.completed ? "line-through text-lg" : "text-lg"}>
              {todo.subject}
            </p>
            <div className="flex items-center sm:gap-5 text-2xl">
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
