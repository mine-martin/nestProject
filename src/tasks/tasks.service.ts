import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks() {
    return this.tasks;
  }

  getOneTask(id: string): Task {
    return this.tasks.find((task) => task.id === id);
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;

    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  // updateTask(id: string, status: TaskStatus) {
  //   this.tasks.find((task) => task.id === id);
  //   const task: Task = {
  //     id,
  //     status,
  //   };
  //   this.tasks.push(task);
  //   return task;
  // }

  updateTask(id: string, status: TaskStatus) {
    const task = this.getOneTask(id);
    task.status = status;
    return task;
  }

  removeTask(id: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }
}
