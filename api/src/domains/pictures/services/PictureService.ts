import { prisma } from "../../../lib/prisma"
import { QueryError } from '../../../../errors/QueryError';
import { PermissionError } from "../../../../errors/PermissionError";


class PictureServiceClass {
    // function to upload picture
    async uploadPicture(body: any) {
        console.log(body);
    }

    
}

export const PictureService = new PictureServiceClass();