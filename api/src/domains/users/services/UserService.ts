import { prisma } from "../../../lib/prisma";
import { User } from "@prisma/client";
import { hash } from 'bcrypt';
import { QueryError } from '../../../../errors/QueryError';

class UserServiceClass {
  async encryptPassword(password: string) {
    const saltRounds = 10;
    const encryptedPassword = await hash(password, saltRounds);
    return encryptedPassword;
  }

  async create(body: User, file: any) {
    const userEmail = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (userEmail) {
      throw new QueryError('Email already in use');
    }

    const userUsername = await prisma.user.findFirst({
      where: {
        username: body.username,
      },
    });
    
    if (userUsername) {
      throw new QueryError('Username already in use');
    }

    const encryptedPassword = await this.encryptPassword(body.password);
    const newUser = await prisma.user.create({
      data: {
        name: body.name,
        username: body.username,
        email: body.email,
        password: encryptedPassword,
        picture: {
          create: {
            picture_url: file? file.filename: 'default.png',
            profile_picture: true,
          },
        }
      },
    });

    return newUser;
  }

  async getAllUsers() {
    const users = await prisma.user.findMany({
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

    if (!users) {
      throw new QueryError('No users found');
    }

    return users;
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
        picture: {
          where: {
            profile_picture: true,
          },
          select: {
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

  async getUserByUsername(username: string) {
    const user = await prisma.user.findFirst({
      where: {
        username,
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
        picture: {
          where: {
            profile_picture: true,
          },
          select: {
            id: true,
            picture_url: true,
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



  async editUser(id: string, body: Partial<Omit<User, 'id'>> ){
    const userData = body;

    if (body.username) {
      const userUsername = await prisma.user.findFirst({
        where: {
          username: body.username,
        },
      });

      if (userUsername) {
        throw new QueryError('Username already in use');
      }
    }

    if (body.email) {
      const userEmail = await prisma.user.findFirst({
        where: {
          email: body.email,
        },
      });

      if (userEmail) {
        throw new QueryError('Email already in use');
      }
    }

    if (body.password) {
      const encryptedPassword = await this.encryptPassword(body.password);
      userData.password = encryptedPassword;
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