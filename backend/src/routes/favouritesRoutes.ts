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

  return res.json(favourites);
});

router.post('/', async (req: Request, res: Response) => {
  const user = req.user as User;
  const { product_id } = req.body;

  const favouriteRepository = AppDataSource.getRepository(Favourite);

  await favouriteRepository.save({
    product: { id: product_id },
    user: user
  });

  return res
    .status(201)
    .send({ message: 'Product added to favourites', product_id });
});

router.delete('/', async (req: Request, res: Response) => {
  const user = req.user as User;
  const { product_id } = req.body;

  const favouriteRepository = AppDataSource.getRepository(Favourite);

  await favouriteRepository.delete({
    user: { id: user.id },
    product: { id: product_id }
  });

  return res
    .status(201)
    .send({ message: 'Product removed from favourites', product_id });
});

export default router;
