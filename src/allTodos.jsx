import { useContext } from "react";
import { TodoContext } from "./context";
import Todo from "./todo";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";

import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

const AllTodos = () => {
  const { todos, setTodos } = useContext(TodoContext);

  const getTaskPos = (id) => todos.findIndex((task) => task.id === id);

  const hanldeDragEnd = (event) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;


    setTodos((prev) => {
      const origPos = getTaskPos(active.id);
      const newPos = getTaskPos(over.id);

      return arrayMove(prev, origPos, newPos);
    });
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinatedGetter: sortableKeyboardCoordinates,
    }),
    useSensor(TouchSensor)
  );

  return (
    <>
      <DndContext
        sensors={sensors}
        onDragEnd={hanldeDragEnd}
        collisionDetection={closestCorners}
      >
        <SortableContext items={todos} strategy={verticalListSortingStrategy}>
          {todos.map((todo) => (
            <Todo key={todo.id} todo={todo} />
          ))}
        </SortableContext>
      </DndContext>
    </>
  );
};

export default AllTodos;
