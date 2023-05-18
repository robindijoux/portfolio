import { Module } from '@nestjs/common';
import { ParagraphService } from './paragraph.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Paragraph } from './entities/paragraph.entity';

@Module({
  controllers: [],
  providers: [ParagraphService],
  exports: [ParagraphService],
  imports: [
    TypeOrmModule.forFeature([
      Paragraph
    ])
  ]
})
export class ParagraphModule {}
