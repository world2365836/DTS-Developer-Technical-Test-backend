import { TaskStatus } from "../../utils/TaskStatus";
export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
   due_date_time: string;
  created_at: string;
  updated_at: string;
}

