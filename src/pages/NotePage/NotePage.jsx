import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./NotePage.module.scss";
import EditModal from "@/ui/components/EditModal/EditModal.jsx";
import notesAPI from "@/api/notesAPI.js";

const NotePage = ({ onEdit, onDelete }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleOpenEditModal = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleEdit = async (id, newTitle) => {
    await onEdit(id, newTitle);

    setNote((prev) => ({
      ...prev,
      title: newTitle,
    }));
  };

  const handleDelete = async () => {
    await onDelete(id);
    navigate("/");
  };

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    notesAPI
      .getNoteById(id)
      .then((data) => {
        setNote(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, [id, retryCount]);

  if (isLoading) {
    return <div className={styles.loader}></div>;
  }

  if (error?.status === 404) {
    return <p>Задача не найдена</p>;
  }

  if (error) {
    return (
      <div>
        <p>Ошибка: {error.message}</p>
        <button onClick={() => setRetryCount((prev) => prev + 1)}>
          Попробовать снова
        </button>
      </div>
    );
  }

  return (
    <div className={styles.notePage}>
      <h1 className={styles.title}>{note.title}</h1>
      <p className={styles.status}>
        Статус: {note.isDone ? "Выполнена" : "Не выполнена"}
      </p>
      <div className={styles.actions}>
        <button
          className={styles.button}
          type="button"
          onClick={handleOpenEditModal}
        >
          Редактировать
        </button>
        <button className={styles.button} type="button" onClick={handleDelete}>
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
  );
};

export default NotePage;
