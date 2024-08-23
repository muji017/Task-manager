export interface Task {
    id?: number;
    name: string;
    dateTime: string;
    priority: 'Low' | 'Medium' | 'High';
    description?: string;
    completed: boolean;
  }