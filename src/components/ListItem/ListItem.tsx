import { type ReactNode, memo } from "react";

import IconButton from "@/components/IconButton/IconButton.tsx";

import MingcuteDelete2Line from "@/icons/MingcuteDelete2Line.tsx";

import type { ListItemType } from "@/types/list-item.ts";

import styles from "./ListItem.module.css";

type Props = {
  listId: string;
  item: ListItemType;
  onClick?: (listId: string, itemId: string) => void;
  onRemove?: (listId: string, itemId: string) => void;
};

const ListItem = memo(function ListItem({
  listId,
  item,
  onClick,
  onRemove,
}: Props): ReactNode {
  return (
    <div
      className={styles["list-item"]}
      onClick={() => onClick?.(listId, item.id)}
    >
      {item.title}
      <IconButton
        onClick={(e) => {
          e.stopPropagation();
          onRemove?.(listId, item.id);
        }}
      >
        <MingcuteDelete2Line />
      </IconButton>
    </div>
  );
});

export default ListItem;
