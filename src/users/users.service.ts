import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { CreateAccountInput } from './dtos/create-account.dto';
import { LoginInput } from './dtos/login.dto';
import { JwtService } from 'src/jwt/jwt.service';
import { EditProfileInput } from './dtos/edit-profile.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  // check new user & create user
  async createAccount({
    email,
    password,
    role,
  }: CreateAccountInput): Promise<[boolean, string?]> {
    try {
      const exists = await this.users.findOne({ where: { email } });
      if (exists) {
        return [false, 'There is a user with that email already'];
      }
      await this.users.save(this.users.create({ email, password, role }));
      return [true];
    } catch (e) {
      return [false, 'Could not create account'];
    }
  }

  async login({
    email,
    password,
  }: LoginInput): Promise<[boolean, string?, string?]> {
    try {
      const user = await this.users.findOne({ where: { email } });
      if (!user) {
        return [false, 'User not found'];
      }
      const passwordCorrect = await user.checkPassword(password);
      if (!passwordCorrect) {
        return [false, 'Wrong password'];
      }
      const token = this.jwtService.sign(user.id);
      return [true, null, token];
    } catch (error) {
      return [false, 'Could not login'];
    }
  }

  async findById(id: number): Promise<User> {
    return this.users.findOne({ where: { id } });
  }

  async editProfile(
    userId: number,
    { email, password }: EditProfileInput,
  ): Promise<User> {
    const user = await this.users.findOne({ where: { id: userId } });
    if (email) {
      user.email = email;
    }
    if (password) {
      user.password = password;
    }
    return this.users.save(user);
  }
}
