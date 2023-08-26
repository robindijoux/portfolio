import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { AuthenticationService } from './authentication/service/authentication.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService implements OnApplicationBootstrap {

    private readonly logger = new Logger(AppService.name);

    constructor(
        private authenticationService: AuthenticationService,
        private configService: ConfigService,
    ) {}

    onApplicationBootstrap() {
        // this.logger.log(`Config: ${JSON.stringify(this.configService)}`)
    }
}
 