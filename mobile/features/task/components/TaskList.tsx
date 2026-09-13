import React from 'react';
import { View } from 'react-native';
import { tasks } from '@/core/types';
import { TaskReadRow } from './TaskReadRow';
import { TaskEditRow } from './TaskEditRow';

interface TaskListProps {
  tasks: tasks[];
  editingTaskId: number | null;

  editTitle: string;
  setEditTitle: (value: string) => void;

  editDescription: string;
  setEditDescription: (value: string) => void;

  onSaveEdit: (task: tasks) => void;
  onCancelEdit: () => void;

  onToggle: (task: tasks) => void;
  onStartEdit: (task: tasks) => void;
  onDelete: (id: number) => void;
}

export function TaskList({
  tasks,
  editingTaskId,
  editTitle,
  setEditTitle,
  editDescription,
  setEditDescription,
  onSaveEdit,
  onCancelEdit,
  onToggle,
  onStartEdit,
  onDelete,
}: TaskListProps) {
  return (
    <View>
      {tasks.map((task) =>
        editingTaskId === task.id ? (
          <TaskEditRow
            key={task.id}
            editTitle={editTitle}
            setEditTitle={setEditTitle}
            editDescription={editDescription}
            setEditDescription={setEditDescription}
            onSave={() => onSaveEdit(task)}
            onCancel={onCancelEdit}
          />
        ) : (
          <TaskReadRow
            key={task.id}
            task={task}
            onToggle={onToggle}
            onStartEdit={onStartEdit}
            onDelete = {onDelete}
          />
        )
      )}
    </View>
  );
}