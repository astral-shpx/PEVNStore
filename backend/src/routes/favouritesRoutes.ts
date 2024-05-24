import { Router, Request, Response } from 'express';

const router = Router();

const checkAuth = (req: Request, res: Response, next: any) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  return next();
};

router.use(checkAuth);

router.get('/', (req: Request, res: Response) => {});

router.put('/', (req: Request, res: Response) => {});

router.post('/', (req: Request, res: Response) => {});

router.delete('/', (req: Request, res: Response) => {});

export default router;
