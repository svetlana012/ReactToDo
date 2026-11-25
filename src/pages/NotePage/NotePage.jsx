import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTheme } from "@/context/ThemeContext.jsx";
import styles from "./NotePage.module.scss";
import EditModal from "@/ui/components/EditModal/EditModal.jsx";
import notesAPI from "@/api/notesAPI.js";

const NotePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionError, setActionError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { theme } = useTheme();

  const handleOpenEditModal = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleEdit = async (id, newTitle) => {
    setActionError(null);

    try {
      await notesAPI.updateNote(id, newTitle);

      setNote((prev) => ({
        ...prev,
        title: newTitle,
      }));

      setIsEditModalOpen(false);
      return true;
    } catch (err) {
      setActionError(err.message);
      return false;
    }
  };

  const handleDelete = async () => {
    setActionError(null);
    try {
      await notesAPI.deleteNote(id);
      navigate("/");
    } catch (err) {
      setActionError(err.message);
    }
  };

  const loadNote = async () => {
    setIsLoading(true);
    setError(null);
    notesAPI
      .getNoteById(id)
      .then((data) => {
        setNote(data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    loadNote(id);
  }, [id, retryCount]);

  if (isLoading) {
    return (
      <div className={styles.loaderContainer}>
        <div className={styles.loader}></div>
      </div>
    );
  }

  if (error?.status === 404) {
    return <div>Задача не найдена</div>;
  }

  if (error) {
    return (
      <div>
        <div>Ошибка: {error.message}</div>
        <button onClick={() => loadNote(id)}>Попробовать снова</button>
      </div>
    );
  }

  return (
    <main data-theme={theme}>
      <div className={styles.notePage}>
        <h1 className={styles.title}>{note.title}</h1>
        <div className={styles.status}>
          Статус: {note.isDone ? "Выполнена" : "Не выполнена"}
        </div>
        {actionError && <div>Ошибка сервера. Не удалось удалить задачу.</div>}
        <div className={styles.actions}>
          <button
            className={styles.button}
            type="button"
            onClick={handleOpenEditModal}
          >
            Редактировать
          </button>
          <button
            className={styles.button}
            type="button"
            onClick={handleDelete}
          >
            Удалить
          </button>
        </div>
        <Link className={styles.backLink} to="/">
          К списку задач
        </Link>
        {isEditModalOpen && (
          <EditModal
            id={note.id}
            title={note.title}
            onEdit={handleEdit}
            onClose={handleCloseEditModal}
          />
        )}
      </div>
    </main>
  );
};

export default NotePage;
