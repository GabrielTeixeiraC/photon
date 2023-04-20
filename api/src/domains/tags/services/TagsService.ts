import { prisma } from "../../../lib/prisma"
import { QueryError } from '../../../../errors/QueryError';
import { PermissionError } from "../../../../errors/PermissionError";
import { Tag } from "@prisma/client";


class TagServiceClass {
    async addTagToPicture(userId: string, pictureId: string, tag: Tag) {
        try {
            const picture = await prisma.picture.findUnique({
                where: {
                    id: pictureId
                },
            });
            if (picture) {
                if (picture.user_id !== userId) {
                    throw new PermissionError("You are not allowed to add tags to this picture");
                }
                
                const tagExists = await prisma.picture.findFirst({
                    where: {
                        id: pictureId,
                        tags:{
                            some: {
                                name: tag.name,
                            },  
                        },
                    },
                });
                if (tagExists) {
                    throw new QueryError("Tag already exists on this picture");
                }
                const newTag = await prisma.tag.create({
                    data: {
                        name: tag.name,
                        pictures: {
                            connect: {
                                id: pictureId,
                            },
                        },
                    },
                });
                return newTag;
            }
            throw new QueryError("Picture not found");
        } catch (error) {
            throw error;
        }
    }
}

export const TagService = new TagServiceClass();