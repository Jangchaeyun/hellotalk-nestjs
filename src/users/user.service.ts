import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hashPassword } from 'src/utils/helpers';
import { User } from 'src/utils/typeorm';
import { CreateUserDetails, findUserParams } from 'src/utils/types';
import { Repository } from 'typeorm';
import { IUserService } from './user';

@Injectable()
export class UserService implements IUserService {
     constructor(
          @InjectRepository(User) private readonly userRepository: Repository<User>,) { }

     async createUser(userDetails: CreateUserDetails) {
          const existingUser = await this.userRepository.findOne({
               email: userDetails.email,
          });
          if (existingUser)
               throw new HttpException('사용자가 이미 존재합니다.', HttpStatus.CONFLICT);
          const password = await hashPassword(userDetails.password);
          const newUser = this.userRepository.create({ ...userDetails, password });
          return this.userRepository.save(newUser);
     }

     async findUser(findUserParams: findUserParams): Promise<User> {
          return this.userRepository.findOne(findUserParams);
     }
}
