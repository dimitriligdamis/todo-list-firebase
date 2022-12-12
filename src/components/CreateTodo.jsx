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
    <form onSubmit={handleSubmit}>
      <div>
        <input
          onChange={(e) => setSubject(e.target.value)}
          type="text"
          placeholder="What do want to do?"
          value={Subject}
        />
      </div>
      <div>
        <button>Add-Todo</button>
      </div>
    </form>
  );
};
