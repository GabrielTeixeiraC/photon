import { prisma } from "../../../lib/prisma"
import { hash } from 'bcrypt';
import { QueryError } from '../../../../errors/QueryError';
import { PermissionError } from "../../../../errors/PermissionError";

interface IUser {
  id: string;
  name: string;
  email: string;
  username: string;
  followed_by: IUser[];
  following: IUser[];
  likes_count: number;
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

  async getUserById(id: string) {
    const user = await prisma.user.findFirst({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        username: true,
        followed_by: {select:{
          id: true,
          },
        },
        following: {select:{
          id: true,
          },
        },
        created_at: true,
      },
    });

    if (!user) {
      throw new QueryError('User not found');
    }

    return user;
  }

  async editUser(id: string, body: IUser){
    const userData = body
    if(body.id != undefined){
      throw new PermissionError("You don't have the permission")
    }
    await prisma.user.update({
      where:{id,
      },
      data: userData,
    });
    const updatedUser = this.getUserById(id)
    if (!updatedUser) {
      throw new QueryError('User not found');
    }

    return updatedUser;
  }

  async followUser(followingId: string, followedId: string) {
    const followed = await prisma.user.findFirst({
      where: {
        id: followedId,
      },
    });

    if (!followed) {
      throw new QueryError('User not found');
    }

    const following = await prisma.user.findFirst({
      where: {
        id: followingId,
      },
    });

    if (!following) {
      throw new QueryError('User not found');
    }

    const alreadyFollowing = await prisma.user.findFirst({
      where: {
        following: {
          some: {
            id: followedId,
          },
        }
    },
    });

    if (alreadyFollowing) {
      throw new QueryError('User already followed');
    }

    const followingUser = await prisma.user.update({
      where: {
        id: followedId,
      },
      data: {
        followed_by: {
          connect: {
            id: followingId,
          },
        },
      },
    });

    return followingUser;
  }

  async unfollowUser(followingId: string, followedId: string) {
    const followed = await prisma.user.findFirst({
      where: {
        id: followedId,
      },
    });

    if (!followed) {
      throw new QueryError('User not found');
    }

    const following = await prisma.user.findFirst({
      where: {
        id: followingId,
      },
    });

    if (!following) {
      throw new QueryError('User not found');
    }

    const alreadyFollowing = await prisma.user.findFirst({
      where: { 
        following: {
          some: {
            id: followedId,
          },
        }
      },
    });

    if (!alreadyFollowing) {
      throw new QueryError('User not followed');
    }

    const unfollowingUser = await prisma.user.update({
      where: {
        id: followedId,
      },
      data: {
        followed_by: {
          disconnect: {
            id: followingId,
          },
        },
      },
    });

    return unfollowingUser;
  }
}
export const UserService = new UserServiceClass();