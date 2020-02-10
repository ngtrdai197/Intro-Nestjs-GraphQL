import { Resolver, Mutation, Args } from '@nestjs/graphql'

import { Book, CreateNewBookInput, EditBookInput } from '../book.entity'
import { GqlUser } from '@/common/decorators'
import { IUser } from '@/user/interface/user.interface'
import { IBook } from '../interface/book.interface'
import { BookService } from '../book.service'

@Resolver(() => Book)
export class BookMutationResolver {
  constructor(private readonly bookService: BookService) {}

  @Mutation(() => Book)
  async createBook(
    @GqlUser() user: IUser,
    @Args('newBook') newBookInput: CreateNewBookInput,
  ): Promise<IBook> {
    newBookInput.createdById = user.id
    return await this.bookService.create(newBookInput)
  }

  @Mutation(() => Book)
  async update(
    @Args('bookId') bookId: string,
    @Args('editBook') editBookInput: EditBookInput,
  ): Promise<IBook> {
    return await this.bookService.findByIdAndUpdate(bookId, editBookInput, {
      new: true,
    })
  }
}
