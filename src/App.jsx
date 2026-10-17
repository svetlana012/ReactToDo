import { useState } from "react";

import "./styles/style.css"
import "./styles/global.css"

import Search from './ui/components/Search';
import ButtonFilter from './ui/button/ButtonFilter';
import ButtonTheme from './ui/button/ButtonTheme';
import NoteItem from "./ui/components/NoteItem";
import ButtonAdd from "./ui/button/ButtonAdd";
import Modal from "./ui/components/Modal";
import Empty from "./ui/components/Empty";

const App = () => {

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [notes, setNotes] = useState([
    {
      title: "Выучить react",
      id: Date.now(),
      isDone: false
    }
  ])

  const deleteNote = (taskId) => {
    setNotes(notes.filter((note) => {
      return note.id !== taskId
    }))
  }

  const addNote = (title) => {

    setNotes([...notes, {
      id: Date.now(),
      title: title,
      isDone: false,
    }])
  }

  const toggleNote = (id) => {
    setNotes(notes.map((note) => {
      if (note.id === id) {
        return { ...note, isDone: !note.isDone }
      }
      return note
    }));
  }

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <main>
      <div className="page">
        <h1 className="todo__title">TODO LIST</h1>
        <div className="toolbar todo__toolbar">
          <Search
            onSearch={setSearch} />
          <ButtonFilter
            onFilterChange={setFilter} />
          <ButtonTheme />
        </div>
        <ul className="notes todo__notes">
          {notes
            .filter((note) => (
              note.title.toLowerCase().includes(search.toLowerCase())              
            ))
            .sort((a, b) => {
              if (filter === "ALL") {
                return 0;
              }
              if (filter === "INCOMPLETE") {
                if (a.isDone && !b.isDone) {
                  return 1
                }
                if (!a.isDone && b.isDone) {
                  return -1
                }
                return 0;
              }
              if (filter === "COMPLETE") {
                if (a.isDone && !b.isDone) {
                  return -1
                }
                if (!a.isDone && b.isDone) {
                  return 1
                }
                return 0;
              }
            })
            .map((note) => (
              <NoteItem
                key={note.id}
                id={note.id}
                title={note.title}
                isDone={note.isDone}
                onToggle={toggleNote}
                onDelete={deleteNote} />
            ))}
        </ul>
        <ButtonAdd
          onAddNote={openModal} />
        {isModalOpen && (
          <Modal
            onAdd={addNote}
            onClose={closeModal} />)}
        <Empty />
      </div>
    </main>
  )
}

export default App