import {
  type ComponentProps,
  type FormEvent,
  type ReactNode,
  useContext,
  useState,
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

  const [titleError, setTitleError] = useState<string | null>(null);

  const handleCancelButtonClick = (): void => {
    setTitleError(null);
    ref.current?.close();
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (!listId) {
      console.error("Cannot find desired list.");
      return;
    }

    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;

    if (!validateTitle(title)) {
      return;
    }

    const id = globalThis.crypto.randomUUID();
    create(listId, { id, title: title.trim() });
    toast.success("Item created successfully.");

    e.currentTarget.reset();
    ref.current?.close();
  };

  const validateTitle = (title: unknown): boolean => {
    if (typeof title !== "string") {
      setTitleError("Title must be a string.");
      return false;
    }

    if (!title.trim().length) {
      setTitleError("Title cannot be empty.");
      return false;
    }

    setTitleError(null);
    return true;
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
        <TextInputComponent label="Title" name="title" error={titleError} />
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
