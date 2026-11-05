import { useState, useCallback } from "react";

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
import useTodo from "./hooks/useTodo";

import { useTheme } from "./context/ThemeContext.jsx";

const App = () => {  
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");
  const { notes, addNote, deleteNote, toggleNote, updateNote, filterToDos, isLoading } = useTodo(filter);
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
