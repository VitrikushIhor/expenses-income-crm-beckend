import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Category } from './entities/category.entity'
import { Repository } from 'typeorm'

@Injectable()
export class CategoryService {
	constructor(
		@InjectRepository(Category)
		private categoryRepository: Repository<Category>
	) {}

	async create(createCategoryDto: CreateCategoryDto, id: number) {
		const isExist = await this.categoryRepository.findBy({
			user: { id },
			title: createCategoryDto.title,
		})

		if (isExist.length) {
			throw new BadRequestException('Category already exists')
		}

		const newCategory = {
			title: createCategoryDto.title,
			user: { id },
		}

		return await this.categoryRepository.save(newCategory)
	}

	async findAll(id: number) {
		return await this.categoryRepository.find({
			where: {
				user: { id },
			},
			relations: {
				transactions: true,
			},
		})
	}

	async findOne(id: number) {
		const isExist = await this.categoryRepository.findOne({
			where: {
				id,
			},
			relations: {
				user: true,
				transactions: true,
			},
		})

		if (!isExist) {
			throw new NotFoundException('Category not found')
		}

		return isExist
	}

	async update(id: number, updateCategoryDto: UpdateCategoryDto) {
		const category = await this.categoryRepository.findOne({
			where: { id: id },
		})

		if (!category) {
			throw new NotFoundException('Category not found')
		}
		return await this.categoryRepository.update(id, updateCategoryDto)
	}

	async remove(id: number) {
		const category = await this.categoryRepository.findOne({
			where: { id: id },
		})
		if (!category) {
			throw new NotFoundException('Category not found')
		}
		return await this.categoryRepository.delete(id)
	}
}
