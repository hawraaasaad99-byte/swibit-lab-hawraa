
export interface tasks{
  id:  number;
  title: string;
  description?: string;
  completed?: boolean
  created_at?: string;
}
export type Task = tasks;

export interface User {
  id: string | number;
  username?: string;
  email: string;
}
