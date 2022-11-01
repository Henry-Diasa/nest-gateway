import { Module, CacheModule } from '@nestjs/common';
import { DatabaseModule } from '@/common/database/database.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserProviders } from './user.providers';

import { FeishuService } from './feishu/feishu.service';
import { FeishuController } from './feishu/feishu.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController, FeishuController],
  providers: [...UserProviders, UserService, FeishuService],
  exports: [UserService],
})
export class UserModule {}
