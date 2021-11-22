import { ApiProperty } from '@nestjs/swagger';

class ConversationMemberDto {
  @ApiProperty({ default: 2 })
  id: number;

  @ApiProperty({ default: 'user1' })
  username: string;
}

export class ConversationDto {
  @ApiProperty({ default: 1 })
  id: number;

  @ApiProperty({ default: null })
  title: string | null;

  @ApiProperty({ default: 'DIALOGUE' })
  cType: string;

  @ApiProperty({ default: '2021-11-19T13:40:44.370Z' })
  lastMessageDate: string;

  @ApiProperty({ default: [{ id: 2, username: 'user1' }] })
  conversationMembers?: ConversationMemberDto[];
}
