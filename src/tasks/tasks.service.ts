import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './tasks.status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';



@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository,
  ) { }

  getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {

    return this.tasksRepository.getTasks(filterDto);
  }

  async getTaskById(id: string): Promise<Task> {
    const found = await this.tasksRepository.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException(`Task with id ${id} not found`)
    }

    return found;
  }

  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto)
  }

  async removeTask(id: string): Promise<void> {
    const result = await this.tasksRepository.delete(id)

    if (result.affected === 0) {
      throw new NotFoundException(`Task with id ${id} not found`)
    }

  }

  async updateTask(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);
    task.status = status;

    await this.tasksRepository.save(task);

    return task;
  }


  // private tasks: Task[] = [];
  // getAllTasks() {
  //   return this.tasks;
  // }
  // getTaskFilters(filterDto: GetTasksFilterDto): Task[] {
  //   const { status, search } = filterDto;
  //   //define array to hold the results
  //   let tasks = this.getAllTasks();
  //   //do the filter here with status
  //   if (status) {
  //     tasks = tasks.filter((task) => task.status === status);
  //   }
  //   //do the filter here with search
  //   if (search) {
  //     tasks = tasks.filter((task) => {
  //       if (task.title.includes(search) || task.description.includes(search)) {
  //         return true;
  //       }
  //       throw new NotFoundException(`No task with search ${search}`);
  //     });
  //   }
  //   //return the results
  //   return tasks;
  // }
  // getOneTask(id: string): Task {
  //   //get a task
  //   const foundTask = this.tasks.find((task) => task.id === id);
  //   //if !found throw error (404)
  //   //then return the task found
  //   if (!foundTask) {
  //     throw new NotFoundException(`Task with id "${id}" not found`);
  //   }
  //   return foundTask;
  // }
  // createTask(createTaskDto: CreateTaskDto): Task {
  //   const { title, description } = createTaskDto;
  //   const task: Task = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: TaskStatus.OPEN,
  //   };
  //   this.tasks.push(task);
  //   return task;
  // }
  // // updateTask(id: string, status: TaskStatus) {
  // //   this.tasks.find((task) => task.id === id);
  // //   const task: Task = {
  // //     id,
  // //     status,
  // //   };
  // //   this.tasks.push(task);
  // //   return task;
  // // }
  // updateTask(id: string, status: TaskStatus) {
  //   const task = this.getOneTask(id);
  //   task.status = status;
  //   return task;
  // }
  // removeTask(id: string): void {
  //   this.tasks = this.tasks.filter((task) => task.id !== id);
  // }
}
