import { useState } from 'react';
 import { Alert } from 'react-native';
  import { useRouter } from 'expo-router'; 
  import { createApi } from '../api/createApi';
export function useCreateTask() { 
  const router = useRouter();
   const [title, setTitle] = useState<string>(''); 
   const [description, setDescription] = useState<string>(''); 
   const [loading, setLoading] = useState<boolean>(false);
const handleCreateTask = async () => {
   if (!title.trim()) { 
    Alert.alert('Error', 'Please enter a task title'); 
    return; }
setLoading(true);

try {
  await createApi({
    title,
    description,
    completed: false,
  });

  Alert.alert('Success', 'Task created successfully!');
  router.back();
} catch (error) {
  console.error(error);
  Alert.alert('Error', 'Failed to create task. Please try again.');
} finally {
  setLoading(false);
}
};
return { title, setTitle, description, setDescription, loading, handleCreateTask, router, }; }