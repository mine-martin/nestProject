import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './tasks.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateStatusDto } from './dto/update-task-status.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  // @Get()
  // getAllTasks(): Task[] {
  //   return this.tasksService.getAllTasks();
  // }

  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
    //if there is any filter call the filter method else return all tasks

    if (Object.keys(filterDto).length) {
      return this.tasksService.getTaskFilters(filterDto);
    } else {
      return this.tasksService.getAllTasks();
    }
  }

  @Get('/:id')
  getOneTask(@Param('id') id: string): Task {
    return this.tasksService.getOneTask(id);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(createTaskDto);
  }

  @Patch('/:id/status')
  updateTask(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateStatusDto,
  ): Task {
    const { status } = updateStatusDto;
    return this.tasksService.updateTask(id, status);
  }

  @Delete('/:id')
  removeTask(@Param('id') id: string): void {
    return this.tasksService.removeTask(id);
  }
}
