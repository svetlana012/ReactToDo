import { useState, useEffect, useCallback, useMemo } from "react";
import notesAPI from "../api/notesAPI";

const useTodo = (filter) => {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    notesAPI.getNotes().then((data) => {
      setNotes(data);
      setIsLoading(false);
    });
  }, []);

  const addNote = (title) => {
    const newNote = {
      title,
      isDone: false,
    };

    notesAPI.addNote(newNote).then((addedNote) => {
      setNotes((prev) => [...prev, addedNote]);
    });
  };

  const deleteNote = useCallback((taskId) => {
    notesAPI.deleteNote(taskId).then(() => {
      setNotes((prev) => prev.filter((note) => note.id !== taskId));
    });
  }, []);

  const toggleNote = useCallback((taskId, isDone) => {
    notesAPI.toggleNote(taskId, isDone).then(() => {
      setNotes((prev) =>
        prev.map((note) => {
          if (note.id === taskId) {
            return { ...note, isDone };
          }
          return note;
        }),
      );
    });
  }, []);

  const updateNote = useCallback((id, newTitle) => {
    notesAPI.updateNote(id, newTitle).then(() => {
      setNotes((prev) =>
        prev.map((note) => {
          if (note.id === id) {
            return { ...note, title: newTitle };
          }

          return note;
        }),
      );
    });
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
