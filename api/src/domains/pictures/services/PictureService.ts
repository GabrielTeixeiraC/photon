import { prisma } from "../../../lib/prisma"
import { QueryError } from '../../../../errors/QueryError';

class PictureServiceClass {
    async uploadPicture(userId:string, file: any, profile: boolean = false) {
        const picture = await prisma.picture.create({
            data: {
                picture_url: file.filename,
                user: {
                    connect: {
                        id: userId,
                    },
                },
                profile_picture: profile,
            },
        });
        return picture;
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

    async getTopPictures() {
        const pictures = await prisma.picture.findMany({
            where: {
                created_at: {
                    gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
                },
                profile_picture: false,
            },
            orderBy: {
                likes: {
                    _count: 'desc',
                }
            },
            select: {
                id: true,
                user: {
                    select: {
                        id: true,
                        username: true,
                        picture: {
                            where: {
                                profile_picture: true,
                            },
                        }
                    },
                },
                likes: true,
                tags: true,
                picture_url: true,
            }
        });

        return pictures;
    }

    async getPicturesByTag(tag: string) {
        const pictures = await prisma.picture.findMany({
            where: {
                tags: {
                    some: {
                        name: tag,
                    },
                },
                profile_picture: false,
            },
            orderBy: {
                created_at: 'desc',
            },
            select: {
                id: true,
                user: {
                    select: {
                        id: true,
                        username: true,
                        picture: {
                            where: {
                                profile_picture: true,
                            },
                        }
                    },
                },
                likes: true,
                tags: true,
                picture_url: true,
            }
        });
        if(!pictures) {
            throw new QueryError('No pictures found');
        }

        return pictures;
    }

    async getPicturesByUserID(userId: string) {
        const pictures = await prisma.picture.findMany({
            where: {
                user_id: userId,
                profile_picture: false,
            },
            select: {
                id: true,
                user_id: true,
                picture_url: true,
                profile_picture: true,
                likes: true,
                tags: true,
                created_at: true,
            }
        });
        if(!pictures) {
            throw new QueryError('No pictures found');
        }

        return pictures;
    }

    async getFollowingPictures(userId: string) {
        const pictures = await prisma.picture.findMany({
            where: {
                user: {
                    followed_by: {
                        some: {
                            id: userId,
                        },
                    },
                },
                profile_picture: false,
            },
            orderBy: {
                created_at: 'desc',
            },
            select: {
                id: true,
                user: {
                    select: {
                        id: true,
                        username: true,
                        picture: {
                            where: {
                                profile_picture: true,
                            },
                        }
                    },
                },
                likes: true,
                tags: true,
                picture_url: true,
            }
        });
        
        if(!pictures) {
            throw new QueryError('No pictures found');
        }
        
        return pictures;
    }
}

export const PictureService = new PictureServiceClass();