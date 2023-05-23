import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthenticationService } from '../service/authentication.service';
import { CredentialsDto } from '../dto/credentials.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('authentication')
export class AuthenticationController {
  constructor(private authService: AuthenticationService) {}

  @Post('/signup')
  @ApiOperation({ summary: 'Sign Up' })
  @ApiResponse({ status: 201, description: 'Successfully signed up' })
  signUp(
    @Body() authCredentialsDto: CredentialsDto,
  ): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  @ApiOperation({ summary: 'Sign In' })
  @ApiResponse({
    status: 200,
    description: 'Successfully signed in',
    schema: {
      properties: {
        accessToken: {
          type: 'string',
          example:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNjIzMzIyMzIyLCJleHAiOjE2MjM0MDY3MjJ9.XXX',
        },
      },
    },
  })
  signIn(
    @Body() authCredentialsDto: CredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsDto);
  }
}
