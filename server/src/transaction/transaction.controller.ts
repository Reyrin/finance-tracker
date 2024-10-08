import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { AuthorGuard } from 'src/guards/author.guard';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createTransactionDto: CreateTransactionDto, @Req() req) {
    return this.transactionService.create(+req.user.id, createTransactionDto);
  }

  @Get()
  findAll(@Req() req) {
    return this.transactionService.findAll(+req.user.id);
  }

  @Get('statistics')
  statistics(@Req() req) {
    return this.transactionService.getStatistic(+req.user.id);
  }

  @Get(':id')
  @UseGuards(AuthorGuard)
  findOne(@Param('id') id: string) {
    return this.transactionService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthorGuard)
  update(
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    return this.transactionService.update(+id, updateTransactionDto);
  }

  @Delete(':id')
  @UseGuards(AuthorGuard)
  remove(@Param('id') id: string) {
    return this.transactionService.remove(+id);
  }
}
