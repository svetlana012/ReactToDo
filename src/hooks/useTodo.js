import { useState, useEffect, useCallback, useMemo } from "react";

const useTodo = (filter) => {
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

  const filterToDos = useMemo(() => {
    return [...notes].sort((a, b) => {
      if (filter === "ALL") {
        return 0;
      }

      if (filter === "INCOMPLETE") {
        if (a.isDone && !b.isDone) {
          return 1;
        }
        if (!a.isDone && b.isDone) {
          return -1;
        }
        return 0;
      }

      if (filter === "COMPLETE") {
        if (a.isDone && !b.isDone) {
          return -1;
        }
        if (!a.isDone && b.isDone) {
          return 1;
        }
        return 0;
      }
      return 0;
    });
  }, [filter, notes]);

  return { notes, addNote, deleteNote, toggleNote, updateNote, filterToDos };
};

export default useTodo;
