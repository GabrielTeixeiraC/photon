import { prisma } from "../../../lib/prisma"
import { QueryError } from '../../../../errors/QueryError';
import { PermissionError } from "../../../../errors/PermissionError";


class PictureServiceClass {
    // function to upload picture
    async uploadPicture(userId:string, file: any) {
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
        return picture;
    }

    // function to like picture
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
}

export const PictureService = new PictureServiceClass();