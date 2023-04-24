import { prisma } from "../../../lib/prisma"
import { QueryError } from '../../../../errors/QueryError';
import { PermissionError } from "../../../../errors/PermissionError";


class PictureServiceClass {
    async uploadPicture(userId:string, file: any, profile: boolean = false) {
        if (!profile) {
            const picture = await prisma.picture.create({
                data: {
                    picture_url: file.filename,
                    user: {
                        connect: {
                            id: userId,
                        },
                    },
                },
            });
        } else {
            const picture = await prisma.picture.create({
                data: {
                    picture_url: file.filename,
                    user: {
                        connect: {
                            id: userId,
                        },
                    },
                    profile_picture: true,
                },
            });
        return picture;
        }
    }

    async getPicture(id: string) {
        const picture = await prisma.picture.findUnique({
            where: {
                id: id,
            },
            select: {
                id: true,
                picture_url: true,
                user: {
                    select: {
                        id: true,
                    },
                },
                likes: {
                    select: {
                        id: true,
                    },
                },
                tags: {
                    select: {
                        id: true,
                    },
                },
            },
        });

        if (!picture) {
            throw new QueryError('Picture not found');
        }
        
        return picture;
    }

    async likePicture(userId: string ,id: string) {
        const picture = await prisma.picture.findUnique({
            where: {
                id: id,
            },
        });

        if (!picture) {
            throw new QueryError('Picture not found');
        }

        const alreadyLiked = await prisma.picture.findFirst({
            where: {
                id: id,
                likes: {
                    some: {
                        id: userId,
                    },
                },
            },
        });

        if (alreadyLiked) {
            throw new QueryError('User already liked');
          }

        const likedPicture = await prisma.picture.update({
            where: {
                id: id,
            },
            data: {
                likes: {
                    connect: {
                        id: userId,
                    },
                },
            },
        });

        return likedPicture;
    }

    async getProfilePicture(id: string) {
        const picture = await prisma.picture.findFirst({
            where: {
                user_id: id,
                profile_picture: true,
            },
        });

        if (!picture) {
            throw new QueryError('Picture not found');
        }

        return picture;
    }

    async getTopPictures() {
        const pictures = await prisma.picture.findMany({
            where: {
                created_at: {
                    gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
                },
            },
            orderBy: {
                likes: {
                    _count: 'desc',
                },
            },
            select: {
                id: true,
            },
        });

        return pictures;
    }
}

export const PictureService = new PictureServiceClass();