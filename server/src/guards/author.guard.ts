import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CategoryService } from 'src/category/category.service';
import { Category } from 'src/category/entities/category.entity';
import { Transaction } from 'src/transaction/entities/transaction.entity';
import { TransactionService } from 'src/transaction/transaction.service';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthorGuard implements CanActivate {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly transactionService: TransactionService,
  ) {}

  public async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const entity = await this.getEntityFromRequest(request);

    return this.isEntityAuthorized(entity, request.user);
  }

  private async getEntityFromRequest(request: {
    url: string;
    params: { id: string };
  }) {
    const services: { [key: string]: CategoryService | TransactionService } = {
      categories: this.categoryService,
      transactions: this.transactionService,
    };

    const resource = request.url.split('/')[2];

    if (!(resource in services))
      throw new NotFoundException('Resource not found');

    return await services[resource].findOne(+request.params.id);
  }

  private isEntityAuthorized(entity: Category | Transaction, user: User) {
    return !!entity && !!user && entity.user.id === user.id;
  }
}
