import { ApiProperty } from '@nestjs/swagger';

export default class UserDto {
  @ApiProperty({ default: 'ivan3000' })
  username: string;

  @ApiProperty({ default: 'test@example.com' })
  email: string;

  @ApiProperty({ default: '1234' })
  password: string;
}
