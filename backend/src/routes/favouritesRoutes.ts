import { Router, Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Favourite } from '../entities/Favourite';
import { User } from '../entities/User';

const router = Router();

const checkAuth = (req: Request, res: Response, next: any) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  return next();
};

router.use(checkAuth);

router.get('/', async (req: Request, res: Response) => {
  const user = req.user as User;

  const favouriteRepository = AppDataSource.getRepository(Favourite);

  const favourites = await favouriteRepository.find({
    where: { user: { id: user.id } },
    relations: ['product']
  });

  //   return res.json({userId: user.id, favourites});
  return res.json(favourites);
});

router.post('/', (req: Request, res: Response) => {});

router.put('/', (req: Request, res: Response) => {});

router.delete('/', (req: Request, res: Response) => {});

export default router;
