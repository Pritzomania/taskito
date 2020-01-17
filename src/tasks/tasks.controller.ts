import { Task, TaskStatus } from "./task.model";
import { TasksService } from "./tasks.service";
import { Controller, Get, Post, Body } from "@nestjs/common";

@Controller("tasks")
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.taskService.getAllTasks();
  }

  @Post()
  createTask(@Body("title") title, @Body("description") description): Task {
    return this.taskService.createTask(title, description);
  }
}
