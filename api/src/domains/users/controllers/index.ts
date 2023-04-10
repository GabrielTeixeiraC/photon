import { Router, Request, Response, NextFunction } from 'express';
import { UserService } from '../services/UserService';
import { loginMiddleware,
  verifyJWT,
  notLoggedIn } from '../../../middlewares/auth';
import { statusCodes } from '../../../../utils/constants/status-codes';
  
export const router = Router();

router.post('/login', notLoggedIn, loginMiddleware);

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

router.get('/me', 
  verifyJWT, 
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await UserService.getUserById(req.userId!);
      res.status(statusCodes.SUCCESS).json(user);
    } catch (error) { 
      next(error);
    }
  },
);

router.get('/:id',
verifyJWT,
  async (req: Request, res: Response, next: NextFunction) => {
    try{
      const user = await UserService.getUserById(req.params.id);
      res.status(statusCodes.SUCCESS).json(user);
    } catch (error) {
      next(error)
    }
  },
);

router.put('/:id',
verifyJWT,
  async (req: Request, res:Response, next: NextFunction) => {
    try{ 
      const user = await UserService.editUser(req.params.id,req.body);
      res.status(statusCodes.SUCCESS).json(user);
    } catch (error) {
      next(error)
    }
  },
);

