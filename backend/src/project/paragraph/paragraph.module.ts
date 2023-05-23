import { Module } from '@nestjs/common';
import { ParagraphService } from './paragraph.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Paragraph } from './entities/paragraph.entity';
import { ParagraphController } from './paragraph.controller';
import { AuthenticationModule } from '../../authentication/authentication.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [ParagraphController],
  providers: [ParagraphService],
  exports: [ParagraphService],
  imports: [
    TypeOrmModule.forFeature([
      Paragraph
    ]),
    JwtModule
  ]
})
export class ParagraphModule {}
