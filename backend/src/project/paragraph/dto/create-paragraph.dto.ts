import { ApiProperty } from '@nestjs/swagger';

export class CreateParagraphDto {
  @ApiProperty({ example: 'Title', description: 'The title of the paragraph' })
  title: string;

  @ApiProperty({ example: 'Content', description: 'The content of the paragraph' })
  content: string;
}
