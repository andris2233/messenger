import { ApiProperty } from '@nestjs/swagger';

export class UserGetDto {
  @ApiProperty({ default: 1 })
  id: number;

  @ApiProperty({ default: 'test@example.com' })
  email?: string;

  @ApiProperty({ default: 'ivan3000' })
  username?: string;

  @ApiProperty({ default: '1234' })
  password?: string;

  @ApiProperty({ default: 'Ivan' })
  firstName?: string;

  @ApiProperty({ default: 'Ivanov' })
  lastName?: string;

  @ApiProperty({ default: false })
  isPrivate?: boolean;
}
