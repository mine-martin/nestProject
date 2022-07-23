import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksController } from './tasks.controller';
import { TasksRepository } from './tasks.repository';
import { TasksService } from './tasks.service';

@Module({
  imports: [
    // import other modules here
    TypeOrmModule.forFeature([TasksRepository]),
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
