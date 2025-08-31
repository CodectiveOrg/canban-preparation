import { type MouseEvent, type ReactNode, memo, use } from "react";

import { toast } from "react-toastify";

import clsx from "clsx";

import IconButton from "@/components/IconButton/IconButton.tsx";

import { ActiveItemContext } from "@/context/active-item.context.ts";
import { BoardContext } from "@/context/board-context.ts";

import MingcuteDelete2Line from "@/icons/MingcuteDelete2Line.tsx";

import type { ListItemType } from "@/types/list-item.ts";

import styles from "./ListItem.module.css";

type Props = {
  listId: string;
  item: ListItemType;
  onClick?: (listId: string, itemId: string) => void;
};

const ListItem = memo(function ListItem({
  listId,
  item,
  onClick,
}: Props): ReactNode {
  const { remove } = use(BoardContext);
  const { activeItemId, deactivate } = use(ActiveItemContext);

  const handleRemoveButtonClick = (e: MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation();

    remove(listId, item.id);
    toast.success("Item removed successfully.");

    if (item.id === activeItemId) {
      deactivate();
    }
  };

  return (
    <div
      className={clsx(
        styles["list-item"],
        item.id === activeItemId && styles.active,
      )}
      onClick={() => onClick?.(listId, item.id)}
    >
      {item.title}
      <IconButton onClick={handleRemoveButtonClick}>
        <MingcuteDelete2Line />
      </IconButton>
    </div>
  );
});

export default ListItem;
