import { useState, useCallback } from "react";


import "./styles/global.scss";

import Search from "./ui/components/Search/Search.jsx";
import ButtonFilter from "./ui/button/ButtonFilter/ButtonFilter.jsx";
import ButtonTheme from "./ui/button/ButtonTheme/ButtonTheme.jsx";
import NoteItem from "./ui/components/NoteItem/NoteItem.jsx";
import ButtonAdd from "./ui/button/ButtonAdd/ButtonAdd.jsx";
import Modal from "./ui/components/Modal/Modal.jsx";
import Empty from "./ui/components/Empty/Empty.jsx";
import EditModal from "./ui/components/EditModal/EditModal.jsx";
import useTodo from "./hooks/useTodo";

import { useTheme } from "./context/ThemeContext.jsx";

import styles from "./styles/App.module.scss";

const App = () => {
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

  return (
    <main data-theme={theme}>
      <div className={styles.page}>
        <div className={styles.todo}>
          <h1 className={styles.title}>TODO LIST</h1>
          <div className={styles.toolbar}>
            <div className={styles.search}>
              <Search onSearch={setSearch} />
            </div>
            <div className={styles.filter}>
              <ButtonFilter onFilterChange={setFilter} />
            </div>
            <div className={styles.theme}>
              <ButtonTheme />
            </div>
          </div>
          <ul className={styles.notes}>{renderToDos()}</ul>
          <div className={styles.addButton}>
            <ButtonAdd onAddNote={openModal} />
          </div>
          {isModalOpen && <Modal onAdd={addNote} onClose={closeModal} />}
          <div className={styles.empty}>
            <Empty />
          </div>
          {isEditModalOpen && editingNote && (
            <EditModal
              id={editingNote.id}
              title={editingNote.title}
              onEdit={updateNote}
              onClose={closeEditModal}
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default App;
