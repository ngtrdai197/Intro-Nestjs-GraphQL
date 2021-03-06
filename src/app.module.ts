import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule } from '@nestjs/config'

import { UserModule } from './user/user.module'
import { PostModule } from './post/post.module'
import { PubsubModule } from './pubsub/pubsub.module'
import { AuthModule } from './auth/auth.module'
import { BookModule } from './book/book.module'
import { MongooseConfigService } from './common/services/mongoose.service'
import { ConversationModule } from './conversation/conversation.module'
import { MessageModule } from './message/message.module'

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService,
    }),
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.gql',
      context: ({ req }) => ({ req }),
    }),
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
      isGlobal: true,
    }),
    UserModule,
    PostModule,
    PubsubModule,
    AuthModule,
    BookModule,
    ConversationModule,
    MessageModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggerMiddleware).forRoutes('user')
  }
}
