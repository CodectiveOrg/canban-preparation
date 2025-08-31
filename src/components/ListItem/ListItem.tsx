import { type ReactNode, memo, use } from "react";

import IconButton from "@/components/IconButton/IconButton.tsx";

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

  return (
    <div
      className={styles["list-item"]}
      onClick={() => onClick?.(listId, item.id)}
    >
      {item.title}
      <IconButton
        onClick={(e) => {
          e.stopPropagation();
          remove(listId, item.id);
        }}
      >
        <MingcuteDelete2Line />
      </IconButton>
    </div>
  );
});

export default ListItem;
