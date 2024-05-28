import {
  Controller,
  Post,
  Body,
  Req,
  UsePipes,
  ValidationPipe,
  Get,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { AuthorGuard } from 'src/guards/author.guard';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createCategoryDto: CreateCategoryDto, @Req() req) {
    return this.categoryService.create(+req.user.id, createCategoryDto);
  }

  @Get()
  findAll(@Req() req) {
    return this.categoryService.findAll(+req.user.id);
  }

  @Get(':id')
  @UseGuards(AuthorGuard)
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthorGuard)
  update(
    @Param('id') categoryId: string,
    @Req() req,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(
      +categoryId,
      +req.user.id,
      updateCategoryDto,
    );
  }

  @Delete(':id')
  @UseGuards(AuthorGuard)
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
