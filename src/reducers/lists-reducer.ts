import type { ListItemType } from "@/types/list-item.ts";
import type { ListType } from "@/types/list.ts";

type Action =
  | {
      type: "created";
      listId: string;
      item: ListItemType;
    }
  | {
      type: "moved";
      fromListId: string;
      itemId: string;
      toListId: string;
    }
  | {
      type: "removed";
      listId: string;
      itemId: string;
    };

export function listsReducer(state: ListType[], action: Action): ListType[] {
  switch (action.type) {
    case "created": {
      return state.map((list) => {
        if (list.id !== action.listId) {
          return list;
        }

        return { ...list, items: [...list.items, action.item] };
      });
    }
    case "moved": {
      const fromListIndex = state.findIndex(
        (list) => list.id === action.fromListId,
      );
      const toListIndex = state.findIndex(
        (list) => list.id === action.toListId,
      );

      if (fromListIndex === -1 || toListIndex === -1) {
        console.error("Cannot find desired list.");
        return state;
      }

      const itemIndex = state[fromListIndex].items.findIndex(
        (item) => item.id === action.itemId,
      );

      if (itemIndex === -1) {
        console.error("Cannot find desired item.");
        return state;
      }

      const clone = [...state];
      const fromList = {
        ...clone[fromListIndex],
        items: [...clone[fromListIndex].items],
      };
      const toList = {
        ...clone[toListIndex],
        items: [...clone[toListIndex].items],
      };

      const [item] = fromList.items.splice(itemIndex, 1);
      toList.items.push(item);

      clone[fromListIndex] = fromList;
      clone[toListIndex] = toList;
      return clone;
    }
    case "removed": {
      return state.map((list) => {
        if (list.id !== action.listId) {
          return list;
        }

        return {
          ...list,
          items: list.items.filter((item) => item.id !== action.itemId),
        };
      });
    }
    default: {
      throw Error("Unknown action.");
    }
  }
}
