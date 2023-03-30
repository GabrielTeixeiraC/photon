import { Router, Request, Response, NextFunction } from 'express';
import { UserService } from '../services/UserService';
import { statusCodes } from '../../../../utils/constants/status-codes';

export const router = Router();

router.post('/',
  async (req: Request, res: Response, next: NextFunction) => {
    try {      
      await UserService.create(req.body);
      res.status(statusCodes.CREATED).end();
    } catch (error) {
      next(error);
    }
  },
);