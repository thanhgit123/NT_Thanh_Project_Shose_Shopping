import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  getUserByEmail(email: string) {
    return this.usersRepository.findOne({
      where: {
        email,
      },
    });
  }

  createUser(user) {
    return this.usersRepository
      .createQueryBuilder('users')
      .insert()
      .into(User)
      .values(user)
      .execute();
    
  }

  getAll() {
    return this.usersRepository.find();
  }

  getUserById(id: number) {
    return this.usersRepository.findOneBy({ user_id: id });
  }

  async changeStatus(id) {
    const user = await this.usersRepository.findOneBy({ user_id: id });
    if (user.status === 0) {
      const updateActive = await this.usersRepository
        .createQueryBuilder()
        .update(User)
        .set({ status: 1 })
        .where('user_id=:id', { id })
        .execute();
      const result1 = this.usersRepository.find();
      return result1;
    } else {
      const updateActive1 = await this.usersRepository
        .createQueryBuilder()
        .update(User)
        .set({ status: 0 })
        .where('user_id=:id', { id })
        .execute();
      const result = this.usersRepository.find();
      return result;
    }
  }
}
