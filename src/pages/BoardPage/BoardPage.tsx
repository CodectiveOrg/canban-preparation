import { type ReactNode, useRef } from "react";

import Button from "@/components/Button/Button.tsx";
import Modal from "@/components/Modal/Modal.tsx";

import ActiveItemProvider from "@/providers/ActiveItemProvider.tsx";
import BoardProvider from "@/providers/BoardProvider.tsx";

import styles from "./BoardPage.module.css";

export default function BoardPage(): ReactNode {
  const modalRef = useRef<HTMLDialogElement>(null);

  const handleOpenButtonClick = (): void => {
    modalRef.current?.showModal();
  };

  return (
    <BoardProvider>
      <ActiveItemProvider>
        <div className={styles["board-page"]}>
          {/*<Board />*/}

          <Button color="primary" onClick={handleOpenButtonClick}>
            Open
          </Button>
          <Modal ref={modalRef} heading="This is heading">
            This is content.
          </Modal>
        </div>
      </ActiveItemProvider>
    </BoardProvider>
  );
}
