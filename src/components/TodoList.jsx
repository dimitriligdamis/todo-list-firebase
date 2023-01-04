import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { CreateTodo } from "./CreateTodo";

// import icon check / edit / delete
import { MdEdit } from "react-icons/md";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { IoMdTrash } from "react-icons/io";
import { async } from "@firebase/util";
import ModalEdit from "./ModalEdit";

export const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentValue, setCurrentValue] = useState("");
  const [currentItem, setCurrentItem] = useState({});

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

  const handleClickEdit = (item) => {
    setCurrentValue(item.subject);
    setCurrentItem(item);
    setShowModal(true);
  };

  const handleSubmit = async () => {
    try {
      const newItem = {
        ...currentItem,
        subject: currentValue,
      };
      await setDoc(doc(db, "todos", currentItem.id), newItem);

      const newArrayTodos = todos.map((obj) => {
        if (obj.id == currentItem.id) {
          return newItem;
        }
        return obj;
      });
      setTodos(newArrayTodos);
      setCurrentItem({});
      setCurrentValue("");
      setShowModal(false);
    } catch (error) {
      alert(error);
    }
  };

  const handleClickDelete = async (item) => {
    try {
      await deleteDoc(doc(db, "todos", item.id));

      const newArrayTodos = todos.filter((obj) => obj.id !== item.id);
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
              <MdEdit
                className="text-[#10DDF3] hover:cursor-pointer"
                onClick={() => {
                  handleClickEdit(todo);
                }}
              />
              <IoMdTrash
                className="text-[#EE5557] hover:cursor-pointer"
                onClick={() => {
                  handleClickDelete(todo);
                }}
              />
            </div>
          </li>
        ))}
      </ul>
      {showModal ? (
        <ModalEdit
          currentValue={currentValue}
          setCurrentValue={setCurrentValue}
          setShowModal={setShowModal}
          onClick={handleSubmit}
        />
      ) : null}
    </div>
  );
};
