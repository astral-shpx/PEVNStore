import { Router, Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Favourite } from '../entities/Favourite';
import { User } from '../entities/User';
import { Product } from '../entities/Product';

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
  const { product_id } = req.body;
  const user = req.user as User;
  const favouriteRepository = AppDataSource.getRepository(Favourite);
  const productsRepository = AppDataSource.getRepository(Product);

  if (!product_id) {
    return res.status(400).send({ message: 'Product id is missing' });
  }

  if (isNaN(product_id)) {
    return res.status(400).send({
      message: 'Product id is not a number',
      product_id
    });
  }

  const productExists = await productsRepository.existsBy({ id: product_id });
  if (!productExists) {
    return res
      .status(400)
      .send({ message: 'Product with id doesnt exist', product_id });
  }

  const favouriteExists = await favouriteRepository.existsBy({
    user: req.user,
    product: { id: product_id }
  });

  if (favouriteExists) {
    return res
      .status(400)
      .send({ message: 'Cannot add duplicate favourite', product_id });
  }

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

  const favouriteExists = await favouriteRepository.existsBy({
    user: req.user,
    product: { id: product_id }
  });

  if (!favouriteExists) {
    return res
      .status(400)
      .send({ message: 'Product is not in favourites', product_id });
  }

  await favouriteRepository.delete({
    user: { id: user.id },
    product: { id: product_id }
  });

  return res
    .status(201)
    .send({ message: 'Product removed from favourites', product_id });
});

export default router;
