import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(userId: number, createCategoryDto: CreateCategoryDto) {
    const isExist = await this.categoryRepository.findOneBy({
      user: { id: userId },
      title: createCategoryDto.title,
    });

    if (isExist) throw new BadRequestException('This category already exist');

    const newCategory = {
      title: createCategoryDto.title.trim(),
      color: createCategoryDto.color,
      user: { id: userId },
    };

    return await this.categoryRepository.save(newCategory);
  }

  async findAll(id: number) {
    return await this.categoryRepository.find({
      where: { user: { id } },
      relations: { transactions: true },
      order: {
        id: 'DESC',
      },
    });
  }

  async findOne(id: number) {
    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: { user: true, transactions: true },
    });

    if (!category) throw new NotFoundException('Category not found');

    return category;
  }

  async update(
    categoryId: number,
    userId: number,
    updateCategoryDto: UpdateCategoryDto,
  ) {
    const category = await this.categoryRepository.findOne({
      where: { id: categoryId },
    });

    if (!category) throw new NotFoundException('Category not found');

    const dublicate = await this.categoryRepository.findOneBy({
      user: { id: userId },
      title: updateCategoryDto.title,
    });

    if (dublicate && dublicate.id !== categoryId)
      throw new BadRequestException('This category already exist');

    return await this.categoryRepository.update(categoryId, updateCategoryDto);
  }

  async remove(id: number) {
    const category = await this.categoryRepository.findOne({ where: { id } });

    if (!category) throw new NotFoundException('Category not found');

    return await this.categoryRepository.delete(id);
  }
}
