import { ApiProperty } from '@nestjs/swagger';
import { CreateParagraphDto } from '../paragraph/dto/create-paragraph.dto';

export class CreateProjectDto {
  @ApiProperty({ example: 'My Project' })
  title: string;

  @ApiProperty({ example: 'Project content' })
  content: string;

  @ApiProperty({
    type: [CreateParagraphDto],
    example: [{ title: 'Paragraph 1', content: 'Paragraph content' }],
  })
  paragraphs: CreateParagraphDto[];
}
