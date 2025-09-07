import type { Draft } from "immer";

import { arrayMove } from "@dnd-kit/sortable";

import type { ListItemType } from "@/types/list-item.ts";
import type { ListType } from "@/types/list.ts";

export type ListsAction =
  | {
      type: "item_created";
      listIndex: number;
      item: ListItemType;
    }
  | {
      type: "item_removed";
      listIndex: number;
      itemIndex: number;
    }
  | {
      type: "item_dragged_end";
      activeListIndex: number;
      activeItemIndex: number;
      overItemIndex: number;
    };

export function listsReducer(
  draft: Draft<ListType[]>,
  action: ListsAction,
): void {
  switch (action.type) {
    case "item_created": {
      const list = draft[action.listIndex];
      list.items.push(action.item);

      return;
    }
    case "item_removed": {
      const list = draft[action.listIndex];
      list.items.splice(action.itemIndex, 1);

      return;
    }
    case "item_dragged_end": {
      const { activeListIndex, activeItemIndex, overItemIndex } = action;

      if (activeItemIndex === overItemIndex) {
        return;
      }

      const activeList = draft[activeListIndex];

      activeList.items = arrayMove(
        activeList.items,
        activeItemIndex,
        overItemIndex,
      );

      return;
    }
    default: {
      throw new Error("Unknown action.");
    }
  }
}
