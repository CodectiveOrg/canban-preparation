import { type ComponentProps, type FormEvent, type ReactNode } from "react";

import clsx from "clsx";

import Button from "@/components/Button/Button.tsx";
import Modal from "@/components/Modal/Modal.tsx";
import TextInputComponent from "@/components/text-input/text-input.component.tsx";

import styles from "./CreateListItemModal.module.css";

type Props = Omit<ComponentProps<typeof Modal>, "heading">;

export default function CreateListItemModal({
  ref,
  contentClassName,
  ...otherProps
}: Props): ReactNode {
  const handleCancelButtonClick = (): void => {
    ref.current?.close();
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
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
        <TextInputComponent label="Title" />
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
