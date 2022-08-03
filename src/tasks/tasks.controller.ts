import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskStatus } from './tasks.status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateStatusDto } from './dto/update-task-status.dto';
import { Task } from './task.entity';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.entity';
import { Getuser } from 'src/auth/get-user.decorator';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(
    @Query() filterDto: GetTasksFilterDto,
    @Getuser() user: User,
  ): Promise<Task[]> {
    //fetch all tasks from db
    return this.tasksService.getTasks(filterDto, user);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string, @Getuser() user: User): Promise<Task> {
    return this.tasksService.getTaskById(id, user);
  }

  @Post()
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @Getuser() user: User,
  ): Promise<Task> {
    return this.tasksService.createTask(createTaskDto, user);
  }

  @Delete('/:id')
  removeTask(@Param('id') id: string, @Getuser() user: User): Promise<void> {
    return this.tasksService.removeTask(id, user);
  }

  @Patch('/:id/status')
  updateTask(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateStatusDto,
    @Getuser() user: User,
  ): Promise<Task> {
    const { status } = updateStatusDto;
    return this.tasksService.updateTask(id, status, user);
  }

  // // @Get()
  // // getAllTasks(): Task[] {
  // //   return this.tasksService.getAllTasks();
  // // }

  // @Get()
  // getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
  //   //if there is any filter call the filter method else return all tasks

  //   if (Object.keys(filterDto).length) {
  //     return this.tasksService.getTaskFilters(filterDto);
  //   } else {
  //     return this.tasksService.getAllTasks();
  //   }
  // }

  // @Get('/:id')
  // getOneTask(@Param('id') id: string): Task {
  //   return this.tasksService.getOneTask(id);
  // }

  // @Post(/tasks)
  // createTask(@Body() createTaskDto: CreateTaskDto): Task {
  //   return this.tasksService.createTask(createTaskDto);
  // }

  // @Patch('/:id/status')
  // updateTask(
  //   @Param('id') id: string,
  //   @Body() updateStatusDto: UpdateStatusDto,
  // ): Task {
  //   const { status } = updateStatusDto;
  //   return this.tasksService.updateTask(id, status);
  // }

  // @Delete('/:id')
  // removeTask(@Param('id') id: string): void {
  //   return this.tasksService.removeTask(id);
  // }
}
