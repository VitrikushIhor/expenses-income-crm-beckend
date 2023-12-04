import {
	CanActivate,
	ExecutionContext,
	Injectable,
	NotFoundException,
} from '@nestjs/common'
import { TransactionService } from '../transaction/transaction.service'
import { CategoryService } from '../category/category.service'

@Injectable()
export class AuthorGuard implements CanActivate {
	constructor(
		private transactionService: TransactionService,
		private categoryService: CategoryService
	) {}
	async canActivate(context: ExecutionContext) {
		const request = context.switchToHttp().getRequest()
		const { id, type } = request.params
		let entyty
		switch (type) {
			case 'transaction':
				entyty = await this.transactionService.findOne(id)
				break
			case 'category':
				entyty = await this.categoryService.findOne(id)
				break
			default:
				throw new NotFoundException('Something was wrong')
				break
		}
		const user = request.user

		if (entyty && user && entyty.user.id === user.id) {
			return true
		}
		return false
	}
}
