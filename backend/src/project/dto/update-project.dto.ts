import { ApiProperty } from '@nestjs/swagger';
import { UpdateParagraphDto } from '../paragraph/dto/update-paragraph.dto';

export class UpdateProjectDto {
  @ApiProperty({ required: false, example: 'Updated Project' })
  title?: string;

  @ApiProperty({ required: false, example: 'Updated project content' })
  content?: string;

  @ApiProperty({
    type: [UpdateParagraphDto],
    required: false,
    example: [
      {
        id: '1',
        title: 'Updated Paragraph 1',
        content: 'Updated paragraph content',
      },
    ],
  })
  paragraphs?: UpdateParagraphDto[];
}
