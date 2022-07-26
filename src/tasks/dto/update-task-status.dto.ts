import { IsEnum } from 'class-validator';
import { TaskStatus } from '../tasks.status.enum';

export class UpdateStatusDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
