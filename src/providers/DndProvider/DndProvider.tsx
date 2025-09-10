import { type PropsWithChildren, type ReactNode, use, useState } from "react";

import {
  DndContext,
  type DragEndEvent,
  type DragOverEvent,
  DragOverlay,
  type DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import List from "@/components/List/List.tsx";
import ListItem from "@/components/ListItem/ListItem.tsx";

import { ListsContext } from "@/context/lists-context.ts";

import { detectCollision } from "@/providers/DndProvider/utils/collision-detection.ts";

import type { DraggableData } from "@/types/draggable-data.ts";

type Props = PropsWithChildren;

export default function DndProvider({ children }: Props): ReactNode {
  const { dispatchLists } = use(ListsContext);

  const sensors = useSensors(useSensor(PointerSensor));

  const [activeData, setActiveData] = useState<DraggableData | null>(null);

  const handleDragStart = (e: DragStartEvent): void => {
    setActiveData(e.active.data.current as DraggableData);
  };

  const handleDragOver = (e: DragOverEvent): void => {
    if (!e.over || e.active.data.current!.isList) {
      return;
    }

    dispatchLists({
      type: "item_dragged_over",
      activeListIndex: e.active.data.current!.listIndex,
      activeItemIndex: e.active.data.current!.itemIndex,
      overListIndex: e.over.data.current!.listIndex,
      overItemIndex: e.over.data.current!.itemIndex,
    });
  };

  const handleDragEnd = (e: DragEndEvent): void => {
    setActiveData(null);

    if (!e.over) {
      return;
    }

    if (e.active.data.current!.isList) {
      dispatchLists({
        type: "list_dragged_end",
        activeListIndex: e.active.data.current!.listIndex,
        overListIndex: e.over.data.current!.listIndex,
      });
    } else {
      dispatchLists({
        type: "item_dragged_end",
        activeListIndex: e.active.data.current!.listIndex,
        activeItemIndex: e.active.data.current!.itemIndex,
        overItemIndex: e.over.data.current!.itemIndex,
      });
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={detectCollision}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      {children}
      <DragOverlay>
        {activeData &&
          (activeData.isList ? (
            <List
              presentational
              listIndex={activeData.listIndex}
              list={activeData.list}
            />
          ) : (
            <ListItem
              presentational
              listIndex={activeData.listIndex}
              itemIndex={activeData.itemIndex}
              item={activeData.item}
            />
          ))}
      </DragOverlay>
    </DndContext>
  );
}
