import { ResolveField, Parent, Args, Resolver, Int } from '@nestjs/graphql'

import { Conversation } from '../conversation.entity'
import { UserService } from '@/user/user.service'
import { User } from '@/user/user.entity'
import { IUser } from '@/user/interface/user.interface'
import { PaginationMessage } from '@/message/message.entity'
import { IMessage } from '@/message/interfaces/message.interface'
import { MessageService } from '@/message/message.service'
import { IPagination } from '@/common/base.interface'

@Resolver(() => Conversation)
export class ConversationPropertyResolver {
  constructor(
    private readonly userService: UserService,
    private readonly messageService: MessageService,
  ) {}

  @ResolveField('participants', () => [User])
  async getParticipants(
    @Parent() conversation: Conversation,
  ): Promise<IUser[]> {
    return await this.userService.find({
      _id: { $in: conversation.participantIds },
    })
  }

  @ResolveField('messages', () => PaginationMessage)
  async getMessages(
    @Parent() conversation: Conversation,
    @Args({ name: 'limit', type: () => Int }) limit: number,
    @Args({ name: 'skip', type: () => Int }) skip: number,
  ): Promise<IPagination<IMessage>> {
    return this.messageService.pagination({
      query: { _id: { $in: conversation.messageIds } },
      limit,
      skip,
      sort: { createdAt: -1 },
    })
  }
}
