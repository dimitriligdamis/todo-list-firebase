import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { useState } from "react";

export const CreateTodo = ({ reRender, setReRender }) => {
  const [Subject, setSubject] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Subject !== "") {
      await addDoc(collection(db, "todos"), {
        Subject,
        completed: false,
        date: Date.now(),
      });
      setSubject("");
      setReRender(!reRender);
    }
  };
  return (
    <form
      className="rounded w-4/6 my-7 py-2 px-3 shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(0,0,0,0.15)] bg-[#DFDEDC]"
      onSubmit={handleSubmit}
    >
      <input
        className="w-full rounded mb-3 py-1.5 px-2"
        onChange={(e) => setSubject(e.target.value)}
        type="text"
        placeholder="What do want to do?"
        value={Subject}
      />
      <button className="text-sm font-bold w-full bg-[#77D4E9] rounded py-1.5">
        Add-Todo
      </button>
    </form>
  );
};
