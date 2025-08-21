import type { ReactNode } from "react";

import styles from "./BoardCard.module.css";

type Props = {
  id: number;
  title: string;
  description: string;
};

export default function BoardCard({
  id,
  title,
  description,
}: Props): ReactNode {
  return (
    <div className={styles["board-card"]}>
      <div className={styles.header}>
        <div className={styles.title}>{title}</div>
        <a href={`/board/${id}`}>View</a>
      </div>
      <p className={styles.description}>{description}</p>
    </div>
  );
}
