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

    if (active.id === over.id) return;

    setTodos((prev) => {
      const origPos = getTaskPos(active.id);
      const newPos = getTaskPos(over.id);

      return arrayMove(prev, origPos, newPos);
    });
  };

  const sensors = useSensors(
    // For mouse/pointer devices

    useSensor(PointerSensor, {
      // Add a delay to distinguish between clicks and drags

      activationConstraint: {
        delay: 250,

        tolerance: 5,
      },
    }),

    // Specifically for touch devices (mobile)

    useSensor(TouchSensor, {
      // Lower delay for touch to feel more responsive

      activationConstraint: {
        delay: 200,

        tolerance: 8, // Higher tolerance for finger size
      },
    }),

    // Optional: Add keyboard support for accessibility

    useSensor(KeyboardSensor, {
      coordinatedGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <>
      <DndContext
        sensors={sensors}
        onDragEnd={hanldeDragEnd}
        collisionDetection={closestCorners}
      >
        <SortableContext items={todos} strategy={verticalListSortingStrategy}>
          <div>
            {todos.map((todo) => (
              <Todo key={todo.id} todo={todo} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </>
  );
};

export default AllTodos;
