import { useState, useCallback } from "react";
import useTodo from "./useTodo";
import { useTheme } from "../context/ThemeContext.jsx";
import NoteItem from "../ui/components/NoteItem/NoteItem.jsx";

const useApp = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");

  const {
    notes,
    addNote,
    deleteNote,
    toggleNote,
    updateNote,
    filterToDos,
    isLoading,
  } = useTodo(filter);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingNoteId, setEditingNoteId] = useState(null);

  const { theme } = useTheme();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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

  return {
    search,
    setSearch,
    filter,
    setFilter,
    notes,
    addNote,
    deleteNote,
    toggleNote,
    updateNote,
    filterToDos,
    isLoading,
    isModalOpen,    
    isEditModalOpen,    
    editingNoteId,
    setEditingNoteId,
    openModal,
    closeModal,
    openEditModal,
    closeEditModal,
    editingNote,
    renderToDos,
    theme
  };
};

export default useApp;
