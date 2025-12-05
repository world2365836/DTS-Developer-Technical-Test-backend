import { Task } from "../interface/Task";
import { query } from "../../config/database";

export class TaskModel {
  static async create(task: Task): Promise<Task> {
  try {
    const sql = `
      INSERT INTO Task (
        id, 
        title, 
        description, 
        status, 
        due_date_time, 
        created_at, 
        updated_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `;

    const values = [
      task.id,
      task.title,
      task.description|| null,
      task.status,
      task.due_date_time,
      task.created_at || new Date().toISOString(),
      task.updated_at || new Date().toISOString(),
    ];



    const result = await query(sql, values);

    if (!result.rows || result.rows.length === 0) {
      throw new Error("Failed to create task - no data returned");
    }

    return result.rows[0];
  } catch (error) {
    console.error("Error creating Task:", error);
    throw new Error(
      `Failed to create task: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }

}
  
  
}
