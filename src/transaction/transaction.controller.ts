import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Query,
	Request,
	UseGuards,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common'
import { TransactionService } from './transaction.service'
import { CreateTransactionDto } from './dto/create-transaction.dto'
import { UpdateTransactionDto } from './dto/update-transaction.dto'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { AuthorGuard } from '../guard/author-guard'

@Controller('transaction')
export class TransactionController {
	constructor(private readonly transactionService: TransactionService) {}

	@Post()
	@UsePipes(new ValidationPipe())
	@UseGuards(JwtAuthGuard)
	create(
		@Body() createTransactionDto: CreateTransactionDto,
		@Request() request
	) {
		return this.transactionService.create(
			createTransactionDto,
			+request.user.id
		)
	}

	@Get(':type/find')
	@UseGuards(JwtAuthGuard)
	findAllByType(@Request() request, @Param('type') type: string) {
		return this.transactionService.findAllByType(+request.user.id, type)
	}

	@Get('pagination')
	@UseGuards(JwtAuthGuard)
	findAllWithPagination(
		@Request() request,
		@Query('page') page: number,
		@Query('limit') limit: number
	) {
		return this.transactionService.findAllWithPagination(
			+request.user.id,
			+page,
			+limit
		)
	}

	@Get()
	@UseGuards(JwtAuthGuard)
	findAll(@Request() request) {
		return this.transactionService.findAll(+request.user.id)
	}

	@Get(':type/:id')
	@UseGuards(JwtAuthGuard, AuthorGuard)
	findOne(@Param('id') id: string) {
		return this.transactionService.findOne(+id)
	}

	@Patch(':type/:id')
	@UseGuards(JwtAuthGuard, AuthorGuard)
	update(
		@Param('id') id: string,
		@Body() updateTransactionDto: UpdateTransactionDto
	) {
		return this.transactionService.update(+id, updateTransactionDto)
	}

	@Delete(':type/:id')
	@UseGuards(JwtAuthGuard, AuthorGuard)
	remove(@Param('id') id: string) {
		return this.transactionService.remove(+id)
	}
}
