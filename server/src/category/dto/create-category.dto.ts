import { IsNotEmpty, IsOptional } from 'class-validator';
import { User } from 'src/user/entities/user.entity';

export class CreateCategoryDto {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  color: string;
  @IsOptional()
  user?: User;
}
