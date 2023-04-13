import { Router, Request, Response, NextFunction } from 'express';
import { PictureService } from '../services/PictureService';
import { statusCodes } from '../../../../utils/constants/status-codes';
import { upload } from '../../../middlewares/multer';
  
export const router = Router();

router.post('/', upload, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const picture = await PictureService.uploadPicture(req.body);
        res.status(statusCodes.CREATED).json(picture);
    } catch (error) {
        next(error);
    }
});