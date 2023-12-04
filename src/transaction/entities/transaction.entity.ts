import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'
import { User } from '../../user/entities/user.entity'
import { Category } from '../../category/entities/category.entity'

@Entity()
export class Transaction {
	@PrimaryGeneratedColumn({ name: 'transition_id' })
	id: number

	@Column()
	title: string

	@Column({ nullable: true })
	type: string

	@ManyToOne(() => User, (user) => user.transactions)
	@JoinColumn({ name: 'user_id' })
	user: User

	@ManyToOne(() => Category, (category) => category.transactions)
	@JoinColumn({ name: 'category_id' })
	category: Category

	@Column()
	amount: number

	@CreateDateColumn()
	createdAt: Date

	@UpdateDateColumn()
	updatedAt: Date
}
