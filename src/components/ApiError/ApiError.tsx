import type { ReactNode } from "react";

import styles from "./ApiError.module.css";

type Props = {
  error: string;
  message: string;
};

export default function ApiError({ error, message }: Props): ReactNode {
  return (
    <div className={styles["api-error"]}>
      {error}
      <br />
      {message}
    </div>
  );
}
