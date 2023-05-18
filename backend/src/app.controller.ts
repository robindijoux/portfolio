import { Controller, Get, Inject, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import databaseConfig from './config/database.config';
import { ConfigType } from '@nestjs/config';

@Controller()
export class AppController {
  private logger = new Logger("AppController");
  
  constructor(
    private readonly appService: AppService, 
    @Inject(databaseConfig.KEY) private dbConfig: ConfigType<typeof databaseConfig>
  ) {    
    
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
