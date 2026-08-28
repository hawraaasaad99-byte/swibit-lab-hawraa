import { useState, useEffect } from 'react'; 
import { Alert } from 'react-native';
 import { Task, fetchTasksApi, addTaskApi, updateTaskApi, deleteTaskApi } from '../api/taskApi';
export function useTasks() {
   const [tasks, setTasks] = useState<Task[]>([]);
    const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
const [title, setTitle] = useState('');
 const [description, setDescription] = useState('');
const [editingTaskId, setEditingTaskId] = useState<number | null>(null); 
const [editTitle, setEditTitle] = useState(''); 
const [editDescription, setEditDescription] = useState('');
const fetchTasks = async () => { try {
   const data = await fetchTasksApi(); setTasks(data); } catch (error) { 
    console.error('Failed to fetch tasks', error); } };
useEffect(() => { fetchTasks(); }, []);
const handleAddTask = async () => { if (!title.trim())
   { Alert.alert('Notice', 'Please enter a task title'); return; }
try {
  await addTaskApi({ title, description, completed: false });
  setTitle('');
  setDescription('');
  fetchTasks();
} catch (error) {
  Alert.alert('Error', 'Failed to add task');
}
};
const handleToggleTask = async (task: Task) => { 
  try { await updateTaskApi(task.id, { ...task, completed: !task.completed }); fetchTasks(); } 
  catch (error) { console.error('Failed to update task status', error); } };
const handleStartEdit = (task: Task) => 
  { setEditingTaskId(task.id); setEditTitle(task.title); 
    setEditDescription(task.description || ''); };
const handleSaveEdit = async (task: Task) => { try 
  { await updateTaskApi(task.id, { ...task, title: editTitle, description: editDescription });
   setEditingTaskId(null); fetchTasks(); } catch (error) { Alert.alert('Error', 'Failed to update task'); } };
const handleDeleteTask = async (id: number) => {
   try { await deleteTaskApi(id); fetchTasks(); } 
   catch (error) { console.error('Failed to delete task', error); } };
const filteredTasks = tasks.filter((task) => { 
  if (filter === 'active') return !task.completed; 
  if (filter === 'completed') return task.completed; return true; });
return { filteredTasks, filter, setFilter, title, setTitle, description, setDescription, editingTaskId, setEditingTaskId, editTitle, setEditTitle, editDescription, setEditDescription, handleAddTask, handleToggleTask, handleStartEdit, handleSaveEdit, handleDeleteTask, }; }