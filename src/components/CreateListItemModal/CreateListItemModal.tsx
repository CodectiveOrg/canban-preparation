import {
  type ComponentProps,
  type FormEvent,
  type ReactNode,
  useContext,
} from "react";

import { toast } from "react-toastify";

import clsx from "clsx";

import Button from "@/components/Button/Button.tsx";
import Modal from "@/components/Modal/Modal.tsx";
import TextInputComponent from "@/components/text-input/text-input.component.tsx";

import { BoardContext } from "@/context/board-context.ts";

import styles from "./CreateListItemModal.module.css";

type Props = Omit<ComponentProps<typeof Modal>, "heading" | "children"> & {
  listId: string | null;
};

export default function CreateListItemModal({
  ref,
  contentClassName,
  listId,
  ...otherProps
}: Props): ReactNode {
  const { create } = useContext(BoardContext);

  const handleCancelButtonClick = (): void => {
    ref.current?.close();
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (!listId) {
      console.error("Cannot find desired list.");
      return;
    }

    const formData = new FormData(e.currentTarget);
    const id = globalThis.crypto.randomUUID();
    const title = formData.get("title") as string;

    create(listId, { id, title });
    toast.success("Item created successfully.");

    e.currentTarget.reset();
    ref.current?.close();
  };

  return (
    <Modal
      ref={ref}
      contentClassName={clsx(
        styles["create-list-item-modal"],
        contentClassName,
      )}
      heading="Create a New Item"
      {...otherProps}
    >
      <form onSubmit={handleFormSubmit}>
        <TextInputComponent label="Title" name="title" />
        <div className={styles.actions}>
          <Button type="button" onClick={handleCancelButtonClick}>
            Cancel
          </Button>
          <Button color="primary">Submit</Button>
        </div>
      </form>
    </Modal>
  );
}
