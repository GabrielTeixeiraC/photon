import { prisma } from "../../../lib/prisma"
import { hash } from 'bcrypt';
import { QueryError } from '../../../../errors/QueryError';

interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
}

class UserServiceClass {
  async encryptPassword(password: string) {
    const saltRounds = 10;
    const encryptedPassword = await hash(password, saltRounds);
    return encryptedPassword;
  }

  async create(body: IUser) {
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (user) {
      throw new QueryError('User already exists');
    }
    
    const encryptedPassword = await this.encryptPassword(body.password);
    const newUser = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: encryptedPassword,
      },
    });

    return newUser;
  }

  async findById(id: string) {
    const user = await prisma.user.findFirst({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        followers_count: true,
        following_count: true,
        likes_count: true,
        created_at: true,
      },
    });

    if (!user) {
      throw new QueryError('User not found');
    }

    return user;
  }
}

export const UserService = new UserServiceClass();