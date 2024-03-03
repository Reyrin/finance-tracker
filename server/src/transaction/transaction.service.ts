import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
  ) {}

  async create(id: number, createTransactionDto: CreateTransactionDto) {
    const { title, amount, type, category } = createTransactionDto;

    const newTransaction = {
      title,
      amount,
      type,
      category: { id: +category },
      user: { id },
    };

    if (!newTransaction) throw new BadRequestException('Something went wrong');

    return await this.transactionRepository.save(newTransaction);
  }

  async findAll(id: number) {
    const transactions = await this.transactionRepository.find({
      where: { user: { id } },
      order: { createdAt: 'DESC' },
    });

    return transactions;
  }

  async findOne(id: number) {
    const transaction = await this.transactionRepository.find({
      where: { id },
      relations: { user: true, category: true },
    });

    if (!transaction.length)
      throw new NotFoundException('Transaction not found');

    return transaction;
  }

  async update(id: number, updateTransactionDto: UpdateTransactionDto) {
    const transaction = await this.transactionRepository.findOne({
      where: { id },
    });

    if (!transaction) throw new NotFoundException('Transaction not found');

    return await this.transactionRepository.update(id, updateTransactionDto);
  }

  async remove(id: number) {
    const transaction = await this.transactionRepository.findOne({
      where: { id },
    });

    if (!transaction) throw new NotFoundException('Transaction not found');

    return await this.transactionRepository.delete(id);
  }
}
