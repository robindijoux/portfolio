import { ConflictException, Injectable, InternalServerErrorException, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CredentialsDto } from '../dto/credentials.dto';
import * as bcrypt from 'bcrypt';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

export interface JwtPayload {
  username: string;
}

@ApiTags('Authentication')
@Injectable({
  
})
export class AuthenticationService {

  private readonly logger = new Logger(AuthenticationService.name);

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: CredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;
  
    const existingUser = await this.userRepository.findOneBy({ username });
  
    if (existingUser) {
      throw new ConflictException('Username already exists');
    }
  
    const user = new User();
    user.username = username;
    const salt = bcrypt.genSaltSync();
    user.password = await bcrypt.hash(password, salt);
  
    try {
      await this.userRepository.save(user);
    } catch (error) {
      throw new InternalServerErrorException('Could not create user: ' + error.message);
    }
  }
  
  async signIn(authCredentialsDto: CredentialsDto): Promise<{ accessToken: string }> {
    const { username, password } = authCredentialsDto;
  
    const user = await this.userRepository.findOneBy({ username });
  
    if (user && (await bcrypt.compare(password, user.password))) {
      this.logger.log(`User ${username} signed in ${user.id}`);
      const payload: JwtPayload = { username };
      const accessToken = await this.jwtService.signAsync(payload, {
        expiresIn: '24h',
      });
      return { accessToken };
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
