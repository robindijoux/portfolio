import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateParagraphDto } from './create-paragraph.dto';

export class UpdateParagraphDto extends PartialType(CreateParagraphDto) {
  @ApiProperty({ example: 'Paragraph ID', description: 'The ID of the paragraph' })
  id: string;
}
