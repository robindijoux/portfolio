import { Module } from '@nestjs/common';
import { AuthenticationController } from './controller/authentication.controller';
import { AuthenticationService } from './service/authentication.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule, JwtModuleOptions, JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            User
        ]),
        JwtModule.registerAsync({
            useFactory: async (configService: ConfigService): Promise<JwtModuleOptions> => {
              console.log(configService.get('jwt'));
              return ({
                global: true,
                secret: configService.get('jwt').secret,
                signOptions: { expiresIn: '24h' },
              })
            },
            inject: [ConfigService], 
          }),
    ],
    controllers: [
        AuthenticationController
    ],
    providers: [
        AuthenticationService,
    ],
    exports: [
        AuthenticationService,
    ],
})
export class AuthenticationModule {}
