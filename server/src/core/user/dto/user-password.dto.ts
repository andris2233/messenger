import { ApiPropertyOptional } from '@nestjs/swagger';

export class UserPatchPasswordDto {
  @ApiPropertyOptional({ default: '1234' })
  oldPassword: string;

  @ApiPropertyOptional({ default: '4321' })
  newPassword: string;
}
