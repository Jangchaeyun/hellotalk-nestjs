import { Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { IUserService } from 'src/users/user';
import { Services } from 'src/utils/constants';
import { compareHash } from 'src/utils/helpers';
import { ValidateUserDetails } from 'src/utils/types';
import { IAuthService } from './auth';

@Injectable()
export class AuthService implements IAuthService {
     constructor(@Inject(Services.USERS) private readonly userService: IUserService,) { }
     
     async validateUser(userDetails: ValidateUserDetails) {
          const user = await this.userService.findUser({ email: userDetails.email });
          if (!user)
               throw new HttpException('Invalid Credentials', HttpStatus.UNAUTHORIZED);
          const isPasswordValid = compareHash(
               userDetails.password,
               user.password,
          );
          return isPasswordValid ? user : null;
     }
}
