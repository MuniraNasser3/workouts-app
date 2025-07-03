import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) // Connects service to the user DB table
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  // Create/Register a new user
  async create(createUserDto: CreateUserDto) {
    const { email, name, password } = createUserDto;

    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 8); // Encrypts password
    const newUser = this.userRepository.create({
      email,
      name,
      password: hashedPassword,
    });

    return this.userRepository.save(newUser);
  }

  // Login a user and return a JWT token
  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new BadRequestException('Invalid credentials');
    }

    const payload = { userId: user.id, email: user.email };
    const token = this.jwtService.sign(payload);

    return {
      access_token: token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        weightKg: user.weightKg,
      },
    };
  }

  // Get profile of the current user (not in The frontend)
  async findById(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  // Update name or weight of current user (not in The frontend)
  async updateUser(id: number, data: UpdateUserDto) {
    await this.userRepository.update({ id }, data);
    return this.findById(id); // Return updated user
  }
}


