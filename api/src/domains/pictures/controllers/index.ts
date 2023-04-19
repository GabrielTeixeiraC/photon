import { Router, Request, Response, NextFunction } from 'express';
import { PictureService } from '../services/PictureService';
import { statusCodes } from '../../../../utils/constants/status-codes';
import { loginMiddleware,
    verifyJWT,
    notLoggedIn } from '../../../middlewares/auth';
import { upload } from '../../../middlewares/multer';
  
export const router = Router();

router.post('/', 
    verifyJWT,
    upload, 
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const picture = await PictureService.uploadPicture(req.userId!,req.file);
            res.status(statusCodes.CREATED).json(picture);
        } catch (error) {
            next(error);
        }
});

router.put('/likes/:id', 
    verifyJWT,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const picture = await PictureService.likePicture(req.userId!,req.params.id);
            res.status(statusCodes.SUCCESS).json(picture);
        } catch (error) {
            next(error);
        }
    });