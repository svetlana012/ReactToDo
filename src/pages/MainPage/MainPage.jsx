import Search from "@/ui/components/Search/Search.jsx";
import ButtonFilter from "@/ui/button/ButtonFilter/ButtonFilter.jsx";
import ButtonTheme from "@/ui/button/ButtonTheme/ButtonTheme.jsx";
import ButtonAdd from "@/ui/button/ButtonAdd/ButtonAdd.jsx";
import Modal from "@/ui/components/Modal/Modal.jsx";
import Empty from "@/ui/components/Empty/Empty.jsx";
import EditModal from "@/ui/components/EditModal/EditModal.jsx";
import useApp from "@/hooks/useMainPage.jsx";
import styles from "@/styles/App.module.scss";

const MainPage = () => {
  const {
    setSearch,
    setFilter,
    addNote,
    updateNote,
    isModalOpen,
    isEditModalOpen,
    openModal,
    closeModal,
    closeEditModal,
    editingNote,
    renderToDos,
    theme,
  } = useApp();

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

export default MainPage;
