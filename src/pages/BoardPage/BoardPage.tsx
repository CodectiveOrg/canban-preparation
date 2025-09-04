import { type ReactNode, useRef, useState } from "react";

import Board from "@/components/Board/Board.tsx";
import Button from "@/components/Button/Button.tsx";
import CreateListItemModal from "@/components/CreateListItemModal/CreateListItemModal.tsx";

import ActiveItemProvider from "@/providers/ActiveItemProvider.tsx";
import BoardProvider from "@/providers/BoardProvider.tsx";

import styles from "./BoardPage.module.css";

export default function BoardPage(): ReactNode {
  const [modalListId, setModalListId] = useState<string | null>(null);

  const modalRef = useRef<HTMLDialogElement>(null);

  const handleOpenButtonClick = (listId: string): void => {
    setModalListId(listId);
    modalRef.current?.showModal();
  };

  const handleModalClose = (): void => {
    setModalListId(null);
  };

  return (
    <BoardProvider>
      <ActiveItemProvider>
        <div className={styles["board-page"]}>
          <Button color="primary" onClick={() => handleOpenButtonClick("1")}>
            Open
          </Button>
          <CreateListItemModal
            ref={modalRef}
            listId={modalListId}
            onClose={handleModalClose}
          >
            This is content.
          </CreateListItemModal>

          <Board />
        </div>
      </ActiveItemProvider>
    </BoardProvider>
  );
}
