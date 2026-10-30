import { useState, useEffect, useCallback, useMemo, useContext } from "react";

import "./styles/style.css";
import "./styles/global.css";

import Search from "./ui/components/Search";
import ButtonFilter from "./ui/button/ButtonFilter";
import ButtonTheme from "./ui/button/ButtonTheme";
import NoteItem from "./ui/components/NoteItem";
import ButtonAdd from "./ui/button/ButtonAdd";
import Modal from "./ui/components/Modal";
import Empty from "./ui/components/Empty";
import EditModal from "./ui/components/EditModal";

import { ThemeContext } from "./context/ThemeContext.jsx";

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

const App = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingNoteId, setEditingNoteId] = useState(null);

  const [notes, setNotes] = useState(getDataFromLocalStorage);

  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    try {
      localStorage.setItem("notes", JSON.stringify(notes));
    } catch (error) {
      console.error("Ошибка сохранения задач:", error);
    }
  }, [notes]);

  const deleteNote = useCallback((taskId) => {
    setNotes((prev) => {
      return prev.filter((note) => note.id !== taskId);
    });
  }, []);

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

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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

  const renderToDos = () => {
    return filterToDos
      .filter((note) => note.title.toLowerCase().includes(search.toLowerCase()))
      .map((note) => (
        <NoteItem
          key={note.id}
          id={note.id}
          title={note.title}
          isDone={note.isDone}
          onToggle={toggleNote}
          onDelete={deleteNote}
          onEdit={openEditModal}
        />
      ));
  };

  const openEditModal = useCallback((id) => {
    setIsEditModalOpen(true);
    setEditingNoteId(id);
  }, []);

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditingNoteId(null);
  };

  const editingNote = notes.find((note) => note.id === editingNoteId);

  return (
    <main data-theme={theme}>
      <div className="page">
        <h1 className="todo__title">TODO LIST</h1>
        <div className="toolbar todo__toolbar">
          <Search onSearch={setSearch} />
          <ButtonFilter onFilterChange={setFilter} />
          <ButtonTheme />
        </div>
        <ul className="notes todo__notes">{renderToDos()}</ul>
        <ButtonAdd onAddNote={openModal} />
        {isModalOpen && <Modal onAdd={addNote} onClose={closeModal} />}
        <Empty />
        {isEditModalOpen && editingNote && (
          <EditModal
            id={editingNote.id}
            title={editingNote.title}
            onEdit={updateNote}
            onClose={closeEditModal}
          />
        )}
      </div>
    </main>
  );
};

export default App;
