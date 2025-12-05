import { Request, Response } from "express";
import { post ,get} from "./decorators/routes";
import { controller } from "./decorators/controller";
import { use } from "./decorators/use";
import { validateTask } from "./decorators/controller";
import { TaskModel } from "../models/schema/Task";
import { generateUUID } from "../utils/uuidGenerator";



@controller("")
class RootController {



@post("/addtask")
@use(validateTask)
async createProduct(req: Request, res: Response): Promise<void> {

  const id = `${generateUUID()}`;
  
  
  
  req.body.created_at=new Date().toDateString();
  req.body.updated_at = new Date().toDateString();
  const Task= {
    id,
    ...req.body
  };

  try {
    const newTask = await TaskModel.create(Task);
    res.status(201).json({
      message: "Product created successfully",

      task: newTask,
    });
  } catch (error) {
    res.status(500).json({ message: "an error occurred, try again" });
  } 
}
}
