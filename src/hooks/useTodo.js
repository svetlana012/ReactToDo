import { useState, useEffect, useCallback, useMemo } from "react";
import notesAPI from "../api/notesAPI";

const useTodo = (filter) => {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const data = await notesAPI.getNotes();
        setNotes(data);
      } catch (error) {
        console.error("Ошибка загрузки задач:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadNotes();
  }, []);

  const addNote = async (title) => {
    const newNote = {
      title,
      isDone: false,
    };

    try {
      const addedNote = await notesAPI.addNote(newNote);

      setNotes((prev) => [...prev, addedNote]);
    } catch (error) {
      console.error("Ошибка добавления задачи:", error);
    }
  };

  const deleteNote = useCallback(async (taskId) => {
    try {
      await notesAPI.deleteNote(taskId);

      setNotes((prev) => prev.filter((note) => note.id !== taskId));
    } catch (error) {
      console.error("Ошибка удаления задачи:", error);
    }
  }, []);

  const toggleNote = useCallback(async (taskId, isDone) => {
    try {
      await notesAPI.toggleNote(taskId, isDone);

      setNotes((prev) =>
        prev.map((note) => {
          if (note.id === taskId) {
            return { ...note, isDone };
          }
          return note;
        }),
      );
    } catch (error) {
      console.error("Ошибка переключения задачи:", error);
    }
  }, []);

  const updateNote = useCallback(async (id, newTitle) => {
    try {
      await notesAPI.updateNote(id, newTitle);

      setNotes((prev) =>
        prev.map((note) => {
          if (note.id === id) {
            return { ...note, title: newTitle };
          }

          return note;
        }),
      );
    } catch (error) {
      console.error("Ошибка обновления задачи:", error);
    }
  }, []);  

  const filterToDos = useMemo(() => {
  if (filter === "INCOMPLETE") {
    return notes.filter((note) => !note.isDone);
  }

  if (filter === "COMPLETE") {
    return notes.filter((note) => note.isDone);
  }

  return notes;
}, [filter, notes]);

  return {
    notes,
    addNote,
    deleteNote,
    toggleNote,
    updateNote,
    filterToDos,
    isLoading,
  };
};

export default useTodo;
