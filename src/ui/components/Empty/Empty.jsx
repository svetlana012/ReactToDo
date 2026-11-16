import styles from "./Empty.module.scss";

const Empty = () => {
  return (
    <div className={styles.empty}>
      <img className={styles.empty__img} src="src/assets/empty.png" alt="" />
      <p className={styles.empty__text}>Empty...</p>
    </div>
  );
};

export default Empty;
