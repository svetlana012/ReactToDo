import { useState, useEffect, useCallback } from "react";

const useTodo = () => {
  const getDataFromLocalStorage = () => {
    try {
      const savedNotes = localStorage.getItem("notes");

      if (savedNotes === null) {
        return [
          {
            title: "Выучить react",
            id: Date.now(),
            isDone: false,
          },
        ];
      }

      const parsedNotes = JSON.parse(savedNotes);

      if (!Array.isArray(parsedNotes)) {
        throw new Error("Сохранённые задачи должны быть массивом");
      }

      return parsedNotes;
    } catch (error) {
      console.error("Ошибка загрузки задач:", error);

      return [
        {
          title: "Выучить react",
          id: Date.now(),
          isDone: false,
        },
      ];
    }
  };

  const [notes, setNotes] = useState(getDataFromLocalStorage);

  useEffect(() => {
    try {
      localStorage.setItem("notes", JSON.stringify(notes));
    } catch (error) {
      console.error("Ошибка сохранения задач:", error);
    }
  }, [notes]);

  const addNote = (title) => {
    setNotes((prev) => [
      ...prev,
      {
        id: Date.now(),
        title: title,
        isDone: false,
      },
    ]);
  };

  const deleteNote = useCallback((taskId) => {
    setNotes((prev) => {
      return prev.filter((note) => note.id !== taskId);
    });
  }, []);

  const toggleNote = useCallback((taskId) => {
    setNotes((prev) =>
      prev.map((note) => {
        if (note.id === taskId) {
          return { ...note, isDone: !note.isDone };
        }
        return note;
      }),
    );
  }, []);

  const updateNote = useCallback((id, newTitle) => {
    setNotes((prev) =>
      prev.map((note) => {
        if (note.id === id) {
          return { ...note, title: newTitle };
        }

        return note;
      }),
    );
  }, []);

  return { notes, setNotes, addNote, deleteNote, toggleNote, updateNote };
};

export default useTodo;
