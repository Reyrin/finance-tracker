import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Category } from 'src/category/entities/category.entity';
import { User } from 'src/user/entities/user.entity';

export class CreateTransactionDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @IsString()
  type: 'income' | 'expense';

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  category: Category;

  @IsOptional()
  user?: User;
}
