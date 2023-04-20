import { Router, Request, Response, NextFunction } from 'express';
import { TagService } from '../services/TagsService';
import { statusCodes } from '../../../../utils/constants/status-codes';
import { loginMiddleware,
    verifyJWT,
    notLoggedIn } from '../../../middlewares/auth';
import { upload } from '../../../middlewares/multer';
  
export const router = Router();


router.put('/add/:id',
    verifyJWT,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const tag = await TagService.addTagToPicture(req.userId!,req.params.id,req.body);
            res.status(statusCodes.CREATED).json(tag);
        } catch (error) {
            next(error);
        }
    }
);


