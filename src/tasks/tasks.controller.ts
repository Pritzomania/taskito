import { User } from "./../auth/user.entity";
import { TaskStatusValidationPipe } from "./pipes/task-status-valdation.pipe";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TasksService } from "./tasks.service";
import { Task } from "./task.entity";
import { TaskStatus } from "./task-status.enum";
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  UseGuards,
  Logger
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { GetUser } from "src/auth/get-user.decorator";

@Controller("tasks")
@UseGuards(AuthGuard())
export class TasksController {
  private logger = new Logger("TasksController");
  constructor(private taskService: TasksService) {}

  @Get()
  getTasks(
    @Query(ValidationPipe) filterDto: GetTasksFilterDto,
    @GetUser() user: User
  ) {
    this.logger.verbose(
      `Get Tasks run with filter: ${JSON.stringify(filterDto)}`
    );
    return this.taskService.getTasks(filterDto, user);
  }

  @Get("/:id")
  getTaskById(
    @Param("id", ParseIntPipe) id: number,
    @GetUser() user: User
  ): Promise<Task> {
    return this.taskService.getTaskById(id, user);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User
  ): Promise<Task> {
    return this.taskService.createTask(createTaskDto, user);
  }

  @Delete("/:id")
  deleteTaskById(
    @Param("id", ParseIntPipe) id: number,
    @GetUser() user: User
  ): Promise<void> {
    return this.taskService.deleteTask(id, user);
  }

  @Patch("/:id/status")
  updateTaskStatus(
    @Param("id", ParseIntPipe) id: number,
    @Body("status", TaskStatusValidationPipe) status: TaskStatus,
    @GetUser() user: User
  ): Promise<Task> {
    return this.taskService.updateTaskStatus(id, status, user);
  }
}
