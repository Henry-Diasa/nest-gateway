import { RECEIVE_TYPE, MSG_TYPE } from '@/helper/feishu/message';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEnum } from 'class-validator';

export class FeishuMessageDto {
  @IsNotEmpty()
  @IsEnum(RECEIVE_TYPE)
  @ApiProperty({ example: 'email', enum: RECEIVE_TYPE })
  receive_id_type: RECEIVE_TYPE;

  @ApiProperty({ example: 'cookieboty@qq.com' })
  receive_id?: string;

  @ApiProperty({ example: '{"text":" test content"}' })
  content?: string;

  @ApiProperty({ example: 'text', enum: MSG_TYPE })
  msg_type?: keyof MSG_TYPE;
}

export class GetUserTokenDto {
  @IsNotEmpty()
  @ApiProperty({ example: 'xxxx', description: '飞书临时登录凭证' })
  code: string;
  app_token: string;
}
export class FeishuUserInfo {
  accessToken?: string;
  email: string;
  avatarUrl: string;
  avatarThumb: string;
  avatarBig: string;
  avatarMiddle: string;
  mobile: string;
  enName: string;
  name: string;
  feishuUserId: string;
  feishuUnionId: string;
}
