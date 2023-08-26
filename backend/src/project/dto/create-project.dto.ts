import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {
  @ApiProperty({ example: 'My Project Title' })
  title: string;

  @ApiProperty({ example: '<div>some html</div>', required: false })
  htmlContent?: string;
}
