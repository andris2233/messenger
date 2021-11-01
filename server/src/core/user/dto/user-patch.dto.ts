import { ApiPropertyOptional } from '@nestjs/swagger';

export class UserPatchDto {
  @ApiPropertyOptional({ default: 'test@example.com' })
  email?: string;

  @ApiPropertyOptional({ default: 'ivan3000' })
  username?: string;

  @ApiPropertyOptional({ default: '1234' })
  password?: string;

  @ApiPropertyOptional({ default: 'Ivan' })
  firstName?: string;

  @ApiPropertyOptional({ default: 'Ivanov' })
  lastName?: string;

  @ApiPropertyOptional({ default: false })
  isPrivate?: boolean;
}
